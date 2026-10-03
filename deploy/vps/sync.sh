#!/bin/sh
# =============================================================================
# DB월드 홈페이지 동기화 — GitHub main → 빌드 → /site/current 원자 교체
#
# 설계 원칙
#  - 어떤 실패도 서빙 중인 사이트를 깨지 않는다(새 폴더에 빌드 후 링크 rename만).
#  - 변경이 없으면 아무 일도 하지 않는다(커밋 해시 비교).
#  - 네트워크·설치 실패는 재시도할 뿐, 프로세스를 죽이지 않는다(크래시 루프 방지).
# =============================================================================
set -u
REPO_URL="${REPO_URL:-https://github.com/hyojunmaro-eng/dbworld.git}"
REPO_BRANCH="${REPO_BRANCH:-main}"
SYNC_INTERVAL="${SYNC_INTERVAL:-60}"
ROOT="${SITE_ROOT:-/site}"
SRC="$ROOT/src"            # git 작업 트리
REL="$ROOT/releases"       # 빌드 결과 보관(최근 3개 + 서빙 중인 것)
CUR="$ROOT/current"        # 서빙 대상(심볼릭 링크)

log() { echo "$(date -Is) $*"; }

# git 준비 — 실패해도 죽지 않고 재시도(컨테이너 재생성 직후 Alpine CDN 장애 대비)
until command -v git >/dev/null 2>&1; do
  log "git 설치 시도"
  apk add --no-cache git >/dev/null 2>&1 || { log "git 설치 실패 — 30초 뒤 재시도"; sleep 30; }
done
mkdir -p "$REL"

clone() {
  log "최초 복제: $REPO_URL ($REPO_BRANCH)"
  rm -rf "$SRC"
  git clone --depth 1 --branch "$REPO_BRANCH" "$REPO_URL" "$SRC" 2>&1 | tail -1
  # reflog로 옛 트리가 90일 보존되며 .git이 비대해지는 것 방지
  [ -d "$SRC/.git" ] && ( cd "$SRC" && git config gc.reflogExpire now && git config gc.reflogExpireUnreachable now )
}

# 링크 교체: rename(2)로 원자적 — busybox mv에는 -T가 없고 ln -sfn은 순간 공백이 생긴다
swap_link() {
  ln -sfn "$1" "$CUR.new" && node -e 'require("fs").renameSync(process.argv[1], process.argv[2])' "$CUR.new" "$CUR" \
    || { rm -f "$CUR.new"; ln -sfn "$1" "$CUR"; }
}

build_and_swap() {
  sha="$1"
  [ -n "$sha" ] || { log "커밋 해시 없음 — 건너뜀"; return 1; }
  out="$REL/$sha"
  if [ -d "$out" ]; then
    log "이미 빌드됨: $sha"
    touch "$out"   # 보관본 회전(mtime 기준)에서 밀려나지 않게
  else
    tmp="$REL/.tmp-$sha"
    rm -rf "$tmp"
    log "빌드 시작: $sha"
    ( cd "$SRC" && rm -rf dist && node build.mjs ) || { log "빌드 실패 — 기존 사이트 유지"; return 1; }
    [ -f "$SRC/dist/ko/index.html" ] || { log "빌드 결과 이상(ko/index.html 없음) — 기존 사이트 유지"; return 1; }
    mv "$SRC/dist" "$tmp" && mv "$tmp" "$out" || return 1
  fi
  swap_link "$out"
  log "반영 완료: $sha"
  # 보관본 정리: 서빙 중인 디렉터리는 제외하고 최신 3개만
  keep="$(readlink "$CUR" 2>/dev/null)"
  ls -1dt "$REL"/*/ 2>/dev/null | tail -n +4 | while read -r d; do
    [ "${d%/}" = "$keep" ] || rm -rf "$d"
  done
  # .git 비대 방지(변경이 있었던 주기에만 실행되므로 저렴)
  ( cd "$SRC" && git reflog expire --expire=now --all 2>/dev/null; git gc -q --prune=now 2>/dev/null ) || true
  return 0
}

[ -d "$SRC/.git" ] || clone

# 첫 기동: 가진 소스로 즉시 서빙 시작 (GitHub 일시 장애여도 뜰 수 있게)
if [ ! -e "$CUR" ] && [ -d "$SRC/.git" ]; then
  build_and_swap "$(cd "$SRC" && git rev-parse --short HEAD 2>/dev/null)" || log "초기 빌드 실패 — 다음 주기에 재시도"
fi

log "동기화 시작 (주기 ${SYNC_INTERVAL}초)"
while :; do
  if [ -d "$SRC/.git" ] && before="$(cd "$SRC" && git rev-parse --short HEAD 2>/dev/null)" && [ -n "$before" ]; then
    if ( cd "$SRC" && git fetch -q --depth 1 origin "$REPO_BRANCH" 2>/dev/null && git reset -q --hard FETCH_HEAD 2>/dev/null ); then
      after="$(cd "$SRC" && git rev-parse --short HEAD 2>/dev/null)"
      if [ "$before" != "$after" ]; then
        log "변경 감지: $before -> $after"
        build_and_swap "$after" || true
      elif [ ! -e "$CUR" ]; then
        log "서빙 링크 없음 — 재빌드 시도: $after"
        build_and_swap "$after" || true
      fi
    else
      log "GitHub 접속 실패 — 다음 주기에 재시도(현재 사이트 유지)"
    fi
  else
    log "작업 트리 손상 — 재복제"
    clone
  fi
  sleep "$SYNC_INTERVAL"
done
