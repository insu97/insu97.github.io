---
layout : markdown
title : 데이터 과학을 위한 통계 - 탐색적 데이터 분석
tags : [Practical_Statistics_for_Data_Scientists, Python, Book]
toc : true
---
{% include markdown.html %}

# 탐색적 데이터 분석

> Exploratory Data Analysis ( EDA )

# 정형화된 데이터의 요소

> 수치형(연속, 이산)과 범주형(이진, 순서) 존재

# 테이블 데이터

> DataFrame, Feature, Outcome(종속변수), record(DataFrame 에서 한 행을 의미)

# 위치 추정

> 평균, 가중평균, 중간값, 백분위수, 가중 중간값, 절사평균(정해진 개수의 극단값을 제외한 나머지 값들의 평균)  
> 로버스트하다(극단값들에 민감하지 않다는 것을 의미), 특잇값

# 변이 추정

> 편차(EX. 오차, 잔차), 분산(평균과의 편차를 제곱한 값들의 합을 n-1로 나눈 값)   
> 표준편차, 평균절대편차(평균과의 편차의 절대값의 평균), 중간값의 중위절대편차(중간값과의 편차의 절댓값의 중간값)  
> 범위(데이터의 최댓값과 최솟값의 차이), 순서통계량, 백분위수, 사분위범위(IQR, 75번째 백분위수와 25번째 백분위수 사이의 차이)

# 데이터 분포 탐색하기

> 상자그림(boxplot), 도수분포표, 히스토그램, 밀도 그램(히스토그램을 부드러운 곡선으로 나타낸 그램)

# 이진 데이터와 범주 데이터 탐색하기

> 최빈값(mode), 기댓값, 막대도표, 파이그림(pie chart)

# 상관관계

> 상관행렬, 산점도  
> 상관계수 : $$r = \frac{\sum (x_{i} - \bar{x})(y_{i}-\bar{y})}{(n-1)s_{x}s_{y}} $$

# 두 개 이상의 변수 탐색하기

> 분할표()두 가지 이상의 범주형 변수의 빈도수를 기록한 표), 육각형 구간, 등고 도표, 바이올린 도표