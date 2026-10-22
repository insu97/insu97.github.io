---
layout: markdown
title: 로컬 LLM 서버 운영 ③ 네트워크 상태 확인
tags: [local-llm]
toc: true
---

{% include markdown.html %}

> 시리즈: ① 접속·계정 관리 → ② Ollama 모델·설정·상태 → ③ 네트워크 상태 확인 → ④ 방화벽(ufw) 관리

## 네트워크 확인 명령어

| 명령어 | 동작 | 위치 | 셸 |
|---|---|---|---|
| `ip -br addr` | 서버 IP 확인 | 서버 | bash |
| `ip route` | 인터넷으로 나가는 경로가 있는지 확인 | 서버 | bash |
| `sudo ss -tlnp` | 어떤 포트가 열려 있는지 확인 | 서버 | bash |
| `sudo ufw status` | 방화벽이 포트를 허용하는지 확인 | 서버 | bash |
| `ping -c 3 서버IP` | IP에 닿는지 확인 | 서버 또는 로컬 PC | bash |
| `nc -zv -w 3 서버IP 포트번호` | 특정 포트에 연결되는지 확인 | 서버 또는 로컬 PC | bash |

### IP 확인

```bash
ip -br addr
```

- `lo`: 자기 자신(루프백)
- `enp...`: 유선 랜
- `wlp...`: Wi-Fi
- `docker0`: Docker 기본 네트워크
- `br-xxx`: docker compose가 만든 네트워크
- `veth...`: 컨테이너가 만든 가상 인터페이스
- 두 번째 컬럼의 `UP` / `DOWN`으로 연결 상태를 확인한다.

### 인터넷 연결 확인

```bash
ip route
```

첫 줄에 `default via ...`가 보이면 외부로 나가는 경로(게이트웨이)가 있는 것이다. 없으면 인터넷 연결이 안 된 상태다. 경로가 있어도 DNS 문제로 인터넷이 안 될 수 있다.

### 열린 포트 확인

```bash
sudo ss -tlnp
```

- `-t`: TCP, `-l`: 대기(LISTEN) 중인 포트, `-n`: 숫자로 표시, `-p`: 프로세스 표시
- `Local Address:Port`: 서버의 어느 주소, 몇 번 포트에서 기다리는지
  - `0.0.0.0` 또는 `[::]`: 외부에서도 접속할 수 있다.
  - `127.0.0.1`: 서버 자신만 접속할 수 있다.
- `Process`: 그 포트를 쓰는 프로그램. `sudo`로 실행해야 보인다.

로컬 LLM 서버에 외부에서 접속이 안 되면 `127.0.0.1`로 떠 있는지 먼저 확인한다.

### 연결 확인

```bash
ping -c 3 서버IP           # -c 3: 3번만 보낸다
nc -zv -w 3 서버IP 포트번호  # -z: 연결만 확인, -v: 결과 표시, -w 3: 3초 기다린다
```

- `ping`은 IP에 닿는지만 확인한다. 방화벽이 ICMP를 막은 서버는 실패해도 정상일 수 있다.
- `nc -zv`는 그 포트가 실제로 열려 있는지 확인한다.

방화벽 확인과 포트 열기·닫기는 [④ 방화벽(ufw) 관리]({% post_url 2026-10-21-local-llm-ops-firewall %})를 참고한다.
