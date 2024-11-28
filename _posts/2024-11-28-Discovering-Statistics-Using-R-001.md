---
layout : markdown
title : Discovering Statistics Using R - 001
tags : [Discovering_Statistics_Using_R, R]
toc : true
---
{% include markdown.html %}

# CH01

> 양적 연구 방법 : 정량적 방법  
> 질적 연구 방법 : 정성적 방법

---

> 반증 : 가설이나 이론이 틀렸음을 증명하는 것

---

> 독립변수 : 원인으로 제시된 변수  
> 종속변수 : 결과(효과)로 제시된 변수

---

> 측정수준 : 측정 대상과 그 측정 대상이 나타내는 수치 사이의 관계  
> 변주형변수 : 범주들로 구성  
> 이분변수 : 남성 또는 여성처럼 서로 다른 두 가지 것을 지칭하는 것  
> 명목변수 : 어떤 의미에서 동등하다고 간주되는 대상들에 같은 이름을 부여하되, 그런 이름들이 두 가지보다 많은 경우  
> 순서변수 : 순서 있는 범주들을 나타내는 범주형변수  
> 연속변수 : 순서변수에서 측정수준을 한 단계 더 높인 것[Ex. 구간변수]  
> 비율변수 : 구간변수에서 한 걸음 더 나아간 것으로, 척도상에서 값들의 비(ratio)들이 의미가 있어야 한다

---

> 측정오차 : 우리가 측정 대상을 나타내는 데 사용하는 수치들과 측정 대상의 실제 값의 차이  

- 측정오차를 최소화하는 방법
1. 타당성 : 측정 장치가 우리가 측정하고자 하는 것을 실제로 측정했는지 여부
2. 신뢰성 : 서로 다른 상황에서 측정 장치를 일관되게 해석할 수 있는지의 여부 또는 정도를 뜻 함

---

1. 상관연구 : 세상에서 자연스럽게 발생하는 일을 직접적인 간섭 없이 관찰하는 방식
2. 실험연구 : 변수 하나를 조작해서 그것이 다른 변수들에 미치는 영향을 보는 방식

- 여러 변수를 동시에 측정하면 발생하는 문제
1. 서로 다른 변수들의 시간관계에 대해 알 수 없다는 것
2. 제3의 요소 : 그 특성이 아직 알려지지 않은 어떤 제3의 인물이나 사물을 뜻 함

- 반복 측정 시 주의해야 할 점
1. 연습 효과 : 참가자가 실험 상황이나 측정 방식에 익숙해져서 둘째 조건에서는 이전과 다르게 행동할 수 있음
2. 권태 효과 : 참가자가 첫 조건을 마치고 지치거나 지루해져 둘째 조건에서는 이전과 다르게 행동할 수 있다.

---

- 왜도와 첨도

<div style="display: flex; justify-content: space-between;">
  <img src="/assets/images/Book/Discovering_Statistics_Using_R/plot1.png" alt="plot1" style="width: 48%; margin-right: 10px;">
  <img src="/assets/images/Book/Discovering_Statistics_Using_R/plot2.png" alt="plot2" style="width: 48%; margin-right: 10px;">
</div>
<div style="display: flex; justify-content: space-between;">
  <img src="/assets/images/Book/Discovering_Statistics_Using_R/plot3.png" alt="plot1" style="width: 48%; margin-right: 10px;">
  <img src="/assets/images/Book/Discovering_Statistics_Using_R/plot4.png" alt="plot2" style="width: 48%; margin-right: 10px;">
</div>

---

- 최빈값 : 자료에서 가장 빈번하게 나타나는 점수
- 중앙값 : 점수들을 그 크기순으로 정렬했을 때 가운데에 오는 점수

---

- 평균이 0, 표준편차가 1인 값으로 바꾸려면 다음과 같은 변환을 한다.
> $$ z = \frac{X - \bar{X}}{s} | bar{X} : 평균, s : 표준편차 $$

---

- 대립가설(H1) : 이론에서 비롯한 가설 또는 예측은 흔히 어떤 효과가 존재할 것임을 진술
- 귀무가설(H0) : 대립가설의 역
