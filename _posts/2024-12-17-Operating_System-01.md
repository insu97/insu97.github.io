---
layout : markdown
title : Operating System-01
tags : [Computer_Engineering]
toc : true
---

{% include markdown.html %}

# 운영체제의 역할

- 리소스 : 실행에 마땅히 필요한 요소
- 운영체제 : 자원을 관리하고 할당하는 특별한 프로그램

- 커널영역 : 운영체제 서비스를 제공받을 수 있는 모드(입출력 가능)
- 사용자영역 : 운영체제 서비스를 제공받을 수 없는 모드(입출력 불가능)
- 시스템 콜 : 운영체제 서비스를 제공받기 위해 커널 모드로 전환하는 것[소프트웨어 인터럽트라고 불리기도]

- 운영체제 핵심 서비스
1. 프로세스 관리
2. 자원 관리 접근 및 할당[Ex. CPU, 메모리, 보조기억장치 & 입출력장치]
3. 파일 시스템 관리 - 파일 시스템

# 리눅스 설치

- [Virtualbox 설치](https://www.virtualbox.org/)
- [Ubuntu 22.04 설치](https://releases.ubuntu.com/22.04/)

1. virtualbox 실행
2. 새로만들기 -> 이름 설정 -> ISO 이미지 ubuntu에서 받은 .iso파일 지정 -> 무인 설치 건너뛰기 체크[= Skip Unattended Installation] -> 다음
3. 기본메모리, 프로세서 설정은 환경에 맞게[Ex. 2048MB, 2개]
4. 지금 새 가상 하드 디스크 만들기 선택[= Create a Virtual Hard Disk Now, 25GB] -> 다음 -> 완료
5. 시작 버튼 클릭 -> Try or Install Ubuntu 엔터 -> 언어 English 선택 -> Install Ubuntu 선택
6. English, English -> Continue -> Minimal installation , Download updates while installing Ubuntu -> Continue
7. Erase disk and install Ubuntu -> install now -> Continue -> seoul 선택 -> Continue
8. 이름과 비밀번호 설정 -> Continue -> Restart Now

- 환경설정
> ubuntu에서 terminal 실행 후 아래 명령어 입력
```bash
$ sudo apt install gcc -y
$ gcc --version
$ sudo apt install git -y
$ git --version
$ sudo apt-get install vim -y
```

- 종료
> 현재 시스템 상태 저장하기 클릭 후 확인

# strace

> 시스템 콜을 추적하기 위한 도구

- 설치
```bash
$ apt-get update
$ apt-get install strace
```

- 깊게 공부하고 싶다면 다음 명령어 출력 페이지 공부하기
```bash
$ man strace
```

- 사용법
> 만약 ls 라는 명령어에 관한 시스템 콜을 확인하고 싶다면
```bash
$ strace ls
```

- Tip
```bash
$ ps   # 현재 실행되고 있는 Process 확인
$ strace -o output.txt ls   # ls 에 관한 시스템 콜을 output.txt 파일로 출력물을 저장
$ strace -t ls   # 타임 스탬프
$ strace -tt ls   # 밀리세컨드 타임스탬프
$ strace -T ls   # 각 시스템 호출 소요 시간
$ strace -c ls   # 요약 결과 출력
$ strace -e trace=open,read ls   # 실행 파일의 시스템 호출 결과 필터링
```

# 시스템 콜

- 종류
> open/close  
> read/write  
> fork/exec
```
>> fork : 프로세스 복제하여 자식 프로세스 생성, 프로세스들이 계층적으로 구성되는 원리
>> exec : 현재 프로세스의 주소 공간을 새로운 프로세스로 덮어쓰기, 자식 프로세스로 하여금 다른 코드를 실행토록 하기
```
> getpid/getppid
```
>> getpid : PID를 반환하는 시스템 콜
>> getppid : 부모 프로세스 PID를 반환하는 시스템 콜
```
> syslog : 시스템 로그 남기기  
> exit : 실행 중인 프로그램 종료
