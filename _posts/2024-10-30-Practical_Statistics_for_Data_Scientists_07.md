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

# K-평균 클러스터링

- cluster(군집) : 서로 유사한 레코드들의 집합
- k : 클러스터의 개수

> elbow method : 언제 클러스터 세트가 데이터의 분산의 '대부분'을 설명하는지를 알려주는 기법

# 계층적 클러스터링

> hierarchical clustering : k-평균 대신 사용하는 클러스터링 방법으로 k-평균과는 다른 결과를 보여준다.  
> 특이점이나 비정상적인 그룹이나 레코드를 발견하는 데 더 민감하다.  
> 직관적인 시각화가 가능

- dendrogram : 레코드들, 그리고 레코드들이 속한 계층적 클러스터를 시작적으로 표현
- distance : 한 레코드가 다른 레코드들과 얼마나 가까운지를 보여주는 측정 지표
- 비유사도(dissimilarity) : 한 클러스터가 다른 클러스터들과 얼마나 가까운지를 보여주는 측정 지표
