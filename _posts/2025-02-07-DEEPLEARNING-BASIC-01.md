---
layout : markdown
title : DEEPLEARNING BASIC
tags : [DL]
toc : true
---

# 딥러닝

## 딥러닝의 발전 5단계

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

## 딥러닝의 구성 요소

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

## 성능 고도화 방법

### 과적합, 과소적합

- 과적합과 과소적합이 아닌 적합한 상태를 'Robust'하다 라고 표현한다.
- Bias 와 Variance 는 반비례 관계 -> 모델은 두 가지를 동시에 최소화하는 방향으로 Trade-off를 고려해야 한다.

### 지역 최소값, 전역 최소값

- 지역 최소값에 빠지지 않도록 조심해야 한다.

### 네트워크 안정화 기법

#### Dropout

- 모델 학습 시 임의의 가중치 노드를 일정 확률로 비활성화시키는 방법 [ 앙상블 방법 ]

#### 정규화

##### 배치 정규화

- Batch 단위의 데이터를 기준으로 평균과 분산을 계산하여 활성화 레이어 이후 출력을 정규화하는 방법[활성화 함수를 적용하기 전에 적용하는 것을 추천]
- $$ z = \frac{x - \mu}{\sigma} $$

##### 레이어 정규화

- 배치 정규화의 단점을 보완하는 방법
- 배치 정규화는 입력 데이터의 단위가 일정해야 사용가능 -> 이 점 보완

##### 인스턴스 정규화

- 이미지 변환 시 사용하는 정규화

##### 그룹 정규화

- 인스턴스 정규화의 확장 버전

### 가중치 초기화

- 왜 가중치 초기화가 필요한가?
> 가중치 초기화를 진행하지 않으면 모델의 층이 깊어질수록 활성화 함수 이후 데이터의 분포가 한 쪽으로 쏠릴 수 있다.  
>> Xavier 초기화 방법 : Sigmoid나 tanh 같은 선형 활성화 함수 또는 근사를 사용할 때 효과적이다.  
>> He 초기화 방법 : Xavier는 ReLU 활성화 함수에서는 여전히 문제점을 해결하지 못함으로 He 초기화 방법 사용  

### 과적합 방지를 위한 규제화 및 학습률 조정

#### 가중치 감쇠 : 큰 가중치에 대한 패널티를 부과

#### 학습 조기종료

#### 학습 스케줄러

1. Constant : 초기에 설정한 학습률을 학습 과정 전체에 걸쳐 변경하지 않음
2. Step Decay : 일정한 주기 마다 학습률을 일정 비율로 감소
3. Exponential Decay : 학습률을 지수적으로 감소
4. Cosine Anneealing : 코사인 함수를 따라 학습률이 감소하도록 설정
> 학습률이 안정적인 감소를 보이게 하며, 일정 주기로 다시 재시작할 수 있음
5. One-cycle Policy : 학습률이 먼저 증가한 다음 감소하도록 설정
> 빠르게 수렴하고, 끝부분에서는 학습률을 감소시켜 안정적인 학습을 도움

### 옵티마이저

1. Momentum
> $$ v \leftarrow \alpha{v} - \eta{\frac{\partial{L}}{\partial{W}}} | v : 속도, \alpha : 일반적으로 0.9, \eta : 학습률 $$  
> $$ W \leftarrow W + v $$
2. Nesterov Accelerated Gradient(NAG)
> $$ v \leftarrow \alpha{v} - \eta{\frac{\partial{L}}{\partial{W}}}(W + \alpha{v}) $$  
> $$ W \leftarrow W + v $$  
> 다음 위치에서의 기울기를 미리 계산하여 보다 더욱 정확하게 업데이트를 가능하게 한다.
3. AdaGrad
> $$ h \leftarrow h + \frac{\partial{L}}{\partial{W}} \bigodot \frac{\partial{L}}{\partial{W}} $$  
> $$ W \leftarrow W - \eta{\frac{1}{\sqrt{h}}\frac{\partial{L}}{\partial{W}}} $$
4. RMSProp
> $$ h \leftarrow \beta{h} + (1 - \beta)(\frac{\partial{h}}{\partial{W}} \bigodot \frac{\partial{L}}{\partial{W}}) $$  
> $$ W \leftarrow W - \eta{\frac{1}{\sqrt{h+\varepsilon}} \bigodot \frac{\partial{L}}{\partial{W}}} $$
5. Ada
> Momentum and RMSProp 의 장점을 모두 결합한 방법  
> $$ m \leftarrow \beta_{1}{m} + (1 - \beta_{1})\frac{\partial{L}}{\partial{W}}$$  
> $$ v \leftarrow \beta_{2}{v} + (1 - \beta_{2})(\frac{\partial{L}}{\partial{W}})^2$$  
> $$ W \leftarrow W - \eta{\frac{m}{\sqrt{v} + \varepsilon}} $$

### 데이터 증강 기법

- 이미지
1. Cutout : 일부 영역 가리기
2. Mixup : 두 이미지의 픽셀 값을 선형적으로 조합
3. CutMix : 하나의 이미지에서 잘라낸 영역을 다른 이미지에 붙여넣는 방식

- 텍스트
1. 동의어 대체(Synonym Replacement)
2. 무작위 삽입(Random Insertion)
3. 무작위 교체(유의하면서 사용)
4. 무작위 삭제(유의하면서 사용)
--> 의미 유지 방법 : 능동태에서 수동태로, 직접화에서 간접화로, 역번역, 사전학습된 언어모델 사용

- 자기지도학습(Self-Supervised Learning) : 레이블이 명시적으로 제공되지 않아도 모델이 스스로 학습할 수 있도록 하는 방식
  - 생성 학습(Generative Laerning)
  - 대체 작업 학습(Proxy Task Learning)
  - 대조 학습(Contrastive Learning)


## CNN

- 입력 데이터의 크기가 주로 고정되어 있음

### Stride

### Padding

### Pooling

- Max Pooling
- Average Pooling

## RNN

- 길이가 고정되어 있지 않은 데이터를 다룰 때 사용
- 시퀀스가 길어질수록 앞부분의 정보를 잊어버림

### LSTM

### GRU

## 딥러닝의 역사

1. LeNet-5 (1998) - 최초의 CNN 구조 중 하나, Yann LeCun이 개발
2. ImageNet Large Scale Visual Recognition Challenge (2010~2017) - 대규모 이미지 분류 대회, 딥러닝 발전 촉진
3. AlexNet (2012) - ImageNet 대회 우승, 딥러닝 붐을 일으킨 CNN
4. VGG (2014) - 깊은 CNN 구조(VGG-16, VGG-19)로 이미지 분류 성능 향상
5. GoogLeNet (2014) - Inception 모듈 도입으로 연산 효율성 증가
6. Generative Adversarial Networks (2014) - Ian Goodfellow가 제안한 생성 모델 (GAN)
7. ResNet (2015) - 잔차 연결(Residual Connection) 도입, 매우 깊은 네트워크 학습 가능
8. Sequence-to-Sequence (2014) - 기계 번역 등 NLP 작업에 활용된 RNN 기반 모델
9. Transformer (2017) - "Attention is All You Need" 논문에서 제안, NLP 혁신
10. Bidirectional Encoder Representations from Transformers (BERT, 2018) - 사전 학습된 양방향 Transformer 기반 모델
11. Generative Pre-trained Transformer (GPT, 2018~현재) - OpenAI의 GPT 시리즈, 언어 모델 발전 주도
12. EfficientNet (2019) - 모델 크기 조정(scale) 최적화 CNN
13. Vision Transformer (ViT, 2020) - Transformer를 이미지 처리에 적용
14. ChatGPT (2022) - GPT 시리즈 기반 대화형 AI
