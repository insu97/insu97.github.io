---
layout : markdown
title : Machine Learning At Work - 12
tags : [Machine_Learning_At_Work, Book]
toc : true
---
{% include markdown.html %}

# 온라인 광고에서의 머신러닝

> 온라인 광고 송출 시스템은 광고 요청을 받은 시점에서 실시간 추론을 하고 결과를 이용해 즉작적으로 최적의 행동을 해야 한다.  

## 온라인 광고 비즈니스

### 광고 영역 거래

- 광고 송출 사업자(DSP, demand side platform) : 광고주를 위한 서비스
> 광고를 내보낼 수 있는 기회가 있을 때마다 광고 영역을 얼마에 판매하고 어떤 광고를 표시할지 결정해야 한다.


- 광고 영역 매매 거래 -> 광고 거래소를 통한 경매
- 방법 : 1위 가격 경매, 봉인 입찰 1위 가격 경매

### DSP의 행동 정책

- 한정된 예산으로 최대 광고 효과를 얻을 수 있도록 하는 방법
1. 광고를 표시할 때 오디언스의 응답 예측
2. 광고 영역의 시장가격 예측
3. 예산 안에서의 입찰 금액 최적화

### 1위 가격 경매의 특징

> 다른 입찰자가 제시한 최고 입찰 가격에 따라 최저 입찰 가격이 결정된다.  
> 잉여 : 경매로 얻은 물품의 가치와 지불 금액의 차이  
> 최적 입찰 가격 : 잉여를 최대로 하는 가격  

## 문제 정식화

### 시장가격과 승률

- 최고 입찰금액 : z
- 입찰 금액 : b
- 입찰 금액 b을 경정했을 때의 승률 : w(b)
- 승률 함수 : w(x, b)

### 효용(utility)

> 광고주가 얻는 잉여를 경제학 용어인 효용이라고 바꾸어 부른다.

- 오디언스의 응답값(이진값이라고 가정) : $$ y \in \{0, 1\} $$
- 오디언스에서 얻은 긍정적인 응답을 금액으로 환산한 값 : v
- $$ 효용 = \left\{\begin{matrix}
vy - b ( 경매에 승리했을 때 ) \\ 0 (기타)
\end{matrix}\right.$$
- $$ 기대 효용 = \sum_{i=1}^{N}[vf(x_i)-b_i]w(x_i, b_i) $$

## 예측의 역할 및 구현

### 오디언스의 응답 예측

> 광고 클릭률 예측(CTR, click through rate prediction) and 전환율 예측(CVR, conversion rate prediction)이 있다.  
> MODEL : 로지스틱 회귀, GBDT, Factorization Machine

- 기대가치
1. 가치 있는 광고 영역과 오디언스를 높게 평가할 수 있다.
2. 가치 없는 광고 영역을 낮게 평가할 수 있다.

### 승률(시장가격) 예측

- 기대가치
1. 불필요하게 높은 입찰을 억제할 수 있다.
2. 승률을 통제할 수 있다.

## 광고 송출 로그의 특징

1. 피드백 루프
2. 불균형 데이터
> 배너 광고가 클릭되는 경우는 실제로 매우 적다 -> 네거티브 다운 샘플링 사용  
> 네거티브 다운 샘플링 장점 : 전처리와 훈련 계산 비용의 감소
3. 카디널리티(표현하는 값의 패턴)가 큰 범주형 변수
> 원-핫 인코딩 상태에서 L1 정규화를 사용해 특징량을 선택하는 방법  
> 최근에는 인테테 임베딩 사용
4. 잘린 데이터
> EX. 신용카드 광고라면 신용카드 신청 후 심사가 완료되는 지점이 전환 시점이 된다 -> 전환 알림이 오기까지 시간이 걸림 -> 잘린 데이터 생성  
> 잘려진 데이터를 분석할 때는 관측 지연 시간 분포에서 경향 점수를 구한 후 레코드별로 샘플 가중치를 보정해야 한다.

## 머신러닝 예측 모델 운영

### 예측 실패 시 처리
> 복원할 수 있는 일이라면 간단한 제어 기능과 조합해 해결할 수 있다.  
> 리스크에 맞춰 stopper를 적용해 장애를 줄일 수 있다.