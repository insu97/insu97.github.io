---
layout : markdown
title : Operating System-04
tags : [Computer_Engineering]
toc : true
---

{% include markdown.html %}

# 가상 메모리 관리

## 페이징과 페이지 테이블

- swapping : 프로세스를 보조기억장치의 일부 영역으로 쫓아내고 당장 필요한 프로세스를 적재하는 메모리 관리 기법
- swap-out : 프로세스를 보조기억장치의 일부 영역으로 쫓아내는 것
- swap-in : swap-out 된 프로세스를 메모리에 적재하는 것
- swap 영역 : swap-out된 프로세스가 적재되는 보조기억장치 영역

- 연속 메모리 할당 : 프로세스를 메모리에 연속적으로 배치하는 방식
> 부작용 : 외부 단편화 [ 프로세스들이 실행되고 종료되길 반복하며 빈 공간이 생기는 메모리 낭비 현상 ]

- 페이징
> 물리 메모리를 프레임이라는 일정한 크기로 나누고  
> 프로세스를 페이지라는 일정한 크기로 나눈 뒤  
> 페이지를 프레임에 매핑하는 메모리 관리 방식

- 가상 메모리
> 프로세스의 일부만을 적재하여 실제 물리 메모리보다 큰 프로세스를 실행하는 기술  
> 페이징은 현대 운영체제에서 가장 대중적으로 사용되는 가상 메모리 관리 기법

- 페이지 테이블 : 프레임과 페이지의 매핑 정보를 담고 있는 표 형태의 데이터
> 페이지 테이블 베이스 레지스터(PTBR) : 각 프로세스의 페이지 테이블 위치를 가리키는 레지스터  
> TLB(Translation Lock-aside Buffer) : 페이지 테이블의 캐시 메모리  
> 유효 비트(valid bit) : 페이지 테이블 내 정보
>> 페이지 폴트(page fault) : 접근하려는 페이지가 보조기억장치에 있을 경우
```
> 작업 내역 백업  
> 페이지 폴트 루틴 실행 - 접근하려는 페이지 적재
> 유효 비트 1로 변경
> 접근하려는 페이지 접근
```
> 보호 비트(protection bit) : 접근하려는 페이지의 권한  
> 참조 비트(reference bit) : 접근한 적 있는 페이지인가?  
> 수정 비트(modify bit / dirty bit) : 쓰기 작업을 한 적 있는 페이지인가?

## 요구 페이징, 스래싱

- 요구 페이징
> 처음부터 모든 페이지를 적재하지 않고 페이지 폴트가 발생하면 그 때 페이지를 적재한다.  

- 순수 요구 페이징
> 아무 페이지를 적재하지 않고 실행  
> 첫 명령어 실행부터 페이지 폴트 발생  
> 적당한 페이지가 적재된 이후부터 페이지 폴트 감소

- 스래싱
> 프로세스 실행 시간보다 페이징에 더 많은 시간이 소요되는 문제

## 페이지 교체 알고리즘

> 매모리에 적재된 페이지 중 페이지-아웃시킬 페이지를 선정하는 방법  
> 좋은 페이지 교체 알고리즘은 페이지 폴트를 적게 일으키는 알고리즘

- 종류
1. FIFO 페이지 교체 알고리즘
2. 2차 기회 FIFO 페이지 교체 알고리즘
3. 최적 페이지 교체 알고리즘
4. LRU 페이지 교체 알고리즘
