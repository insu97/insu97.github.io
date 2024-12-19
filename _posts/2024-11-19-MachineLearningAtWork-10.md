---
layout : markdown
title: Machine Learning At Work - 10
tags : [Machine_Learning_At_Work, Book]
toc : true
---

{% include markdown.html %}

# 업리프트 모델링을 이용한 마케팅 리소스 효율화

> 업리프트 모델 : 역학 통계나 다이렉트 마케팅에서 활용되는 머신러닝 기법

## 업리프트 모델링의 사분면

| 개입 안 함 | 개입함 | 범주 | 대응 방안 |
| --- | --- | --- | --- |
| 전환하지 않음 | 전환하지 않음 | 무관심 | 비용이 드는 개입은 자제한다 |
| 전환하지 않음 | 전환함 | 설득 가능 | 가능한 개입 대상에 포함시킨다 |
| 전환함 | 전환하지 않음 | 청개구리 | 개입 대상에 절대로 포함시키지 않는다 |
| 전환함 | 전환함 | 잡은 물고기 | 비용이 드는 개입은 자제한다. |

## 데이터 셋 만들기

```python
import random

def generate_sample_data(num, seed=1):
    is_cv_list = []          # 전환여부
    is_treat_list = []       # 실험군 여부
    feature_vector_list = [] # 8차원 특징량

    random_instance = random.Random(seed)

    feature_num = 8
    base_weight = [0.02, 0.03, 0.05, -0.04, 0.00, 0.00, 0.00, 0.00] # 대조군이 가진 가중치
    lift_weight = [0.00, 0.00, 0.00, 0.05, -0.05, 0.00, 0.00, 0.00] # 개입에 의해 달라지는 가중치

    for i in range(num):
        feature_vector = [random_instance.random() for n in range(feature_num)]         # [0, 1] 로 구성된 8차원 특징량 벡터 생성
        is_treat = random_instance.choice((True, False))                                # 실험군과 대조군을 무작위로 결정
        cv_rate = sum([feature_vector[n] * base_weight[n] for n in range(feature_num)]) # 내부적인 전환율 구하기

        if is_treat: # 실험군에 속하면 lift_weight의 영향을 추가
            cv_rate += sum([feature_vector[n] * lift_weight[n] for n in range(feature_num)])

        is_cv = cv_rate > random_instance.random() # 전환 여부

        is_cv_list.append(is_cv)
        is_treat_list.append(is_treat)
        feature_vector_list.append(feature_vector)

    return is_cv_list, is_treat_list, feature_vector_list
```

$$  cv\_rate = \left\{\begin{matrix}
 feature\_vector \cdot base\_weight \cdots (대조군)\\ feature\_vector \cdot (base\_weight + lift\_weight) \cdots (실험군)
\end{matrix}\right. $$

## 두 가지 예측 모델을 이용한 업리프트 모델링

> 원시적인 형태의 업리프트 모델링에서는 실험군과 대조군 각각의 예측 모델을 만든다.  
1. 대조군 예측 모델에서는 개입을 하지 않았을 때의 전환율을 예측한다.
2. 실험군 예측 모델에서는 개입했을 때의 전환율을 예측한다.

```python
# train 데이터 생성
sample_num = 100000
train_is_cv_list, train_is_treat_list, train_feature_vector_list = generate_sample_data(sample_num, seed=1)

# 데이터를 treatment(실험군)와 control(대조군)로 분리
treat_is_cv_list = []
treat_feature_vector_list = []
control_is_cv_list = []
control_feature_vector_list = []

for i in range(sample_num):
    if train_is_treat_list[i]:
        treat_is_cv_list.append(train_is_cv_list[i])
        treat_feature_vector_list.append(train_feature_vector_list[i])
    else:
        control_is_cv_list.append(train_is_cv_list[i])
        control_feature_vector_list.append(train_feature_vector_list[i])

# treatment_cvr 0.031220247540463344
# control_cvr 0.031905453372055505        
```

> 실험군과 대조군의 전환율의 차이가 거의 없다고 볼 수 있다.  
> A/B TEST 였다면 유의미한 차이가 아니므로 실패로 판단했을 것

```python
# 전환 예측
from sklearn.linear_model import LogisticRegression

# 학습기 생성
treat_model = LogisticRegression(C=0.01)
control_model = LogisticRegression(C=0.01)

# 학습기 구현
treat_model.fit(treat_feature_vector_list, treat_is_cv_list)
control_model.fit(control_feature_vector_list, control_is_cv_list)
```

> 업리프트 모델링 점수 = 실험군 예측값 / 대조군 예측값

```python
# predict_proba : 특징 벡터를 인수로 받아 특정 클래스에 소속될 확률을 numpy.ndarray 타입 배열로 얻을 수 있다.
test_is_cv_list, test_is_treat_list, test_feature_vector_list = generate_sample_data(sample_num, seed=42)

# 각 학습기별로 전환율 예측
treat_score = treat_model.predict_proba(test_feature_vector_list)
control_score = control_model.predict_proba(test_feature_vector_list)

# 점수를 계산한다(실험군 에측 전환율 / 대조군 예측 전환율)
# predict_proba는 각 클래스에 속할 확률의 리스트를 반환하므로 첫 번째 값만 확인한다.
# 반환값이 numpy.ndarray 타입이므로 그대로 나눠도 요소 단위 나눗셈이 된다.
score_list = treat_score[:,1] / control_score[:,1]
```

> 시각화

{% include plotly/uplift_score_chart.html %}

> 점수가 높을수록 실험군의 전환율이 높고 대조군은 낮다는 것을 확인할 수 있다.  
> 그래프 기준으로 점수 상위 40%에만 개입하면 전체 전환율을 개선할 수 있다는 것도 알 수 있다.

## AUCC로 업리프트 모델링 평가

> AUCC : area under the uplift scuve  
> AUUC 값이 클수록 업리프트 모델링 성능이 좋은 것

- 순서
1. 점수가 높은 순서대로 대상을 살펴보면서 그 시점까지의 전환율을 측정한다.
2. 전환율의 값 차이에서 개입이 일으킨 전환 증가 건수(lift)를 계산한다.
3. 무작위로 개입했을 때 전환 증가 건수인 lift의 원점과 끝점을 연결한 직선을 베이스 라인으로 가정한다.
4. lift와 base_line이 둘러싼 영역의 넓이를 계산하고 정규화해 AUUC를 구한다.

{% include plotly/uplift_score_comparison.html %}

> AUUC 값 : 267.09977536176643

> 업리프트 모델링의 정확할수록 높은 점수에서는 실험군에서 전환하는 고객, 대조군에서는 전환하지 않은 고객이 모이며 낮은 점수에서는 반대가 된다.  
> 이 때문에 lift곡선은 처음에는 실험군의 전환이 모여 양의 기울기를 가지며 정확도가 향상되면서 양의 기울기가 커진다.  
> 마지막 부분에는 대조군의 전환이 모여 음의 기울기를 가지며 정확도가 향상되면서 기울기가 커진다.  
> 따라서 lift곡선은 정확도가 높을수록 위쪽으로 볼록해지며 lift와 base_line으로 둘러싸인 넓이와 AUUC 점수가 커진다.

> 실제 서비스에서는 이 점수를 기반으로 해 개입 여부를 결정해야 한다.  
> 개입 기준점을 정하기 위해 점수를 가로축으로 하는 lift모델 그리기

{% include plotly/uplift_score.html %}

> 모델링 점수 1.2 이상에서 개입하면 lift를 최대가 된다는 것을 알 수 있다.  

---

```
- Memo
> uplift 모델에 대해서 조금 더 자세한 공부가 필요해 보인다.  
> 결과를 해석하는데 조금 어려움을 겪음
```
