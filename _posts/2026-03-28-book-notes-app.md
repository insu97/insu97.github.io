---
layout: markdown
title: Book Notes App - 개인 전용 학습 노트 뷰어 + RAG 검색 PWA
tags: [Python, FastAPI, LangChain, ChromaDB, PWA, Docker, AWS, OAuth]
toc: true
---

{% include markdown.html %}

## 프로젝트 소개

GitHub private repo에 Obsidian으로 정리한 학습 노트를 핸드폰에서 편하게 열람하고, 자연어로 검색할 수 있는 개인 전용 PWA 앱이다.

```
사용자(핸드폰) → nginx(80/443) → FastAPI(8000) → ChromaDB / GitHub
```

### 왜 만들었는가

- Obsidian은 PC에서는 편하지만 핸드폰에서 private repo 접근이 불편
- 수백 개의 마크다운 파일에서 원하는 내용을 빠르게 찾고 싶었음
- LangChain RAG를 실제 서비스에 적용하는 경험을 쌓고 싶었음

### 기술 스택 선택 이유

| 기술 | 선택 이유 |
|------|----------|
| PWA | 스토어 배포 불필요, 서버 배포만으로 업데이트 즉시 반영, 새 언어 학습 불필요 |
| FastAPI | 비동기 지원, 타입 힌트 기반 자동 검증, Depends로 인증 로직 재사용 |
| Google OAuth | 비밀번호 직접 관리 불필요, 이메일 화이트리스트로 1인 접근 제어 |
| ChromaDB | 별도 서버 없이 Python 라이브러리로 벡터 DB 사용, 소규모 문서에 적합 |
| text-embedding-3-small | 한국어 성능 우수, $0.02/1M 토큰으로 거의 무료 |
| AWS EC2 + Route 53 | 서버/도메인/DNS를 AWS 한 곳에서 통합 관리 |

---

## 아키텍처

```
EC2 (Ubuntu, t3.micro, 서울 리전)
│
├── nginx (:80 → :443 리디렉트)
│         (:443 → localhost:8000 프록시)
│         (SSL: Let's Encrypt)
│
└── Docker
    └── FastAPI (:8000)
        ├── Auth (Google OAuth + JWT)
        ├── Docs (마크다운 뷰어)
        ├── Search (ChromaDB + LangChain RAG)
        └── Webhook (GitHub push → 자동 동기화)
```

### 두 개 Repository의 관계

```
book-notes (private)              book-notes-app (private)
├── langchain/                    ├── backend/
│   ├── chapter1.md               │   ├── main.py
│   └── chapter2.md               │   ├── auth/
├── sql/                          │   ├── docs/
│   └── camp.md                   │   └── search/
└── ...                           ├── frontend/
                                  ├── nginx/
    학습 노트 원본                  ├── Dockerfile
    (push → Webhook →              └── docker-compose.yml
     앱에 자동 반영)
                                      앱 코드
                                      (push → EC2 수동 배포)
```

---

## Phase 1: 인증 시스템

### Google OAuth 2.0 흐름

```
1. "Google로 로그인" 클릭
2. → accounts.google.com으로 리디렉트
3. → Google 로그인 + 권한 동의
4. → /auth/callback으로 auth code 전달
5. → auth code를 access token으로 교환
6. → 이메일 추출 → 화이트리스트 확인
7. → JWT 발급 (httpOnly cookie)
```

### 1인 앱 접근 제어

```python
# .env
ALLOWED_EMAIL=myemail@gmail.com

# 콜백에서 이메일 체크
if user_email != os.getenv("ALLOWED_EMAIL"):
    raise HTTPException(403, "Access denied")
```

Google OAuth 동의 화면을 "테스트 모드"로 설정하면 등록한 테스트 사용자만 로그인 가능하다.

### JWT httpOnly Cookie

```python
response.set_cookie(
    key="access_token",
    value=token,
    httponly=True,   # JS에서 접근 불가 (XSS 방지)
    secure=True,     # HTTPS에서만 전송
    samesite="lax"   # CSRF 방지
)
```

### FastAPI 의존성 주입으로 인증 체크

```python
from fastapi import Depends

async def get_current_user(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(401)
    return verify_token(token)

@app.get("/api/docs/tree")
async def get_tree(user=Depends(get_current_user)):
    return {"tree": build_tree()}
```

모든 API 엔드포인트에 `Depends(get_current_user)`를 추가하면 인증이 필수가 된다.

### 트러블슈팅: MismatchingStateError

OAuth 콜백에서 세션 쿠키가 유실되어 발생한 문제.

```python
# 원인: SessionMiddleware의 https_only 설정
# localhost(HTTP)에서 쿠키가 전송되지 않음

# 해결: 개발 환경에서 https_only=False
app.add_middleware(
    SessionMiddleware,
    secret_key=settings.JWT_SECRET_KEY,
    same_site="lax",
    https_only=False,  # 로컬 개발 시
)
```

---

## Phase 2: 문서 동기화 + 뷰어

### GitHub Private Repo 동기화

GitPython으로 PAT(Personal Access Token)을 사용하여 private repo를 clone/pull한다.

```python
import git

def clone_or_pull():
    repo_url = f"https://{PAT}@github.com/{GITHUB_REPO}.git"
    if os.path.exists(DOCS_DIR):
        repo = git.Repo(DOCS_DIR)
        repo.remotes.origin.pull()
    else:
        git.Repo.clone_from(repo_url, DOCS_DIR, depth=1)
```

- `depth=1`: 최신 커밋만 가져옴 (히스토리 불필요)
- PAT은 Fine-grained token으로 해당 repo의 Contents Read-only 권한만 부여

### GitHub Webhook (push 즉시 반영)

```python
import hmac, hashlib
from fastapi import BackgroundTasks

def verify_signature(payload: bytes, signature: str, secret: str) -> bool:
    expected = "sha256=" + hmac.new(
        secret.encode(), payload, hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)

@app.post("/webhook/github")
async def webhook(request: Request, background_tasks: BackgroundTasks):
    payload = await request.body()
    signature = request.headers.get("X-Hub-Signature-256", "")

    if not verify_signature(payload, signature, WEBHOOK_SECRET):
        raise HTTPException(403)

    background_tasks.add_task(sync_and_reindex)
    return {"status": "accepted"}  # 즉시 200 응답
```

- HMAC-SHA256 서명으로 GitHub이 보낸 요청인지 검증
- BackgroundTasks로 즉시 200 응답 후 백그라운드에서 동기화 (GitHub 10초 타임아웃 대응)

### 마크다운 파서 + 문서 트리

```python
def get_doc_tree(base_dir: str) -> dict:
    """디렉토리 구조를 JSON 트리로 변환. .md 파일만 대상."""
    tree = {}
    for path in Path(base_dir).rglob("*.md"):
        relative = path.relative_to(base_dir)
        # path traversal 방어: .. 포함된 경로 거부
        if ".." in str(relative):
            continue
        # 트리 구조 생성
        ...
    return tree
```

### 프론트엔드 구성

- SPA 라우팅: hash 기반 (`#/docs`, `#/docs/path`, `#/search`)
- 마크다운 렌더링: marked.js (CDN)
- 코드 하이라이팅: highlight.js (CDN)
- 모바일 퍼스트: 768px 이하에서 사이드바를 슬라이드 메뉴로 변환

---

## Phase 3: RAG 검색

### RAG 흐름

```
사용자 질문: "LangChain에서 프롬프트 템플릿 사용법은?"
    ↓
1. 질문을 text-embedding-3-small로 임베딩
    ↓
2. ChromaDB에서 유사한 문서 청크 top-5 검색 (코사인 유사도)
    ↓
3. 검색된 문서 + 질문을 합쳐서 gpt-4.1-mini 프롬프트 구성
    ↓
4. LLM이 문서 기반으로 답변 생성
    ↓
5. 답변 + 출처(파일 경로) 반환
```

### 청킹 전략

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["## ", "### ", "\n\n", "\n"]
)
```

- 마크다운 헤더(`##`, `###`) 기준으로 의미 단위 분할
- chunk_overlap=200: 청크 경계에서 문맥 유실 방지
- 메타데이터에 파일 경로 포함 → 출처 추적

### 환각 방지 프롬프트

```python
system_prompt = """
당신은 학습 노트 검색 도우미입니다.
주어진 문서 내용만을 기반으로 답변하세요.
문서에 없는 내용은 "해당 내용을 찾을 수 없습니다"라고 답하세요.
"""
```

### ChromaDB 벡터 저장소

```python
import chromadb

client = chromadb.PersistentClient(path="./data/chroma")
collection = client.get_or_create_collection("book_notes")

# 문서 저장
collection.add(
    documents=chunks,
    embeddings=vectors,
    metadatas=[{"source": "langchain/chapter3.md"}],
    ids=["chunk_001"]
)

# 유사도 검색
results = collection.query(query_embeddings=[query_vector], n_results=5)
```

- PersistentClient: 디스크에 저장 → Docker 볼륨으로 영속화
- 별도 서버 없이 Python 라이브러리로 사용

---

## Phase 4: PWA + Docker + 배포

### PWA 설정

manifest.json + Service Worker를 추가하면 브라우저가 "설치 가능한 앱"으로 인식한다.

- Android: Chrome 메뉴 → "홈 화면에 추가"
- iOS: Safari 공유 버튼 → "홈 화면에 추가"

Service Worker 캐싱 전략:

| 요청 | 전략 | 이유 |
|------|------|------|
| 정적 파일 (HTML, CSS, JS) | Cache First | 오프라인에서도 UI 로드 |
| API 요청 (/api/*) | Network First | 최신 데이터 필요 |
| sw.js 자체 | no-cache | 항상 최신 버전 보장 |

### Dockerfile (멀티스테이지 빌드)

```dockerfile
# 빌드 스테이지
FROM python:3.11-slim AS builder
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen

# 런타임 스테이지
FROM python:3.11-slim
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app/.venv .venv
COPY . .
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

- 멀티스테이지: 빌드 도구는 builder에만 설치 → 최종 이미지 경량화
- git 설치 필수: GitPython이 git CLI를 내부적으로 호출

### docker-compose.yml

```yaml
services:
  app:
    build: .
    ports:
      - "8000:8000"
    env_file: .env
    volumes:
      - chroma_data:/app/data/chroma
      - docs_data:/app/data/docs

volumes:
  chroma_data:
  docs_data:
```

- volumes: 컨테이너 삭제/재생성해도 ChromaDB 데이터와 동기화 문서 유지

### nginx 리버스 프록시

```nginx
# HTTP → HTTPS 리디렉트
server {
    listen 80;
    server_name booknotesapp.com;
    return 301 https://$host$request_uri;
}

# HTTPS 서버
server {
    listen 443 ssl http2;
    server_name booknotesapp.com;

    ssl_certificate     /etc/letsencrypt/live/booknotesapp.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/booknotesapp.com/privkey.pem;

    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_read_timeout 120s;  # RAG 검색 대기 시간
    }

    location /webhook/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_read_timeout 30s;
    }
}
```

- SSL 종료를 nginx에서 처리 → FastAPI는 HTTP만 담당
- RAG 검색은 응답이 느릴 수 있어 120초 타임아웃 설정

### AWS 배포 절차

```bash
# 1. EC2 인스턴스 생성 (t3.micro, Ubuntu, 서울 리전)
# 2. 보안 그룹: SSH(22), HTTP(80), HTTPS(443) 오픈
# 3. Elastic IP 할당 + 인스턴스 연결
# 4. Route 53 도메인 등록 + A 레코드에 Elastic IP 설정

# EC2 접속
ssh -i "키파일.pem" ubuntu@3.35.40.73

# Docker 설치
sudo apt update && sudo apt install -y docker.io docker-compose-v2
sudo usermod -aG docker ubuntu

# 코드 배포
git clone https://github.com/username/book-notes-app.git
cd book-notes-app
nano .env  # 환경변수 설정

# SSL 인증서 발급
sudo apt install -y certbot
sudo certbot certonly --standalone -d booknotesapp.com

# nginx 설치 + 설정
sudo apt install -y nginx
sudo cp nginx/default.conf /etc/nginx/sites-available/default
sudo nginx -t
sudo systemctl restart nginx

# Docker 실행
sudo docker compose up -d
```

### Let's Encrypt 인증서 발급 주의사항

- 발급 시 포트 80이 비어있어야 함 (Docker/nginx 중지 후 발급)
- EC2 보안 그룹에서 80, 443 포트 열림 확인 필수
- 인증서 유효기간 90일 (certbot이 자동 갱신 설정)

---

## 트러블슈팅 모음

### hatchling 빌드 에러

```
ValueError: Unable to determine which files to ship inside the wheel
```

pyproject.toml에 빌드 대상 패키지를 명시하지 않아서 발생.

```toml
[tool.hatch.build.targets.wheel]
packages = ["backend"]
```

### Docker에서 git 없음

```
ImportError: Failed to initialize: Bad git executable.
```

Dockerfile runtime 스테이지에 git 설치 누락. `apt-get install -y git` 추가.

### certbot 타임아웃

```
Detail: Fetching http://booknotesapp.com/...: Timeout during connect
```

EC2 보안 그룹에 HTTP(80) 규칙이 없거나, Docker가 포트 80을 점유 중.
보안 그룹 확인 + `docker compose down` 후 재시도.

### OAuth 콜백에서 localhost로 리디렉트

`.env`의 `APP_URL`이 `http://localhost:8000`으로 되어있으면 발생.
`APP_URL=https://booknotesapp.com`으로 변경 + Google Cloud Console에 프로덕션 리디렉션 URI 추가.

---

## 월 비용

| 항목 | 비용 |
|------|------|
| EC2 t3.micro | ~$8.5 (Free Tier 1년 무료) |
| EBS 8GB | ~$0.8 |
| Route 53 도메인 | ~$13/년 |
| Route 53 호스팅 | ~$0.5/월 |
| OpenAI API | ~$0.5 |
| Let's Encrypt / OAuth / ChromaDB | 무료 |
| **합계** | **~$10~11/월** |

---

## 향후 개선 사항

- 검색 결과 스트리밍 (SSE)
- 다크 모드 지원
- 문서 즐겨찾기 / 최근 본 문서
- Airflow DAG로 자동 동기화 + 인덱싱 파이프라인 (LLMOps 연계)
- LangSmith 트레이싱 연동
- GitHub Actions CI/CD로 앱 코드 자동 배포