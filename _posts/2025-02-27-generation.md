---
layout : markdown
title : Generation
tags : [DL, COMPUTER_VISION]
toc : true
---

{% include markdown.html %}

# 생성 모델(Generative models)

- 데이터는 저차원의 필수적인 정보로부터 생성 가능하다는 가정하에 분포를 학습, 새로운 데이터를 생성
- 데이터 X와 특성 Y의 결합(joint) 분포 p(X, Y) or Y가 주어질 때 X의 조건부(conditional) 분포 p(X\|Y)를 추정하는 모델
- 주어진 Y가 없는 경우, 데이터의 주변(marginal) 분포 p(X)를 추정하는 모델
- Ex. 가우시안 혼합 모델(Gaussian Mixture Model, GMM)

## 어려움

1. 고차원 데이터를 모델링 - 복잡한 모든 특성의 분포를 알아야 함
> 데이터는 저차원의 정보로 표현할 수 있다는 가정을 활용함
2. 평가 지표
> 판별 모델과 달리 생성된 데이터에 대한 정량적 평가가 어려움

## 활용

1. 이미지의 품질 개선
2. 맥락에 맞게 이미지 빈 공간 자동 완성

## 최대 가능도 추정법(Maximum Likelihood Estimation, MLE)

> 가능도를 최대화하는 파라미터 값을 찾는 방법  
> 일반적으로 가능도 함수의 미분을 통해 계산

### Kullback-Leibler Divergence

> 쿨백-라이블러 발산 최소화 = 로그가능도 최대화

# 판별 모델(Discriminative Model)

- 데이터 X가 주어졌을 때, 특성 Y가 나타날 조건부 확률 p(Y\|X)를 직접적으로 반환하는 모델
- 주어진 데이터를 통해 데이터 사이의 경계를 예측
- Ex. 로지스틱 회귀 분석
