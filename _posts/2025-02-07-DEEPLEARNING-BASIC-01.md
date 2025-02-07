---
layout : markdown
title : DEEPLEARNING BASIC
tags : [DL]
toc : true
---

# 딥러닝

## 이론

### 딥러닝의 발전 5단계

1. Rule based programming
- 목표 달성에 필요한 연산 방법을 사람이 전부 고안하는 방법
2. Conventional machine learning
- 특징값을 뽑는 방식은 기존처럼 하되, 특징값들로 판별하는 로직은 기계가 스스로 고안
- 동작 방법  
  -1. 학습 데이터 준비 [ 이미지 수집 -> 특징 정의 -> 학습 데이터 생성 ]  
  -2. 모델 학습 [ 예측 및 오차 계산 ]
3. Deep Learning
- 출력을 계산 하기 위해 모든 연산들을 기계가 고안
4. Pre-training & Fine-tuning
- 기존 문제점[분류 대상 or 태스크가 바뀔 때마다 다른 모델이 필요]
- 이를 해결하기 위해 Pre-training 으로 미리 대량의 데이터를 학습 후 Fine-tuning으로 특정한 Task에 맞게 추가 학습
5. Big Model & zero/few shot
- Multimodal 학습 가능 [ 텍스트, 이미지, 음성, 영상 등 다양한 입력을 동시에 학습하는 방법 ]
- Zero-shot Learning : 한 번도 본 적 없는 Task나 데이터에 대해 학습 없이 정답을 예측하는 방법
- Few-shot Learning : 적은 양의 예제 데이터를 제공한 후 학습하는 방법

### 딥러닝의 구성 요소

1. DATA
2. MODEL
- Activation Function : 입력 신호의 총합을 출력신호로 변환하는 함수 [ Ex. Sigmoid, tanh, ReLU, Leaky ReLU, Maxout, ELU ]
- 경사하강법  
  -1. 확률적 경사하강법 : 모든 데이터를 사용해서 갱신하는 것 대신, 데이터 일부만을 사용해서 여러 번 갱신하는 방법
- 역전파 [ 밑바닥부터 시작하는 딥러닝1 참고 ]
3. Loss Function : 실제 값과 예측 값 사이의 차이, 오차를 수치화하는 함수
- Mean Squared Error[= L2 Loss] : 실제 값과 모델의 예측 값 사이의 차이를 제곱하여 평균낸 값[보통 회귀문제에서 사용] 
  - 단점 : 이상치에 민감
- Mean Absolute Error[= L1 Loss] : 실제 값과 모델의 예측 값 사이의 차이에 대한 절대값을 평균낸 값  
  - 단점 : 기울기가 일정하여 점핑이 일어날 수 있음 [ 지역 최소점에 도달하지 못 하는 문제]
- Huber Loss : 오차가 일정 수준 이하일 때는 MSE, 그렇지 않을 때는 MAE를 사용하여 두 손실 함수의 장점을 결합한 방법
- Cross Entropy : 주어진 확률 변수 또는 사건 집합에 대한 두 확률 분포 간의 차이를 측정하는 함수[보통 분류문제에서 사용]  
  - 일반적인 경우 | $$CE = -\sum{Q(x)*log(P(X))}$$
  - 이진분류 | $$BCE = -\sum{ylog(p) + (1-y)log(1-p)}$$
- Hinge Loss : 모델이 만드는 decision boundary 와 데이터 사이의 margin 을 최대화하는 것을 목표로 하는 함수  
  - $$Hinge = max(0, 1-y * \hat{y})$$
4. Optimization Algorithm : Loss Function 이 최소값을 가지도록 모델의 파라미터를 최적화하는 알고리즘
5. 성능 향상을 위한 기타 알고리즘
