---
layout : markdown
title : System Programming - 01
tags : [Computer_Engineering]
toc : true
---

{% include markdown.html %}

# 파일 다루기

## 파일 디스크립터와 파일 포인터

- File Descripter : 저수준에서 파일을 식별하는 정보
> 고정된 파일 디스크립터 값
1. 0번 : 표준 입력
2. 1번 : 표준 출력
3. 2번 : 표준 에러

- Parameter
> pathname : 파일 경로  
> flag : 접근 플래그  
> mode : 파일 생성시 모드  
> fd : 닫고자 하는 파일 디스크립터  
> stream : 파일 포인터

- 권환
> 읽기 4  
> 쓰기 2  
> 실행 1

- 파일 포인터 : FILE*타입
> 파일을 스트림처럼 읽고 쓰기 위한 자료형 -> 편리한 함수 기능 많음  
> 파일 디스크립터가 저수준에서 파일을 식별하는 정보라면 파일 포인터는 고수준 파일 식별 정보

## 파일 입력

- read : 파일 읽기
> stream : 파일 포인터    
> format : 입력 포멧  
> s : 문자열 버퍼  
> size : 버퍼 크기  
> ptr : 저장 결과를 담을 주소(저장 결과 포인터)  
> nmemb : 입력할 item 개수

## 파일 출력

- 파일 쓰기 : write
> c : 출력할 문자  
> offset : whence값 기준 떨어져있는 위치  
> whence : 기준점(SEEK_SET : 파일의 시작 기준, SEEK_END : 파일의 끝 기준, SEEK_CUR : 현재 파일 위치 기준)  

## 디렉터리 다루기

- 생성 : mkdir
- 비어있는 디렉터리 삭제하기 : rmdir
- 열기 : *opendir
- 열린 디렉터리 닫기 : clodesir
- 디렉터리 읽기 : dirent *readdir

## 하드 링크와 심볼릭 링크

- 하드 링크 파일 : 하드 링크 생성 시 같은 아이노드를 공유하는 하드 링크 파일이 생성됨
- 심볼릭 링크 파일 : 심볼릭 링크 생성 시 원본 파일을 가리키는 새로운 아이노드를 만든다.

```
1. 하드링크는 같은 아이노드 번호를 가지는 파일 생성
2. 심볼릭 링크는 원본 파일을 가리키는 파일 생성

1. 하드링크는 같은 아이노드 번호를 가지는 파일 생성
2. 심볼릭 링크는 원본 파일을 가리키는 파일 생성

- 하드링크 생성하기
$ ln 원본파일이름 하드링크파일이름

- 심볼릭 링크 생성하기
$ ln -s 원본파일이름 심볼릭링크파일이름
```

## 파일 속성 다루기

- 파일 : 보조기억장치의 의미있는 정보의 집합
> 구성요소 : 이름, 실행하기 위한 정보, 부가 정보  
> 접근 단위 : block[섹터 단위가 아님]

## 파일 메모리 매핑

- 파일 메모리 매핑
> 프로세스 메모리 영역에 파일의 내용 일부에 대응시키는 것  
> 디스크에 있는 파일에 읽고 쓰는 것(파일 입출력)이 아니라 프로세스 메모리 영역에 읽고 쓰기  
> 두 개 이상의 프로세스가 같은 영역을 매핑할 경우 다른 프로세스와의 통신 가능

- mmap
> addr : 매핑할 메모리 주소에 대한 힌트(NULL일 경우 임의의 위치에 매핑)  
> Length : 매핑할 바이트 단위 길이  
> prot : 메모리 보호 모드  
> flags : 매핑 형태와 동작 방식  
> fd : 파일 디스크립터  
> offset : 매핑을 시작할 위치