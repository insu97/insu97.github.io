---
layout: markdown
title: 로컬 LLM 구축 명령어 치트시트
tags: [local-llm]
toc: true
---

{% include markdown.html %}

## 기본 명령어

| 명령어 | 동작 | 위치 | 셀 |
|---|---|---|---|
| `ssh 사용자명@서버IP` | 서버 접속 | 로컬 PC | powershell |
| `sudo reboot` | 재부팅 | 서버 | bash |
| `sudo shutdown now` | 즉시 종료 | 서버 | bash |
| `sudo shutdown +N` | N분 뒤 종료 | 서버 | bash |
| `sudo shutdown -c` | 예약된 종료 취소 | 서버 | bash |
| `sudo -iu 사용자 계정` | 계정 전환 | 서버 | bash |

## 파일 편집 (nano)

```bash
nano 파일이름
sudo nano 파일이름   # root 소유 파일(설정 파일 등)은 sudo로 연다
```

### 저장하고 종료

1. `Ctrl+O`: 저장 (파일 이름 확인 화면에서 `Enter`)
2. `Ctrl+X`: 종료

저장하지 않은 변경이 있는 상태에서 `Ctrl+X`를 누르면 저장 여부를 묻는다.

- `Y` → `Enter`: 저장하고 종료
- `N`: 저장하지 않고 종료

### 검색

| 단축키 | 동작 |
|---|---|
| `Ctrl+W` | 검색어 입력 후 `Enter`로 첫 위치 찾기 |
| `Alt+W` | 같은 단어의 다음 위치 |
| `Alt+Q` | 같은 단어의 이전 위치 |

### 자주 쓰는 편집 단축키

| 단축키 | 동작 |
|---|---|
| `Ctrl+K` | 현재 줄 잘라내기 |
| `Ctrl+U` | 붙여넣기 |
| `Alt+U` / `Alt+E` | 실행 취소 / 다시 실행 |
| `Ctrl+/` | 줄 번호로 이동 |
| `Ctrl+G` | 도움말 |