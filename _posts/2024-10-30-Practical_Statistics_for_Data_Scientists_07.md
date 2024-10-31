---
layout : markdown
title : 데이터 과학을 위한 통계 - 비지도 학습
tags : [Practical_Statistics_for_Data_Scientists, Python, Book]
toc : true
---
{% include markdown.html %}

> 비지도 학습 : 레이블이 달린 데이터를 이용해 모델을 학습하는 과정 없이 데이터로부터 의미를 이끌어내는 통계적 기법

# 주성분분석

> 주성분분석(PCA, principal components analysis) : 수치형 변수가 어떤 식으로 공변하는지 알아내는 기법

- 주성분 : 예측변수들의 선형결합
- 부하(loading) : 예측변수들을 성분으로 변형할 때 사용되는 가중치
- 스크리그래프(screeplot) : 성분들의 변동을 표시한 그림, 설명된 분산 혹은 설명된 분산의 비율을 이용하여 성분들의 상대적인 중요도를 보여줌

{% include plotly/screeplot.html %}

> explained_variance_ratio_ : 각 주성분이 데이터의 분산을 얼마나 잘 설명하는지 나타냄

# K-평균 클러스터링

- cluster(군집) : 서로 유사한 레코드들의 집합
- k : 클러스터의 개수

> elbow method : 언제 클러스터 세트가 데이터의 분산의 '대부분'을 설명하는지를 알려주는 기법

```python
# Elbow Method를 위한 SSD 값 저장용 리스트
ssd = []

# 여러 K 값에 대해 K-Means 모델을 학습시키고 SSD 값 계산
K_range = range(1, 11)
for k in K_range:
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(X)
    ssd.append(kmeans.inertia_)  # inertia_는 클러스터 내 분산의 합(SSE 또는 SSD)
```

{% include plotly/elbow.html %}

> 최적의 k 값은 3  
> Sum of Squared Distances(SSD) : 클러스터링에서 각 데이터 포인트와 해당 클러스터의 중심 간 거리의 제곱 합을 의미  
> SSD 값이 급격히 감소하는 지점을 찾아 그 지점을 최적의 K 값으로 선택

# 계층적 클러스터링

> hierarchical clustering : k-평균 대신 사용하는 클러스터링 방법으로 k-평균과는 다른 결과를 보여준다.  
> 특이점이나 비정상적인 그룹이나 레코드를 발견하는 데 더 민감하다.  
> 직관적인 시각화가 가능

- dendrogram : 레코드들, 그리고 레코드들이 속한 계층적 클러스터를 시작적으로 표현
- distance : 한 레코드가 다른 레코드들과 얼마나 가까운지를 보여주는 측정 지표
- 비유사도(dissimilarity) : 한 클러스터가 다른 클러스터들과 얼마나 가까운지를 보여주는 측정 지표

![hierarchical](/assets/images/data_scientists/Hierarchical.png){: style="width: 50%;"}

> 거리 : 높으면 다른 클러스터와 멀리 떨어져 있다고 판단(EX] 8번 샘플)  
> 클러스터 그룹 : Distance=0.6 정도에서 덴드로그램을 잘랐을 때 클러스터를 3개로 나눌 수 있다.  
> 1번 그룹 : 8  
> 2번 그룹 : 5, 2, 6  
> 3번 그룹 : 9, 1, 3, 10, 4, 7

{% include plotly/dissimilarity_matrix.html%}

> 비유사도 행렬  
> 서로 유사한 경우 0에 가까운 값이 나옴[큰 값을 가질수록 차이가 크다]

# 모델 기반 클러스터링

> 이 기법은 통계 이론에 기초하고 있으며 클러스터의 성질과 수를 결정하는 더 엄격한 방법을 제공

- 다변량정규분포
- 정규혼합
- 클러스터 개수 결정하기 [ BIC ]

```python
# BIC를 저장할 리스트
bic_values = []
n_components_range = range(1, 11)  # 클러스터 개수 1에서 10까지

for n_components in n_components_range:
    gmm = GaussianMixture(n_components=n_components)
    gmm.fit(X)
    bic_values.append(gmm.bic(X))
```

{% include plotly/BIC.html%}

# 스케일링과 범주형 변수

- 스케일링
- 정규화 : 원래 변수 값에서 평균을 뺀 후에 표준편차로 나누는 방법
- 고위거리(Gower's distance) : 수치형과 범주형 데이터가 섞여 있는 경우에 모든 변수가 0~1 사이로 오도록 하는 스케일링 방법
