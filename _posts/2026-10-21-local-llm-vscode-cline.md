---
layout: markdown
title: 로컬 LLM 구축 vscode & cline
tags: [local-llm]
toc: true
---

{% include markdown.html %}

## Settings

### Telemetry

- 내 사용 통계를 외부에 보내는 설정

| 순서 | 위치 | 설정 |
|---|---|---|
| 1 | VS Code `Ctrl + ,` -> `telemetry` 검색 | **Telemetry: Telemetry Level** -> `off` |
| 2 | Cline 패널 -> 설정(톱니바퀴) -> **General** | **Allow error and usage reporting** 체크 해제 |
| 3 | VS Code | 열린 창을 모두 닫고 다시 실행 |

> Cline CLI(터미널 버전)을 사용하는 경우 `%USERPROFILE%\.cline\settings\global-settings.json`에 `"telemetryOptOut": true`를 추가한다.

### Web Search 체크 해제

| 위치 | 설정 |
|---|---|
| Cline 패널 -> 설정(톱니바퀴) -> **Feature Settings** | **Web Search** 체크 해제 |

> 켜져 있으면 모델이 판단해 **내 PC의 인터넷으로** 웹을 검색한다. 검색어에 에러 메시지, 테이블, 서버 주소 같은 사내 정보가 담겨 외부로 나갈 수 있다.  
> 자동 승인(Auto-approve)의 **Execute commands, Fetch Web content, Use MCP Servers**도 꺼져 있는지 함께 확인한다.

### update

| 위치 | 설정 |
|---|---|
| VS Code `Ctrl + ,` -> update 검색 | **Extensions: Auto Update** -> `off` |
| VS Code `Ctrl + ,` -> update 검색 | **Update: Mode** -> `manual` |
| VS Code `Ctrl + ,` -> update 검색 | **Extensions: Auto Check Updates** -> 체크 해제 |

## .clinerules로 작업 규칙 지정

- Cline이 새 작업을 시작할 때 가장 먼저 읽는 프로젝트별 지침 파일

| 항목 | 내용 |
|---|---|
| 위치 | 프로젝트 루트 `.clinerules` (또는 `.clinerules/` 폴더) |
| 적용 시점 | 새 작업(task) 시작 시 |

예시:
- 항상 한국어로 답변한다.
- 파일 삭제, 패키지 설치 전에는 반드시 확인을 요청한다.
- 외부 URL에는 접근하지 않는다.

> 규칙은 모델에 대한 요청일 뿐 강제 차단이 아니다. 실제 차단은 Auto-approve 해제로 한다.

## .clineignore로 접근 차단

- Cline이 **읽거나 수정하지 못하게** 할 파일·폴더를 지정하는 파일
- 모델에게 부탁하는 `.clinerules`와 달리, 도구 차원에서 접근 자체를 막는다

| 항목 | 내용 |
|---|---|
| 위치 | 프로젝트 루트 `.clineignore` |
| 문법 | `.gitignore`와 동일 |
| 적용 시점 | 파일을 저장하면 바로 반영 (새 작업에서 확실히 적용) |

### 예시

```gitignore
# 인증 정보
.env
.env.*
*.pem
*.key
secrets/

# 사내 데이터
data/
*.csv
*.parquet
*.xlsx

# 대용량·불필요 파일
node_modules/
.venv/
__pycache__/
*.log
```

### 확인 방법

1. 위 파일을 만든 뒤 Cline에서 새 작업을 시작한다.
2. "`.env` 파일 내용을 읽어줘"라고 요청한다.
3. 접근이 차단됐다는 메시지가 나오면 정상이다.

> **주의**
> - 차단 대상은 Cline의 파일 읽기·수정 도구다. 승인된 터미널 명령(`cat .env` 등)으로는 우회될 수 있으므로 **Execute commands 자동 승인은 꺼둔다.**
> - 이미 열려 있는 에디터 내용이나 직접 붙여넣은 텍스트는 막지 못한다.
> - 로컬 LLM이어도 파일 내용은 내 PC 안에서 모델로 전달된다. 외부로 나가지 않더라도 불필요한 컨텍스트를 줄이는 효과가 있다.

### .clinerules와 비교

| | `.clineignore` | `.clinerules` |
|---|---|---|
| 성격 | 접근 차단 | 행동 지침 |
| 강제성 | 도구 수준에서 차단 | 모델이 무시할 수 있음 |
| 용도 | 비밀 파일, 대용량 데이터 제외 | 답변 언어, 작업 방식 지정 |