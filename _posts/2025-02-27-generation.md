---
layout: markdown
title: 생성 모델과 판별 모델
tags: [DL, COMPUTER_VISION]
toc: true
---

{% include markdown.html %}

# 생성 모델과 판별 모델

## 생성 모델 (Generative Models)

생성 모델은 데이터 X와 특성 Y의 결합 분포 p(X, Y) 또는 조건부 분포 p(X\|Y)를 추정합니다. Y가 없는 경우, 데이터의 주변 분포 p(X)를 추정합니다.

**가정:** 데이터는 저차원의 필수적인 정보로부터 생성 가능하다고 가정합니다.

**예시:** 가우시안 혼합 모델 (Gaussian Mixture Model, GMM)

### 특징

1. **어려움:**
   - 고차원 데이터 모델링: 복잡한 모든 특성의 분포를 알아야 함
   - 평가 지표: 생성된 데이터에 대한 정량적 평가가 어려움

2. **활용:**
   - 이미지 품질 개선
   - 맥락에 맞는 이미지 자동 완성

### 최대 가능도 추정법 (Maximum Likelihood Estimation, MLE)

가능도를 최대화하는 파라미터 값을 찾는 방법입니다. 일반적으로 가능도 함수의 미분을 통해 계산합니다.

> **Kullback-Leibler Divergence:** 쿨백-라이블러 발산 최소화 = 로그가능도 최대화

### 평가 지표

1. Inception Score(IS)
  - 예리함과 다양성 두 가지를 주요하게 고려
  - IS = Sharpness(S) * Diversity(D)
  - 한계점
     1. 분류기 모델의 훈련 데이터 셋과 다른 데이터를 생성하는 경우 제대로 평가하기 어려움
     2. IS가 높은 데이터를 생성하면 계속 같은 데이터를 생성(Mode Collapse)
     3. 기울기 기반(Gradient Based) 공격, 리플레이(Replay) 공격을 통해 점수 조작 가능
2. Frechet Inception Distance(FID)
   - 생성된 데이터의 특징 벡터를 이용하여 훈련 데이터와의 거리를 계산
   - 훈련 데이터와 생성 데이터를 모두 활용
   - 훈련 데이터와 생성 데이터의 각 분포를 정규 분포로 가정하고, 두 분포의 거리를 Frechet 거리로 계산
   - 한계점
     1. FID 점수는 Fidelity와 Diversity를 각각 평가할 수 없음
3. 개선된 정밀도, 재현율(Improved Precision & Recall)
   - Precision : 생성된 데이터 중에서, 실제 데이터 분포에 아주 가까운 데이터 = (TP) / (TP + FP)
   - Recall : 실제 데이터 중에서, 생성된 데이터 분포에 아주 가까운 데이터 = (TP) / (TP + FN)
   - 한계점
     1. 이상치에 민감
     2. 실제 데이터와 생성된 데이터의 분포가 동일하더라도 샘플링에 따라 점수가 낮을 수 있음
   - 문제 완화
     1. Density : 반경의 합집합이 아닌 가중 합집합으로 계산하여 이상치에 대해 상대적으로 덜 민감
     2. Coverage : 생성된 데이터에 대해 매번 계산하지 않고 실제 데이터 집합으로 미리 계산하여 안정적이고 계산량 감소
4. 조건부 정확도(Conditional Accuracy)
5. Learned Perceptual Image Patch Similarity(LPIPS)
   - 모델 특징 비교를 통한 영상간 유사도 측정
6. CLIP-Score
   - Text와 Image 간의 유사도 측정

## 판별 모델 (Discriminative Model)

```
판별 모델은 데이터 X가 주어졌을 때, 특성 Y가 나타날 조건부 확률 p(Y\|X)를 직접적으로 반환합니다.  
판별 모델은 정답(Ground Truth, GT)가 존재하므로 모델의 출력을 정답과 비교하기 용이  
분류, 회귀 문제로 나눌 수 있음
```
**특징:** 주어진 데이터를 통해 데이터 사이의 경계를 예측합니다.

**예시:** 로지스틱 회귀 분석

## 생성 모델 vs 판별 모델

| 특성 | 생성 모델 | 판별 모델 |
|------|-----------|-----------|
| 추정 | p(X, Y) 또는 p(X\|Y) | p(Y\|X) |
| 접근 방식 | 데이터 생성 과정 모델링 | 클래스 간 경계 학습 |
| 복잡도 | 상대적으로 높음 | 상대적으로 낮음 |
| 데이터 요구량 | 더 많은 데이터 필요 | 적은 데이터로도 가능 |
| 유연성 | 새로운 클래스 추가 용이 | 새로운 클래스 추가 어려움 |

# 오토 인코더

입력 데이터의 패턴을 학습하여 데이터를 재건하는 모델 -> 비선형 차원 축소 기법으로 활용 가능

- **인코더** : 데이터를 저차원 잠재 표현으로 요약
- **디코더** : 저차원 잠재 표현으로부터 데이터를 재구성(Reconstruction)

## 손실함수

잠재 표현으로부터 복구한 데이터와 입력 데이터의 평균제곱오차(MSE)

## 디노이징(Denoising) 오토 인코더

```
입력 데이터에 랜덤 노이즈를 주입하거나 Dropout 레이어를 적용  
노이즈가 없는 원래 데이터로 재구성
```

- 원리 : 노이즈에 강건한 잠재 표현(미세하게 변형된 데이터도 같은 잠재 벡터로 표현되도록)


## 활용

1. 특징 추출기
   - 잠재 벡터로부터 분류, 클러스터링 문제 해결
2. 이상치 탐지(Anomaly Detection)
   - 이상치는 재구성 했을 때 평균제곱오차가 크게 나올 것!
   - 특정 임계값을 넘으면 이상치로 판단

# 변분 오토 인코더(Variation Autoencoder, VAE)

오토 인코더와 동일한 구조(Encoder + Decoder)를 가지는 생성 모델  
잠재 변수 모델 : 데이터는 저차원의 잠재 변수로부터 생성됨

- 잠재 벡터의 분포 : 표준정규분포
- 장점
   1. q(z\|x)로부터 데이터를 요약하는 유용한 잠재 표현을 찾을 수 있음
- 단점
   1. 가능도가 아닌 가능도의 하한을 최대화
   2. 흐릿한 이미지를 생성

## Evidence of Lower BOund(ELBO)

현재 모델이 우리가 가진 현상을 얼마나 잘 설명하는가 = 가능도(Likelihood)  
직접 계산이 어려우니, 간점적으로 계산하여 최대화함

# VQVAE(Vector Quantized Variational Autoencoder)

유한한 잠재 표현을 활용하는 변분 오토 인코더

- 이산(Discrete) 잠재 변수
   - 범주 : K개의 D차원 임베딩(Embedding) 벡터

# 적대적 생성 신경망 (Generative Adverarial Networks, GANs)

적대적으로 학습하는 신경망들로 구성되며, 생성 모댈로써 활용함

- 생성된 데이터와 실제 데이터를 판별하고 속이는 과정을 거치며 생성 모델을 개선
- 데이터를 생성하는 생성 모델과 데이터의 진위를 구별하는 판별 모델(Discriminator)로 구성
   > 판별 모델 : 생성된 데이터를 입력으로 받아 실제 데이터인지 생성된 데이터인지를 출력
- 훈련 과정
   1. 임의의 초기 분포로부터 생성 모델이 데이터를 생성
   2. 판별 모델이 분류; 판별 모델 갱신
   3. 갱신된 판별 모델을 고정;생성 모델 갱신
   4. 반복 과정을 거쳐 생성 모델은 판별 모델이 구별할 수 없는 수준의 데이터를 생성
- 목적 함수
   1. 생성 모델 : 실제와 유사한 데이터를 생성하여 판별자를 속여야 함(다음 목적 함수를 최소화함)
   2. 판별 모델 : 실제와 생성된 데이터를 정확하게 구별해야 함(다음 목적 함수를 최대화함)

# 조건부 생성 모델

- 필요성 : 다양한 활용을 위해 생성 데이터의 의미 제어 방법이 필요함

```
- 조건을 입력 받아 원하는 의미를 갖는 데이터를 생성하는 생성 모델
- 범주(카테고리)부터 영상의 전체 구조(레이아웃)에 이르기까지 다양한 입력을 조건으로 받음
- 높은 다양성과 품질을 동시에 누릴 수 있으나 수집하기 더 까다로운 데이터를 필요로함
```

### 이미지 대 이미지 (Image-to-Image Translation)

1. **Pix2pix**  
   - 조건부 GAN (cGAN)을 기반으로 한 모델  
   - 입력 이미지를 다른 스타일이나 도메인으로 변환  
   - 지도 학습 방식으로 특정 입력-출력 쌍을 필요로 함  
   - 예: 스케치를 컬러 이미지로 변환  

2. **CycleGAN**  
   - 지도 학습 없이 이미지 스타일 변환을 수행  
   - 두 개의 생성자와 판별자를 사용하여 도메인 간 변환을 학습  
   - 예: 말 ↔ 얼룩말, 여름 ↔ 겨울  

3. **BiCycleGAN**  
   - Pix2pix 모델의 확장  
   - 하나의 입력에 대해 다양한 출력을 생성할 수 있도록 개선  
   - 잠재 공간에서 샘플링을 통해 다중 모드 출력 가능  

4. **StarGAN**  
   - 하나의 모델로 여러 개의 도메인 변환을 가능하게 함  
   - 도메인 간 이미지 변환을 하나의 네트워크에서 수행  
   - 예: 얼굴 사진에서 성별, 나이, 감정 변화 적용  

5. **InstaGAN**  
   - 개별 객체 단위의 변환이 가능한 모델  
   - 배경과 객체를 분리하여 변환 적용  
   - 예: 개별적인 얼굴 스타일 변경  

6. **LostGAN**  
   - 객체 수준의 이미지 변환 및 생성에 특화  
   - 레이아웃 정보를 사용하여 장면을 구성  
   - 예: 주어진 레이아웃에 따른 장면 이미지 생성  

7. **SPADE (Spatially-Adaptive Denormalization)**  
   - 레이아웃 정보를 반영한 고품질 이미지 생성  
   - 세그먼트 맵을 활용하여 이미지 스타일 변환  
   - 예: 스케치를 사실적인 장면으로 변환  

---

### 텍스트 대 이미지 (Text-to-Image Generation)

1. **GAN-CLS (GAN with Conditional Latent Space)**  
   - 텍스트 설명을 조건으로 하는 이미지 생성 모델  
   - 텍스트 임베딩을 GAN에 입력하여 관련된 이미지 생성  
   - 예: "붉은 꽃이 핀 초록색 들판" → 해당 이미지 생성  

2. **GigaGAN**  
   - 초고해상도(High-Resolution) 텍스트 기반 이미지 생성 모델  
   - 기존 GAN 기반 텍스트-이미지 모델보다 더 높은 품질과 해상도 제공  
   - 예: 텍스트 입력만으로 사실적인 고해상도 이미지 생성  

# 확산 모델

## 확산 확률 모델(Diffusion Probabilistic Model, DPM)

- DPM - 확률
   1. 확산 현상을 시간에 따라 확률적 모델링
   2. 마르코프 체인 : 미래는 과거가 아닌 현재에만 의존

- DPM 구조
   1. 정방향 확산 : 데이터 -> 노이즈 ( 고정 )
   2. 역방향 확산 : 데이터 <- 노이즈 ( 학습 )
     - 이미지 생성 과정 = 노이즈를 제거하는 과정은 계산 불가

- VAE 와 다른 점
   1. 잠재 변수의 차원이 모두 데이터의 차원과 동일 + 여러 단계의 잠재 변수를 가짐
   2. 디코더를 모든 시점에서 공유 + 인코더는 학습되지 않음

## 디노이징 확산 확률 모델(DDPM)

손실 함수를 간단한 형태로 정리함

- 구조
   1. 노이즈 예측 : U-net 구조
   2. t 시점 주입 : 사인 곡선적 포지션 임베딩(Sinusoidal Position Embedding)

- 생성 과정
   1. 노이즈 $$ X_T $$를 표준정규분포에서 샘플링
     - t가 클 때 : 핵심적인 특징을 담고 있음
     - t가 작을 때 : 세부적인 특징을 담고 있음

- 한계점
   1. 느린 생성 과정 : 5만개의 32x32 크기 이미지 생성 위해 20시간 필요
   2. 조건부 생성 불가
       - DDPM은 Unconditional 모델 ( 조건 없는 모델 )
       - 품질 - 다양성 조절 불가

## 생성 과정 가속화

### DDIM(Denoising Diffusion Implicit Model)

마르코프 체인 : 미래는 과거가 아닌 현재에만 의존함

- 샘플링 과정에서 마르코프 체인이 등장함
   > 잡음이 조금 덜 낀 샘플을 더 심한 샘플과 모델이 이를 통해 구한 노이즈로 추정

- DDPM 에서 DDIM으로
   1. 마르코프 체인을 가정하지 않는 확산 확률 모델을 정의 -> 직전 시점에만 의존하지는 않음
   2. 학습된 모델을 가지고 일부 시점만 거쳐 데이터 생성 가능 -> 생성 속도 개선
   3. 학습은 DDPM처럼 그러나 빠른 sampling을 원함(DDPM이 활용하는 중요 특성을 만족해야함)

- 생성과정
   1. 특성을 만족하는 정방향 함수를 정의함
   2. 생성 시 노이즈를 추가하지 않는 방법 제안
   3. 랜덤성은 오직 표준정규분포를 따르는 노이즈 $$ X_T $$ 에만 존재

### Denoising Diffusion GANS

적은 시점( T <= 8 )을 사용하기 위해 조건부 GAN을 활용하여 복잡한 디노이징 분포를 학습

### Progressive Distillation

학습된 확산 확률 모델로부터 시점을 절반으로 줄이는 경량화된 모델을 반복적으로 학습  
이웃한 2개의 역방향 확산 과정을 하나로 합침

### Consistency Model and Distillation

학습 시 모든 Time Step에 대해 동일한 결과를 내도록 학습을 진행함

### Latent Consistency Model

1 step to 8 step

## 조건부 생성

- 조건부 DPM
   1. 정방향 확산은 고정
   2. 역방향 확산(생성 과정)에서 조건 추가

### Guided Diffusion

스케일을 조절하면 클래스를 유지하도록 생성 가능

- 단점 : 분류기를 추가 학습해야 함

### Classifier-free Diffusion Guidance

분류기를 베이즈 정리를 활용하여 대체함  
확산 확률 모델과 조건부 확산 확률 모델을 함께 학습함(학습할 때 랜덤하게 클래스를 버림)  
생성할 때 두 모델에서 예측한 노이즈의 가중합 계산

## 잠재 확산 모델

### 픽셀 공간에서 잠재 공간으로

1. 기존의 확산 모델들은 고차원 이미지 공간에서 연산을 반복함
2. 이미지의 정보를 유지한 채로, 차원을 축소할 수 있다면 계산 복잡도를 감소시킬 수 있음
3. 영상 생성은 인지적 압축 과정과 의미적 압축으로 대략적 구분이 가능함
   - 인지적 압축 : 과도한 세부 사항을 제거하며 핵심적인 특징을 잠재 표현으로 요약
   - 의미적 압축 : 데이터의 의미적, 구조적 특징을 학습

### 잠재 확산 모델

실제 이미지의 고차원 공간이 아닌 잠재 공간에서 노이즈 연산을 반복하도록 설계

- 확산 모델에서 주요한 연산들이 모두 잠재 공간에서 이루어지므로 훨씬 더 효율적인 공간에서 훈련 가능
   - 기존 확산 모델보다 계산, 시간 자원 모두 효율적

- 사전 훈련 : 벡터 양자화 변분 오토 인코더
   - 재건된 이미지를 가짜 이미지로 두어 실제 이미지와 판별하는 과정 포함

## 조건부 생성

### Text-to-Image

- 잠재 확산 모델은 확산 모델과 마찬가지로 다양한 조건부 생성이 가능(Ex. Text-to-Image, 초고해상도 이미징, 인페이팅)
- 텍스트 입력이 추가되는 경우, 텍스트 인코더를 사전 훈련하는 단계가 필요함
- CLIP은 텍스트와 이미지 간의 대조 학습을 통해 훈련
   - 텍스트-이미지 쌍에 대한 이해가 높은 모델

- 확산 모델과의 차이
   1. 텍스트 정보와 노이즈화된 잠재 표현의 관계성 학습을 위해 Cross-attention을 추가

- Layout-to-Image
- Masked-to-Image

### Latent Diffusion Model(LDM)

- 입력과 출력을 잠재 공간으로 매핑 후 학습해, 높은 품질의 영상을 효율성 높게 학습, 생성함
- 일반 생성 외에도 텍스트, Layout, 가려진 이미지 등 다양한 조건 기반의 생성이 가능함
- 현재 가장 활발히 활용, 연구되는 모델

# 확산 모델의 개인화

우리가 원하는 대상에 관한 사진이 일부 있을 때 피사체에 대한 새로운 이미지를 텍스트로부터 생성하는 방법

## 텍스트 반전

- 학습 데이터 : 우리가 원하는 대상에 관한 이미지 3~5개
- 대상을 표현하는 새로운 단어를 임베딩 공간에서 찾기

## DreamBooth

사전학습된 text-to-image 확산 모델 중 U-net을 미세 조정

- 파인튜닝의 문제점
   1. 언어 드리프트 : 대상과 동일한 클래스의 이미지를 생성하는 방법을 천천히 잊어버림
   2. 다양성 : 포즈와 각도 등이 새로운 학습 이미지에 과적합될 수 있음

## LoRA

기존 가중치는 유지하고 가중치 변화량을 학습함 -> 기존 학습 결과를 잊지 않는 효과  
가중치 변화량을 행렬 2개의 곱으로 분해 -> 학습 파라미터 수가 대폭 감소

## ControlNet

다양한 Structural input을 조건으로 주기 위한 방법  
추가적인 layer를 학습해, U-net은 유지하고 차이를 추가하는 방법

## Face0

사람 얼굴을 조건삼아, 동일한 얼굴의 다양한 결과를 생성하는 기법  
얼굴에서 특징을 추출, 텍스트 표현과 함께 모델에 제공함

## IP-Adapter

Text뿐만 아니라 이미지 feature를 함께 입력받아 그에 맞게 적절히 생성해낼 수 있게 함  
별도의 cross-attention layer를 두어 따로 학습함

## Imagic

텍스트만을 활용한 의미적 편집 수행
