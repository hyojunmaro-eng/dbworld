# 배포 메모

## 미리보기 (GitHub Pages) — https://hyojunmaro-eng.github.io/dbworld/
- `hyojunmaro-eng/dbworld` 저장소의 `main`에 **소스(content·templates·assets·build.mjs·hyojunadmin·tools) + 빌드 결과(루트)** 가 함께 들어 있다.
- 글 관리는 웹 관리자(`/dbworld/hyojunadmin/`)가 GitHub API로 `content/posts`, `content/files`를 수정 →
  `.github/workflows/build.yml`(원본: `tools/dbworld-workflow.yml`)이 자동으로 재빌드해 main 루트와 `gh-pages`에 반영한다.
- 접속 토큰: dbworld 저장소 Contents(Read and write) 권한의 fine-grained PAT.

## 이 저장소(rainbowhills-erp)에서 수동 배포할 때 — 순서 중요
1. **역동기화 먼저**: dbworld의 `content/posts/`, `content/files/`를 이쪽 소스로 복사
   (웹 관리자로 작성된 글이 지워지지 않도록).
2. `node build.mjs` → `node tools/prefix.mjs /dbworld`
3. dbworld 클론을 `origin/main`으로 리셋 후 소스 + dist 루트 복사, main·gh-pages 푸시.

## 납품 (도커 단일 컨테이너)
- `docker compose up -d --build` — nginx(정적) + Node 관리자(`/admin`, ADMIN_PASSWORD 환경변수).
- 이 모드의 관리자는 서버 내장형(hyojunadmin/server.mjs)이며 GitHub 불필요.
