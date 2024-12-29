---
layout : markdown
title : System Programming - 03
tags : [Computer_Engineering]
toc : true
---

{% include markdown.html %}

# 소켓

> socket : 네트워크를 경유하는 프로세스 간 통신의 종착점

```
> 송신지 프로세스는 메세지를 소켓으로 보내고 수신지 프로세스는 메세지를 소켓에서 읽는다.

> 소켓은 프로세스 간 통신 기법(IPC)의 일종
```

- 구성요소
1. TCP + IP 혹은 UDP + IP
2. 출발지 IP 주소
3. 출발지 포트 번호
4. 목적지 IP 주소
5. 목적지 포트 번호

## TCP 소켓 다루기

- socket : 소켓을 생성
> $ int socket(int domain, int type, int protocol)  
> domain : 통신 도메인 지정 ( 프로토콜 집단 )  
> type : 통신 방법 지정  
> protocol : 특정 프로토콜 지정
- bind : 호스트의 IP 주소를 소켓에 연결
> $ int bind(int socketfd, struct sockaddr *my_addr, socklen_t addrlen)  
> socketfd : 생성된 소켓 디스크립터  
> my_addr : 호스트의 주소  
> addrlen : my_addr의 바이트 길이
- listen : LISTEN 상태로 전환
> $ int listen(int socketfd, int backlog)  
> socketfd : 소켓 디스크립터  
> backlog : 연결 요청을 담을 큐
- accept : 연결 요청 수락
> $ int accept(int socketfd, struct sockaddr *addr, socklen_t *addrlen)  
> socketfd : 소켓 디스크립터  
> addr : 연결 요청한 상대에 대한 정보  
> addrlen : addr의 바이트 단위 길이
- connect : 연결 요청
> $ int connect(int sockfd, const struct sockaddr *serv_addr, socklen_t addrlen)  
> sockfd : 소켓 디스크립터  
> serv_addr : 통신을 연결할 상대에 대한 정보  
> addrlen : serv_addr의 길이
- recv / send : 소켓으로 송수신
> $ int send(int sockfd, const void *msg, size_t msg_len, int flags)  
> $ int recv(int sockfd, void *msg, size_t msg_len, int flags)
- close : 소켓 닫기
> $ int close(int fd)


## UDP 소켓 다루기

- socket : 소켓을 생성
- bind : 호스트의 IP 주소를 소켓에 연결
- sendto : 메세지 송신
> $ int sendto(int sockfd, const void *msg, size_t len, int flags, const struct sockaddr *to, socklen_t tolen)  
> socketfd : 소켓 디스크립터  
> msg : 송신할 메세지를 저장할 공간  
> len : 전송할 메세지의 길이  
> flags : 송신 방식 결정 -> 일반적으로 0  
> to : 메세지를 송신할 상대 호스트의 정보  
> tolen : to의 바이트 단위 크기
- recvfrom : 메세지 수신
> $ int recvfrom(int sockfd, void *buf size_t, int flags, struct sockaddr *from socklen_t *fromlen)  
> buf : 수신할 메세지를 저장할 공간  
> len : buf의 크기  
> flogs : 수신 방식 결정 -> 일반적으로 0
- from : 메세지를 송신한 호스트의 정보  
> fromlen : from의 바이트 단위 크기
- close : 소켓 닫기
