---
layout : markdown
title : Data Structure and Algorithms
tags : [Computer_Science]
toc : true
---

{% include markdown.html %}

# Introduction to Data Structures

## Data Structures

> 데이터를 구성, 저장, 조작하는 방법을 의미함 [ 데이터의 관리 효율성을 조절하기 위한 여러가지 구조에 관한 내용 ]  
> 대표적으로 Array, List, Stack, Queue, Tree, Graph 가 있다.

## Abstract Data Type(=ADT)

> 프로그래밍을 함에 있어 데이터를 추상화하여 논리적인 구조를 정의한 것

- 장점
1. 데이터에 대한 정보를 이해하고 저장하는 방식을 결정함으로써 최적의 알고리즘을 개발할 수 있음
2. 프로그래밍을 효율적으로 구현할 수 있도록 도와줌

- Abstract
> 복잡한 데이터나 시스템 등으로부터 핵심적인 개념 또는 기능을 간추려 내는 것  
> 실제 데이터의 형태를 그대로 다루는 것이 아니라 데이터가 가져야하는 명세(specification)를 기반으로 만듬

## Time and space complexity

- Time complexity : 프로그램이 실행되고, 완료되는데 걸리는 시간
> Compile Time  
> Execution Time [ 주로 이 복잡도 사용 ]  
- Space complexity : 프로그램이 실행되고, 완료되는데 필요한 메모리
> 고정 공간 요구량 : 자료구조가 사용하는 고정된 메모리 공간을 의미[Ex. int, double]  
> 가변 공간 요구량 : 필요에 따라 동적으로 할당, 해제되는 메모리 공간을 의미[Ex. function call]

- Big Oh, Big Ω, and Big Θ notation
> Big oh : 최악의 경우  
> Big Ω : 최선의 경우  
> Big Θ : 평균

$$f(n) = O(g(n)) \iff \exists C > 0, n_0 \in \mathbb{N} \text{ such that } \forall n \geq n_0, 0 \leq f(n) \leq Cg(n)$$

# Stacks and Queues

## Stack

> LIFO(Last-In, First-Out) 구조를 가진 자료구조  
> 가장 최근에 삽입한 요소를 top이라고 지칭한다.  
> Stack의 구조는 컴퓨터 가상메모리의 Stack 영역에서 사용되는데, 함수가 호출되면서 다시 복귀할 주소를 저장하거나, 지역변수, 매개변수 등을 임시로 저장하는데에 쓰인다.

## Queues

> FIFO(First-In, First-Out) 구조를 가진 자료구조  
> front와 rear로 가장 먼저 들어온 요소와 제일 마지막에 들어온 요소에 접근한다.  
> Enqueue : queue에 원소를 삽입  | Dequeue : queue에서 원소를 삭제

# Linked List and Hash Table

## Array

> 연속된 메모리 공간에 같은 타입의 데이터를 순차적으로 저장하는 자료구조  
> 크기가 고정되어 있기 때문에 배열을 생성할 때 크기를 지정해줘야함[ 배열이 가득 차는 경우 새로운 데이터를 추가할 수 없거나 기존 데이터를 삭제해야 함 ]

## Linked List

> 생성 후에 자유롭게 원소를 추가/삭제할 수 있는 자료구조  
> 가변적인 길이를 가지고 있기 때문에, 새로운 데이터 추가에 대한 제한이 거의 없다는 장점이 있다.

## Hash Table

> 데이터의 key를 hash function 을 통해 hash value으로 변환하고, 이 값을 인덱스로 사용하여 데이터를 저장하거나 검색하는 효율적인 자료 구조  
> 평균적으로 O(1)의 시간 복잡도로 데이터에 접근할 수 있다.  
> Hash Table의 사용 목적은 정해진 메모리에 여러 원소를 효율적으로 저장하여 indexing 성능을 O(1)에 가깝게 만드는 것  
> Hash function을 통해 hashing을 하게 되면 다른 원소가 같은 index를 가지는 hash collision이 발생

- Hash Collision을 해결하기 위한 방법
1. Separate Chaining
> 방법 : 해시 테이블의 각 인덱스에 연결 리스트나 다른 자료 구조를 사용하여 여러 개의 key-value pair를 저장  
> 장점 : 간단하고 동적으로 크기를 조절하기 쉽다.
2. Open Addressing
> 방법 : 충돌이 발생하면 다른 빈 슬롯을 찾아 데이터를 저장

# Trees and Graphs

# Basic Algorithm Design
