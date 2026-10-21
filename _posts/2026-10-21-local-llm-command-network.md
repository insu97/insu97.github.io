---
layout: markdown
title: 로컬 LLM 구축 명령어 치트시트 - 네트워크
tags: [local-llm]
toc: true
---

{% include markdown.html %}

## 네트워크

### 네트워크 확인 명령어

| 명령어 | 동작 | 위치 | 셸 |
|---|---|---|---|
| `ip -br addr` | 서버 IP 확인 | 서버 | bash |
| `ip route` | 인터넷으로 나가는 경로가 있는지 확인 | 서버 | bash |
| `sudo ss -tlnp` | 어떤 포트가 열려 있는지 확인 | 서버 | bash |
| `sudo ufw status` | 방화벽이 포트를 허용하는지 확인 | 서버 | bash |
| `ping -c 3 서버IP` | IP에 닿는지 확인 | 서버 또는 로컬 PC | bash |
| `nc -zv -w 3 서버IP 포트번호` | 특정 포트에 연결되는지 확인 | 서버 또는 로컬 PC | bash |

#### IP 확인

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

#### 인터넷 연결 확인

```bash
ip route
```

첫 줄에 `default via ...`가 보이면 외부로 나가는 경로(게이트웨이)가 있는 것이다. 없으면 인터넷 연결이 안 된 상태다. 경로가 있어도 DNS 문제로 인터넷이 안 될 수 있다.

#### 열린 포트 확인

```bash
sudo ss -tlnp
```

- `-t`: TCP, `-l`: 대기(LISTEN) 중인 포트, `-n`: 숫자로 표시, `-p`: 프로세스 표시
- `Local Address:Port`: 서버의 어느 주소, 몇 번 포트에서 기다리는지
  - `0.0.0.0` 또는 `[::]`: 외부에서도 접속할 수 있다.
  - `127.0.0.1`: 서버 자신만 접속할 수 있다.
- `Process`: 그 포트를 쓰는 프로그램. `sudo`로 실행해야 보인다.

로컬 LLM 서버에 외부에서 접속이 안 되면 `127.0.0.1`로 떠 있는지 먼저 확인한다.

#### 방화벽 확인

```bash
sudo ufw status
```

- `Status: active`: 방화벽이 켜져 있다. `inactive`면 꺼져 있다.
- `To`: 대상 포트, `Action`: 허용(`ALLOW`) 또는 차단(`DENY`), `From`: 적용되는 접속 위치
- `ss -tlnp`에서 포트가 `0.0.0.0`으로 열려 있는데 외부에서 연결이 안 되면 방화벽이 막은 것일 수 있다.
- 클라우드 서버는 UFW 대신 보안 그룹으로 포트를 관리하기도 한다.

#### 연결 확인

```bash
ping -c 3 서버IP           # -c 3: 3번만 보낸다
nc -zv -w 3 서버IP 포트번호  # -z: 연결만 확인, -v: 결과 표시, -w 3: 3초 기다린다
```

- `ping`은 IP에 닿는지만 확인한다. 방화벽이 ICMP를 막은 서버는 실패해도 정상일 수 있다.
- `nc -zv`는 그 포트가 실제로 열려 있는지 확인한다.

### 포트 방화벽 관리 (ufw)

#### 특정 PC 허용

```bash
sudo ufw allow from PC_IP to any port 포트번호 proto tcp
```

- `PC_IP`: 로컬 PC의 PowerShell에서 `ipconfig`를 입력해 나오는 IPv4 주소. 서버와 같은 사내망일 때만 이 주소가 그대로 쓰인다. VPN이나 NAT를 거치면 서버가 보는 주소가 다를 수 있다.

#### 사내망 전체 허용

```bash
sudo ufw allow from 192.168.0.0/24 to any port 포트번호 proto tcp
```

- `192.168.0.0/24`는 예시이며 실제 사내망 대역으로 바꾼다.
- 대역 없이 `sudo ufw allow 포트번호/tcp`만 쓰면 사내망뿐 아니라 어디서든 접속할 수 있다.

#### 허용 확인

서버에서 규칙을 확인한다.

```bash
sudo ufw status
```

로컬 PC의 PowerShell에서 실제로 연결되는지 확인한다.

```powershell
Test-NetConnection 서버IP -Port 포트번호
```

- `TcpTestSucceeded : True`이면 포트가 열려 있고 연결된 것이다.

#### port 닫기

```bash
sudo ufw status numbered
sudo ufw delete 규칙번호
```

- 규칙을 하나 지우면 뒤의 번호가 당겨지므로, 여러 개를 지울 때는 매번 `status numbered`로 번호를 다시 확인한다.
- 번호 대신 규칙을 직접 지정할 수도 있다.

```bash
sudo ufw delete allow 포트번호/tcp
```