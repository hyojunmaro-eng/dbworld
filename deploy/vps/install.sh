#!/usr/bin/env bash
# =============================================================================
# DB월드 홈페이지 — VPS 설치/갱신 (root로 실행, 재실행 안전)
#
# 최초 설치(명령은 제가 커밋 고정 주소로 드립니다):
#   bash <(curl -fsSL https://raw.githubusercontent.com/hyojunmaro-eng/dbworld/<커밋SHA>/deploy/vps/install.sh)
# 재실행(갱신·도메인 전환): 저장소 main을 바꾼 뒤
#   bash /srv/dbworld/install.sh
#
# 하는 일
#   1) /srv/dbworld에 배포 파일 배치(레포가 정본 — 서버 수동 수정은 되돌아감)
#   2) 홈페이지 컨테이너 기동(sync + web), 파일이 바뀌었으면 재생성
#   3) 공용 정문 안내판 설치: 기존+새 파일 합쳐 검증 → 설치 → 무중단 reload(실패 시 원복)
# 하지 않는 일: ERP 설정 변경, 80/443 점유, 도메인 DNS 변경
# =============================================================================
set -euo pipefail

REPO_RAW="${REPO_RAW:-https://raw.githubusercontent.com/hyojunmaro-eng/dbworld/main/deploy/vps}"
DIR=/srv/dbworld
SITES=/srv/gateway/sites
GATEWAY_CADDYFILE=/srv/dbaa/Caddyfile
GW=dbaa-prod-caddy
FILES="compose.yaml Caddyfile sync.sh dbworld.caddy install.sh"

log() { printf '\n\033[1;32m==> %s\033[0m\n' "$*"; }
die() { printf '\n\033[1;31m!! %s\033[0m\n' "$*" >&2; exit 1; }

[ "$(id -u)" = 0 ] || die "root로 실행해 주세요."
command -v docker >/dev/null || die "docker가 없습니다."
docker compose version >/dev/null 2>&1 || die "docker compose 플러그인이 없습니다."

log "1/4 배포 파일 내려받기 → $DIR  (KIT_LOCAL=1 이면 생략)"
install -d -m 755 "$DIR"
changed=0
if [ "${KIT_LOCAL:-0}" != 1 ]; then
  for f in $FILES; do
    curl -fsSL "$REPO_RAW/$f" -o "$DIR/$f.tmp" || die "$f 내려받기 실패"
    if [ ! -f "$DIR/$f" ] || ! cmp -s "$DIR/$f.tmp" "$DIR/$f"; then changed=1; fi
    mv "$DIR/$f.tmp" "$DIR/$f"
  done
fi
chmod +x "$DIR/sync.sh" "$DIR/install.sh"

log "2/4 정문 네트워크 확인 (dbaa-edge)"
docker network inspect dbaa-edge >/dev/null 2>&1 || docker network create dbaa-edge >/dev/null
docker ps --format '{{.Names}}' | grep -qx "$GW" || die "중앙 정문($GW)이 떠 있지 않습니다. ERP 배포 상태를 먼저 확인해 주세요."

log "3/4 홈페이지 컨테이너 기동 (첫 실행은 빌드까지 1~3분)"
if [ "$changed" = 1 ] && docker ps -a --format '{{.Names}}' | grep -qx dbworld-web; then
  docker compose --project-directory "$DIR" up -d --force-recreate   # 설정/스크립트 변경 반영
else
  docker compose --project-directory "$DIR" up -d
fi
ok=0
for i in $(seq 1 60); do
  if docker exec dbworld-web wget -qO /dev/null http://127.0.0.1/ko/ 2>/dev/null; then ok=1; break; fi
  sleep 5
done
[ "$ok" = 1 ] || { docker compose --project-directory "$DIR" logs --tail 30 sync; die "홈페이지가 아직 안 떴습니다. 위 로그를 보내 주세요."; }
echo "   홈페이지 컨테이너 정상"

log "4/4 공용 정문 안내판 설치"
[ -f "$GATEWAY_CADDYFILE" ] || die "$GATEWAY_CADDYFILE 이 없습니다(ERP 배포 상태 확인)."
grep -q 'import /etc/caddy/sites/\*.caddy' "$GATEWAY_CADDYFILE" \
  || die "정문 Caddyfile에 sites import가 없습니다 — dbaa-erp의 공용 정문 변경이 아직 서버에 반영되지 않았습니다."
install -d -m 755 /srv/gateway "$SITES"

# 검증 이미지는 실제 정문과 동일하게 (별도 pull 불필요·버전 일치)
GW_IMG="$(docker inspect "$GW" --format '{{.Config.Image}}')"

# 기존 안내판 전부 + 새 파일을 합쳐 검증 — 다른 사이트와의 호스트/스니펫 충돌까지 걸러낸다
TRY=$(mktemp -d)
cp -f "$SITES"/*.caddy "$TRY"/ 2>/dev/null || true
cp -f "$DIR/dbworld.caddy" "$TRY/dbworld.caddy"

# 검증 컨테이너를 실제 정문과 같은 조건으로 — 정문의 /etc/caddy 하위 마운트(Caddyfile, ERP가 import하는
# 보조 파일 등)와 환경변수를 그대로 가져오고, sites만 후보 디렉터리로 바꾼다.
# (Caddyfile 하나만 마운트하면 ERP 쪽 import 파일을 못 찾아 검증이 거짓 실패한다)
VMOUNTS=()
while IFS='|' read -r mtype msrc mdst; do
  case "$mdst" in
    /etc/caddy/sites|/etc/caddy/sites/*) continue ;;
    /etc/caddy|/etc/caddy/*) ;;
    *) continue ;;
  esac
  [ -n "$msrc" ] && VMOUNTS+=(-v "$msrc:$mdst:ro")
done < <(docker inspect "$GW" --format '{{range .Mounts}}{{.Type}}|{{if eq .Type "volume"}}{{.Name}}{{else}}{{.Source}}{{end}}|{{.Destination}}{{"\n"}}{{end}}')
# 정문 컨테이너에 Caddyfile 마운트가 안 잡히는 예외적인 경우 대비
printf '%s\n' "${VMOUNTS[@]}" | grep -q ':/etc/caddy/Caddyfile:ro$' || VMOUNTS+=(-v "$GATEWAY_CADDYFILE:/etc/caddy/Caddyfile:ro")
ENVF=$(mktemp); chmod 600 "$ENVF"
docker inspect "$GW" --format '{{range .Config.Env}}{{println .}}{{end}}' > "$ENVF"

if ! docker run --rm --env-file "$ENVF" "${VMOUNTS[@]}" -v "$TRY":/etc/caddy/sites:ro \
     "$GW_IMG" caddy validate -c /etc/caddy/Caddyfile; then
  rm -rf "$TRY" "$ENVF"
  die "안내판 검증 실패 — 설치하지 않았습니다(정문은 기존 그대로). 위 오류를 보내 주세요."
fi
rm -rf "$TRY" "$ENVF"

# 설치(이전본 백업) → reload. 실패하면 즉시 원복해 '다음 재기동 때 터지는 파일'을 남기지 않는다.
HAD_OLD=0; [ -f "$SITES/dbworld.caddy" ] && { cp -f "$SITES/dbworld.caddy" "$SITES/.dbworld.caddy.bak"; HAD_OLD=1; }
install -m 644 "$DIR/dbworld.caddy" "$SITES/dbworld.caddy"

if ! docker inspect "$GW" --format '{{range .Mounts}}{{.Destination}} {{end}}' | grep -q /etc/caddy/sites; then
  echo "   주의: 정문 컨테이너에 /etc/caddy/sites 마운트가 아직 없습니다."
  echo "        다음 ERP 배포가 정문을 재생성하면 자동 반영됩니다(그때까지 안내판은 대기 상태)."
elif docker exec "$GW" caddy reload -c /etc/caddy/Caddyfile; then
  echo "   정문 무중단 반영 완료"
else
  if [ "$HAD_OLD" = 1 ]; then mv -f "$SITES/.dbworld.caddy.bak" "$SITES/dbworld.caddy"; else rm -f "$SITES/dbworld.caddy"; fi
  docker exec "$GW" caddy reload -c /etc/caddy/Caddyfile || true
  die "정문 reload 실패 — 안내판을 이전 상태로 되돌렸습니다. 위 오류를 보내 주세요."
fi
rm -f "$SITES/.dbworld.caddy.bak"

log "설치 완료"
cat <<MSG
  미리보기 : https://srv1993874.hstgr.cloud/ko/
  동기화   : GitHub main 반영까지 최대 1분 (로그: docker compose --project-directory $DIR logs -f sync)
  도메인 전환(나중에):
    ① dbworld.co.kr·www A 레코드 → 이 서버 IP
    ② 저장소 deploy/vps/dbworld.caddy 의 도메인 블록 주석 해제 후 main 푸시
    ③ bash /srv/dbworld/install.sh 재실행
MSG
