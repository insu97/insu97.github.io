---
layout : markdown
title : 데이터 과학을 위한 통계 - 데이터와 표본분포
tags : [Practical_Statistics_for_Data_Scientists, Python, Book]
toc : true
---
{% include markdown.html %}

# 임의표본추출과 표본편향

- 모집단(어떤 데이터 집합을 구성하는 전체 대상 혹은 전체 집합) -> 표본(sample)(모집단에서 얻은 부분집합)  
- 랜덤표본추출 : 무작위로 표본 추출    

  ```python
  import pandas as pd

  # 예시 데이터프레임 생성
  df = pd.DataFrame({
      'Name': ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'],
      'Grade': ['A', 'B', 'A', 'C', 'B', 'A', 'C', 'B', 'A', 'B'],
      'Score': [85, 72, 90, 65, 78, 88, 62, 75, 92, 70]
  })

  # 랜덤 표본 추출
  drawn_sample = df.sample(n=3)

  # 결과 출력
  print(drawn_sample)
  ```  

| Name | Grade | Score |
| --- | --- | --- |
| Grace | C | 62 |
| Ivy | C | 92 |
| Charlie | C | 90 |

- 층화표본추출 : 모집단을 층으로 나눈 뒤, 각 층에서 무작위로 표본을 추출하는 것  

  ```python
  from sklearn.model_selection import train_test_split

  X = df.drop('Grade', axis=1)  # 특성
  y = df['Grade']  # 목표 변수

  # 70%는 훈련 세트, 30%는 테스트 세트로 층화 분할
  X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, stratify=y)

  print("훈련 세트 크기:", len(X_train))  # 7
  print("테스트 세트 크기:", len(X_test)) # 3
  ```

- 편향(bias) : 계통상의 오류  
- 표본편향 : 모집단을 잘못 대표하는 표본  

# 선택편향

1. 선택편향 : 관측 데이터를 선택하는 방식 때문에 생기는 편향
2. 데이터 스누핑 : 뭔가 흥미로운 것을 찾아 광범위하게 데이터를 살피는 것
3. 방대한 검색 효과 : 중복 데이터 모델링이나 너무 많은 예측변수를 고려하는 모델링에서 비롯되는 편향 혹은 비재현성

-> 해결방법 : 홀드아웃, 목푯값 섞기

# 통계학에서의 표본분포

1. 표본통계량 : 표본 데이터들로부터 얻은 측정 지표
2. 데이터 분포
3. 표본분포 : 표본들의 분포
4. 중심극한정리 : 표본크기가 커질수록 표본분포가 정규분포를 따르는 경향
5. 표준오차(Standard Error) $$ SE =  \frac{s}{sqrt(n)} [ s : 표준편차, n : 표본크기 ] $$

# 부트스트랩

> 부트스트랩 : 표본에서 추가적으로 표본을 복원추출하고 각 표본에 대한 통계량과 모델을 다시 계산하는 것

1. 부트스트랩 표본 : 관측 데이터 집합으로부터 얻은 복원추출 표본
2. 재표본추출(리샘플링) : 관측 데이터로부터 반복해서 표본추출하는 과정, 부트스트랩과 순열(셔플링) 과정을 포함한다.

# 신뢰구간

1. 신뢰수준
2. 구간끝점 : 신뢰구간의 양 끝점  

  ```python
  # 신뢰수준 설정 (예: 95%)
  confidence_level = 0.95

  # 'Score' 열에 대한 신뢰구간 계산
  scores = df['Score']
  n = len(scores)
  mean = np.mean(scores)
  std_err = stats.sem(scores) # 표준오차

  # scipy.stats.t.interval 함수를 사용하여 신뢰구간 계산
  lower_bound, upper_bound = stats.t.interval(confidence_level, df=n-1, loc=mean, scale=std_err)

  print(f"{confidence_level*100}% 신뢰구간:")
  print(f"하한: {lower_bound:.2f}") # 70.08
  print(f"상한: {upper_bound:.2f}") # 85.32
  ```

# 정규분포

1. 오차 : 데이터 포인트와 예측값 혹은 평균 사이의 차이
2. 표준화 : 평균을 빼고 표준편차로 나눈 값
3. z-score : 개별 데이터 포인트를 정규화한 값
4. 표준정규분포 : 평균=0, 표준편차=1 인 정규분포
5. QQ-plot : 표본분포가 특정 분포에 얼마나 가까운지를 보여주는 그림

{% include plotly/qq-plot.html %}

# 긴 꼬리 분포

1. 꼬리 : 적은 수의 극단값이 주로 존재하는, 도수분포의 길고 좁은 부분
2. 왜도(skewness) : 분포의 한쪽 꼬리가 반대쪽 다른 꼬리보다 긴 정도

# 스튜던트 t분포

1. n : 표본의 크기
2. 자유도 : 다른 표본크기, 통계량, 그룹의 수에 따라 t분포를 조절하는 변수

# 이항분포

1. 시행 : 독립된 결과를 가져오는 하나의 사건
2. 성공 : 시험에 대한 관심의 결과
3. 이항식 : 두 가지 결과를 갖는다.
4. 이항시행 : 두 가지 결과를 가져오는 시행
5. 이항분포 : n번 시행에서 성공한 횟수에 대한 분포

# 카이제곱분포

> 카이제곱통계량 : 검정 결과가 독립성에 대한 귀무 기댓값에서 벗어난 정도를 측정하는 통계량  
> 카이제곱분포 : 귀무 모델에서 반복적으로 재표본추출한 통계량 분포이다.

# F분포

> F 통계량의 분포 : 모든 그룹의 평균이 동일한 경우 무작위 순열 데이터에 의해 생성되는 모든 값의 빈도 분포

# 푸아송 분포와 그 외 관련 분포들

1. 람다 : 단위 시간이나 단위 면적당 사건이 발생하는 비율
2. 푸아송 분포 : 표집된 단위 시간 혹은 단위 공간에서 발생한 사건의 도수분포
3. 지수분포 : 한 사건에서 그 다음 사건까지의 시간이나 거리에 대한 도수분포
4. 베이불 분포 : 사건 발생률이 시간에 따라 변화하는, 지수분포의 일반화된 버전
