---
layout: markdown
title: 로컬 LLM 서버 운영 ① 접속·계정 관리
tags: [local-llm]
toc: true
---

{% include markdown.html %}

> 시리즈: ① 접속·계정 관리 → ② Ollama 모델·설정·상태 → ③ 네트워크 상태 확인 → ④ 방화벽(ufw) 관리

## 접속·전원·계정 전환

| 명령어 | 동작 | 위치 | 셸 |
|---|---|---|---|
| `ssh 사용자명@서버IP` | 서버 접속 | 로컬 PC | powershell |
| `sudo reboot` | 재부팅 | 서버 | bash |
| `sudo shutdown now` | 즉시 종료 | 서버 | bash |
| `sudo shutdown +N` | N분 뒤 종료 | 서버 | bash |
| `sudo shutdown -c` | 예약된 종료 취소 | 서버 | bash |
| `sudo -iu 사용자 계정` | 계정 전환 | 서버 | bash |

## 사용자 관리

| 명령어 | 동작 | 위치 | 셸 |
|---|---|---|---|
| `sudo adduser 아이디` | 사용자 계정 만들기 | 서버 | bash |
| `sudo passwd 아이디` | 비밀번호 설정/변경 | 서버 | bash |
| `sudo usermod -aG sudo,docker 아이디` | 그룹에 추가해 sudo·docker 권한 주기 | 서버 | bash |
| `groups 아이디` | 한 사용자의 그룹(권한) 보기 | 서버 | bash |
| `sudo deluser 아이디` | 계정 삭제 | 서버 | bash |

- `adduser`는 Ubuntu/Debian용이다. RHEL 계열은 `useradd`를 쓴다. 실행하면 비밀번호와 이름을 묻는다.
- `usermod -aG`에서 `-a`를 빼면 기존 그룹이 모두 사라진다. 변경은 다시 로그인해야 적용된다.
- `docker` 그룹은 사실상 root 권한과 같으므로 신뢰하는 사용자에게만 준다.

### 계정 목록 보기

```bash
getent passwd | awk -F: '$3>=1000 && $3<65534 {print $1}'
```

- `getent passwd`: 시스템의 모든 계정 목록
- `awk ...`: UID가 1000 이상 65534 미만인 일반 계정만 골라 이름만 출력한다. `nobody`(65534) 같은 특수 계정은 뺀다.

### 전체 사용자의 그룹 보기

```bash
for u in $(getent passwd | awk -F: '$3>=1000 && $3<65534 {print $1}'); do groups $u; done
```

위 목록의 각 계정에 대해 `groups`를 실행한다.

> 파일 편집이 필요하면 [nano 편집기 사용법]({% post_url 2026-10-20-local-llm-nano %})을 참고한다.
