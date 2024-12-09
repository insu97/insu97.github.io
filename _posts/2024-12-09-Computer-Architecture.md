---
layout : markdown
title : Computer Architecture
tags : [Computer_Science]
toc : true
---

{% include markdown.html %}

# Computer Organization and Architecture

- Computer Architecture란?
> 컴퓨터 시스템의 구조와 구성요소, 그리고 이들 간의 상호작용에 대한 설계와 구현을 다루는 분야

## Components of a Computer System

1. CPU(Central Processing Unit) : 프로그램의 명령어를 해석하고 실행하는 역할을 한다.[산술 논리 연산 장치(ALU), 제어 장치, 레지스터 등으로 구성]
2. Main Memory : 프로그램이나 데이터를 저장하는 공간으로, CPU가 작업을 수행할 때 필요한 명령어나 데이터가 저장되어 있다.[RAM(Random Access Memory) 존재]
3. Input Device : 사용자가 컴퓨터에 데이터나 명령을 입력하는 장치[키보드, 마우스]
4. Output Device : 컴퓨터에서 처리한 결과를 사용자에게 보여주는 장치[모니터, 스피커]
5. Storage(Secondary Memory) : 데이터를 임시적, 반영구적으로 저장하는 장치[하드 디스크 드라이브, SSD, USB 플래시 드라이브]
6. Bus : 컴퓨터 내부에서 데이터와 명령어를 전송하는 통로[데이터 버스, 주소 버스, 제어 버스 등]
7. (Mother)Board : CPU, 메모리, 버스 등의 하드웨어 요소들이 담겨 있는 회로 기판

## 폰 노이만 아키텍쳐(Von Neumann Architecture)

> 프로그램과 데이터가 같은 메모리 공간에서 저장되어 처리되는 구조  
> 구성요소 : CPU, 메모리, 입출력 장치  
> 특징 : 명령어와 데이터가 동일한 메모리에 저장되어 있기 때문에, 명령어와 데이터를 구분하기 위한 별도의 제어 신호가 필요하지 않다는 것  
> 단점 : 위 특징 때문에 명령어와 데이터를 동시에 처리할 수 없다는 단점을 가짐 -> 현대 컴퓨터에서는 병렬 처리 기술 등을 이용해 이러한 한계를 극복하고 있다.

## Instruction Cycle

> CPU가 메모리부터 1개의 명령어를 가져와 어떤 동작을 요구하는지 결정하고 이를 수행하는 연속적인 과정

- 과정
1. Fetch : CPU가 Instruction을 memory로부터 1word를 읽어 다음으로 실행할 명령어를 인출한다.
2. Decode : CPU가 인출한 명령어를 해독하여 명령어가 어떤 작업을 수행해야 하는지를 결정
3. Execute : CPU가 결정된 명령어를 실행
4. Memory(Access) : CPU가 메모리에 접근하여 데이터를 읽거나 쓸 수 있다.
5. Write Back : 계산된 결과를 레지스터(Register)에 저장한다.

# Central Processing Unit

```
CPU는 컴퓨터 시스템의 핵심 요소 중 하나로 프로그램의 명령어를 해석하고 실행하는 역할을 담당한다.
따라서, CPU는 모든 컴퓨터 시스템에서 필수적인 구성 요소이며, 컴퓨터의 속도와 성능에 큰 영향을 미친다.

CPU는 일반적으로 작은 실리콘 칩에 위치하며, 코어(core)라고 불리는 작은 계산 논리 회로의 집합으로 구성된다.
이 코어들은 다양한 명령어를 수행하고, 데이터를 처리하고, 메모리와 입출력 장치와의 통신을 관리한다.
최근의 CPU는 여러 개의 코어(physical core)를 가진 멀티코어 프로세서가 일반적이다.
멀티코어 CPU는 여러 가지 작업을 병렬로 처리하여 컴퓨터의 처리 속도를 향상시키는 데 도움을 준다.
또한, CPU는 클럭 속도라고 불리는 주파수로 측정되는 작업 속도를 가지고 있으며, 이 속도가 높을수록 CPU가 처리할 수 있는 명령어 수가 늘어나고, 컴퓨터의 처리 속도가 빨라진다.
```

## Components of CPU

- Control Unit(CU) : 프로그램의 명령어를 해석하고, 실행하는 부분
- Arithmetic/Logic Unit(ALU) : 수치 연산과 논리 연산을 처리하는 부분
- Register : CPU내부에 저장되어 있는 소규모 메모리로, 데이터를 저장하거나 처리하는 데 사용된다.

## 성능 향상을 위한 작업 방법

### Pipelining ( 단계별 병렬처리 ) -> Sync ( 시간에 동기화되어있다. )

- Pipelining : 한 가지 작업을 수행하는 데에 여러 단계의 작업이 필요한 경우, 이 단계들을 연속적으로 실행하여 시간을 단축시키는 기술

![image_01](/assets/images/Computer_Science/img_06.png){: style="width: 30vw; height: 20vw" }

### Parallellism (독립적인 병렬처리) -> Async( 시간에 동기화가 되어있지 않아도 된다 )

- Parallellism : 한 번에 여러 작업을 수행하는 것[ EX. 여러 개의 CPU 코어를 사용하여 병렬적으로 작업을 처리하는 것 ]

```
- 두 기술의 차이점
1. Pipelining : 하나의 작업을 여러 단계로 분할하여 각 단계를 병렬적으로 처리
2. Parallellism : 여러 작업을 동시에 처리하여 실행 시간을 단축
```

# Memory Organization and Management

## Memory Hierarchy

> 컴퓨터에서 데이터와 명령어를 저장하는 계층 구조

- Speed = Register > L1 Cache > L2 Cache > L3 Cache > Main >>> Secondary(SSD)
- memory capacity(저장 용량) = Register < Cache << Main <<< Secondary(SSD)

- Register : 가장 빠른 속도로 데이터에 접근할 수 있는 기억장치
- Cache Memory(L1 > L2 > L3) : CPU와 메인 메모리 사이에 위치하는 기억장치, CPU가 처리할 데이터나 명령어를 미리 가져와 저장하므로, 더 빠른 속도로 접근이 가능
- Main Memory(DRAM) : 프로그램이 실행될 때 필요한 데이터나 명령어가 저장되는 주 기억장치
- Secondary Memory(=Storage) : HDD나 SSD와 같은 보조기억장치를 말함

![image_02](/assets/images/Computer_Science/img_07.png){: style="width: 30vw; height: 20vw" }

## Types of memory(RAM, ROM, Flash Memory)

1. RAM(Random Access Memory)
> 컴퓨터가 작업 중인 데이터와 프로그램을 저장하는 메모리  
> 읽기와 쓰기 모두 가능하며, 전원이 꺼지면 내용이 지워진다.
2. ROM(Read-Only Memory)
> 주로 컴퓨터의 BIOS(Basic Input/Output System)나 장치 드라이브 등 시스템 소프트웨어를 저장하는 메모리  
> 읽기만 가능하며, 내용을 수정할 수 없다.  
> 전원이 꺼져도 내용이 지워지지 않는다.  
3. [NAND]Flash Memory
> 컴퓨터나 디지털 기기에서 많이 사용되는 메모리  
> 저장하고 읽기와 쓰기 모두 가능하다.  
> 전원이 꺼져도 내용이 지워지지 않으며, 비교적 저렴한 가격과 높은 용량을 제공 [ USB 메모리, SD 카드, SSD(Solid State Drive)등에 사용된다 ]

# I/O

## Types of I/O Device

1. Block Device

- HDD : 기계쩍인 구조로 이루어진 저장 장치, 자성을 띄는 원형 디스크가 회전하면서 헤드로 데이터를 읽고 쓰는 작업이 이루어진다.

> 구조
1. Platter : 여러 개의 자성 디스크가 쌓여 있으며, 고속으로 회전합니다.
2. Head : 데이터를 사용하기 위한 작은 장치로, Platter 위에서 자기 신호를 감지
3. Spindle : Platter 가 회전 하는걸 고정 해주는 축
4. Arm : Platter의 특정 위치로 Head를 옮겨주는 역할  

> 장점 : 비교적 저렴한 가격  
> 단점 : 기계의 움직임으로 인하여 데이터 입출력이 비교적 느리며, 충격에 취약하다.

- SSD : 반도체 메모리 칩(NAND 플래시 메모리)으로 이루어진 저장 장치

> 구조
1. NAND memory : 데이터가 저장되는 비휘발성 메모리
2. Controller : 데이터를 관리하는 역할을 하는 장치
3. DRAM : Cache를 지원하여 더 빠른 속도를 지원할 수 있다.

> 장점 : 빠른 동작 속도, 기계가 아니라서 충격에 강함  
> 단점 : NAND 메모리 성능의 한계, 비교적 비싼 가격

2. Character Device : Data가 단발성으로 발생이 되는 streaming data를 다루는 장치[Ex. Network, Keyboard]

## Components of I/O System

![image_03](/assets/images/Computer_Science/img_08.png){: style="width: 30vw; height: 20vw" }

- device controller : 각 I/O 장치마다 존재하며, 데이터 전송을 관리하는 하드웨어

> 구성요소
1. I/O port : 장치와 직접적으로 명령어 및 데이터를 주고 받는 부분
2. register : 데이터, 장치의 상태, 동작의 명령어등을 저장하고 보내는 영역

> 역할
1. 해당하는 device의 하드웨어적인 동작 제어를 함.
2. 데이터를 주고 받는다.
3. 작업 상태에 따른 interrupt를 CPU에 전달

- device driver : 하드웨어와 소프트웨어 간의 인터페이스를 제공하는 소프트웨어

> 구성요소
1. I/O control : 운영체제와 하드웨어 장치를 관리
2. buffering : 데이터를 임시저장하여 반응속도를 높여준다.
3. Interrupt handler : 발생한 interrupt를 처리할 수 있다.

> 역할
1. 장치 제어, 데이터 관련 정보를 포멧에 맞게 맞춰 보내준다.
2. 장치 상태를 추적하여 오류 발생 시 운영체제에게 알려준다.

> 종류
1. kernel mode driver : 자원을 활용하는 상태
2. user mode driver : 유저가 사용하는 제한된 상태

- port : 컴퓨터와 연결이 되는 지점
- Bus : I/O Device 간의 연결 및 Device와 CPU등과 연결을 도와준다.

## Methods of I/O Data transmission

- Pooling Method : 장치가 준비되었을 때 CPU에 신호를 보내 작업을 처리하는 방식

> 동작 순서  
    - CPU가 명령어 레지스터에 명령어를 작성하고 자신이 할일을 수행  
    - controller가 명령어 레지스터에서 명령어를 받아서 수행  
    - controller가 수행완료 및 특이사항 발생시 interrupt를 유발   
    - CPU가 interrupt를 처리  
    - CPU가 controller의 결과물을 받는다.  

> 장단점  
    - 장점 : 감시체계가 사라져서 리소스의 낭비가 사라졌음  
    - 단점 : interrupt의 발생이 많아질경우 CPU가 계속 응답해줘야 하기때문에 과부하가 발생할 수 있다.  

- Interrupt Method : CPU 개입 없이 I/O 장치가 직접 메모리와 데이터를 주고받는 방식

> 동작 순서  
    - CPU가 DMA controller에 데이터를 요청  
    - DMA controller가 I/O에서 memory로 데이터를 전송  
    - memory로 전송 완료 되면 interrupt를 발생  
    - CPU가 interrupt와 데이터를 사용  

> 장단점  
    - 장점 : CPU의 간섭없이 많은 데이터를 송수신 할 수 있다.  
    - 단점 : DMA controller가 지원이 되어야 하며,  적은 데이터를 사용할때는 번거로울 수 있다.  
