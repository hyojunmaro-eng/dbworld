# VPS 배포 — 공용 정문 + 사이트별 컨테이너 (다중 사이트 패턴)

Hostinger KVM8 한 대에 여러 독립 사이트를 올리기 위한 구조와 규약.
dbworld 홈페이지가 1호이며, 새 사이트는 아래 규약대로 폴더 하나와 안내판 파일 하나만 추가한다.

## 구조

```
인터넷 80/443
   │
   ▼
중앙 정문 dbaa-prod-caddy          ← VM의 유일한 80/443. 자동 HTTPS(Let's Encrypt)
   │  /srv/dbaa/Caddyfile          ← dbaa-erp 레포 소관 (erp/apply/stg/upload.aifanfic.com)
   │  └─ import /etc/caddy/sites/*.caddy
   │        = 호스트 /srv/gateway/sites/*.caddy   ← 사이트별 "안내판" (각 사이트 소관)
   │
   ├─ dbworld.caddy ──▶ dbworld-web:80   (dbaa-edge 네트워크의 컨테이너 이름)
   └─ <다음 사이트>.caddy ──▶ <사이트>-web:80
```

- 정문은 dbaa-erp 배포가 관리한다. **다른 사이트는 dbaa-erp 레포를 절대 고치지 않는다** —
  `/srv/gateway/sites/<사이트>.caddy` 파일만 넣고 무중단 reload.
- 각 사이트는 자기 compose 프로젝트(`/srv/<사이트>/`)로 완전히 독립. 사이트 하나가 죽어도
  다른 사이트·ERP에 영향 없다. ERP 배포는 정문을 바꾸기 전에 안내판까지 합쳐 사전 검증하며,
  검증 실패 시 정문을 건드리지 않는다(기존 설정으로 계속 서빙).

## dbworld 1호 사이트 구성 (이 폴더)

| 파일 | 역할 |
|---|---|
| `install.sh` | 서버 설치/갱신(root, 재실행 안전). 파일 배치 → 컨테이너 기동(변경 시 재생성) → 합산 검증 → 안내판 설치 → reload(실패 시 자동 원복) |
| `compose.yaml` | `dbworld-sync`(1분마다 GitHub main → `node build.mjs` → 원자 교체) + `dbworld-web`(정적 서빙, 내부 :80). 프로젝트명 고정·로그 상한 포함 |
| `sync.sh` | 동기화 본체. 어떤 실패에도 서빙 유지(링크 rename 교체), 보관본 3개(서빙 중인 것 보호), .git 비대 방지 |
| `Caddyfile` | `dbworld-web` 내부 서빙(HTML no-cache / assets 7일 / 언어별 404) — 보안 헤더는 안내판 한 곳에서만 |
| `dbworld.caddy` | 정문 안내판: 미리보기 호스트 + 관리자 noindex(선택적 IP 제한 자리). 정식 도메인 블록은 주석(전환 때 해제) — 구주소 `/main/*`→`/ko/`, `www`→본주소 리다이렉트 포함 |

콘텐츠 반영 경로: 웹 관리자 저장 또는 개발 푸시 → GitHub main → (최대 1분 뒤) sync가 감지·빌드 → 교체.
서버에 들어갈 일이 없다. **서버의 /srv/dbworld 파일을 손으로 고치지 말 것** — 레포가 정본이며
install.sh 재실행이 레포 내용으로 되돌린다(수정은 레포에 커밋 → install.sh 재실행).

## 새 사이트 추가 절차 (2호부터)

1. 새 저장소에 이 폴더를 복사해 이름만 바꾼다 — 규약:
   - compose 프로젝트 폴더 `/srv/<사이트>/`, `name: <사이트>`, 컨테이너 `<사이트>-web`(·`-sync`) —
     **모두 사이트 접두사로 고유하게**
   - 안내판 `/srv/gateway/sites/<사이트>.caddy`, 스니펫 이름 `(<사이트>_...)` 접두사
   - **호스트 주소는 모든 안내판에 걸쳐 유일** — 중복이면 정문 전체가 "ambiguous site definition"으로
     못 뜬다. `srv1993874.hstgr.cloud` 미리보기 호스트는 dbworld 소유이므로, 2호부터는 자기 도메인의
     임시 서브도메인(예: `preview.<도메인>`)을 쓴다
   - **dbaa-edge에는 정문이 프록시할 서빙 컨테이너 1개만** 붙인다(sync·빌드·DB류 금지 —
     edge는 준신뢰망: 여기 붙으면 ERP 내부 엔드포인트에 직접 닿는다)
   - 외부 `ports:` 금지, `aifanfic.com` 호스트 정의 금지(ERP 소관), 로그 상한(compose `x-logging`) 유지
2. `install.sh`의 `REPO_RAW`·경로 상수·파일명만 새 저장소로 바꾼다.
3. 서버 Web console에서 새 install.sh 실행(합산 검증이 기존 사이트와의 충돌까지 걸러 준다) →
   미리보기 확인 → DNS 전환 때 도메인 블록 해제 후 재실행.

## 보안 메모 (수용 리스크 포함)

- 안내판 설치는 **항상 install.sh 경유** — 기존+새 파일 합산 validate 통과 시에만 설치하고,
  reload 실패 시 자동 원복한다. 손으로 /srv/gateway/sites에 파일을 두지 말 것.
- 공급망: sync가 공개 레포 main을 1분마다 root로 빌드한다 — **main 쓰기 권한(=웹 관리자 PAT 소지)
  = 이 컨테이너의 코드 실행 권한**. PAT는 dbworld 저장소 한정(fine-grained)으로 유지하고 유출 시 즉시 폐기.
- 최초 설치 명령은 커밋 SHA 고정 주소로 사용, 재실행은 서버 보관본(`bash /srv/dbworld/install.sh`).
- `/hyojunadmin`은 noindex 처리됨. 회사 고정 IP가 정해지면 dbworld.caddy의 IP 제한 주석을 해제해
  관리자 화면 접근을 제한할 수 있다(기능 자체는 GitHub 토큰 없이는 동작하지 않음).

## 자주 쓰는 명령 (서버)

```sh
docker compose --project-directory /srv/dbworld logs -f sync      # 동기화 로그
docker compose --project-directory /srv/dbworld up -d             # 기동
bash /srv/dbworld/install.sh                                      # 갱신(레포 반영·안내판 재설치)
docker exec dbaa-prod-caddy caddy reload -c /etc/caddy/Caddyfile  # 정문 무중단 반영
```
