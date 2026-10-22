---
layout: markdown
title: 로컬 LLM 서버 운영 ④ 방화벽(ufw) 관리
tags: [local-llm]
toc: true
---

{% include markdown.html %}

> 시리즈: ① 접속·계정 관리 → ② Ollama 모델·설정·상태 → ③ 네트워크 상태 확인 → ④ 방화벽(ufw) 관리

## 방화벽 상태 확인

```bash
sudo ufw status
```

- `Status: active`: 방화벽이 켜져 있다. `inactive`면 꺼져 있다.
- `To`: 대상 포트, `Action`: 허용(`ALLOW`) 또는 차단(`DENY`), `From`: 적용되는 접속 위치
- `ss -tlnp`에서 포트가 `0.0.0.0`으로 열려 있는데 외부에서 연결이 안 되면 방화벽이 막은 것일 수 있다.
- 클라우드 서버는 UFW 대신 보안 그룹으로 포트를 관리하기도 한다.

## 포트 열기

### 특정 PC 허용

```bash
sudo ufw allow from PC_IP to any port 포트번호 proto tcp
```

- `PC_IP`: 로컬 PC의 PowerShell에서 `ipconfig`를 입력해 나오는 IPv4 주소. 서버와 같은 사내망일 때만 이 주소가 그대로 쓰인다. VPN이나 NAT를 거치면 서버가 보는 주소가 다를 수 있다.

### 사내망 전체 허용

```bash
sudo ufw allow from 192.168.0.0/24 to any port 포트번호 proto tcp
```

- `192.168.0.0/24`는 예시이며 실제 사내망 대역으로 바꾼다.
- 대역 없이 `sudo ufw allow 포트번호/tcp`만 쓰면 사내망뿐 아니라 어디서든 접속할 수 있다.

### 허용 확인

서버에서 규칙을 확인한다.

```bash
sudo ufw status
```

로컬 PC의 PowerShell에서 실제로 연결되는지 확인한다.

```powershell
Test-NetConnection 서버IP -Port 포트번호
```

- `TcpTestSucceeded : True`이면 포트가 열려 있고 연결된 것이다.

## 포트 닫기

```bash
sudo ufw status numbered
sudo ufw delete 규칙번호
```

- 규칙을 하나 지우면 뒤의 번호가 당겨지므로, 여러 개를 지울 때는 매번 `status numbered`로 번호를 다시 확인한다.
- 번호 대신 규칙을 직접 지정할 수도 있다.

```bash
sudo ufw delete allow 포트번호/tcp
```