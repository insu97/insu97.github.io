---
layout : markdown
title : 데이터 과학을 위한 통계 - 분류
tags : [Practical_Statistics_for_Data_Scientists, Python, Book]
toc : true
---
{% include markdown.html %}

# 나이브 베이즈

> naive Bayes 알고리즘은 주어진 결과에 대해 예측변숫값을 관찰할 확률을 사용  
> 예측변수가 주어졌을 때, 결과 Y = i를 관찰할 확률, 즉 정말 관심 있는 것을 추정

- 조건부확률 : 어떤 사건(Y= i)이 주어졌을 때, 사건(X = i)을 관찰할 확률
- 사후확률 : 예측 정보를 통합한 후 결과의 확률(이와 달리, 사전확률에서는 예측변수에 대한 정보를 고려하지 않는다.)

```python
# Iris 데이터셋 로드
iris = load_iris()
X = iris.data  # 특징 데이터
y = iris.target  # 레이블 데이터

# 학습 데이터와 테스트 데이터로 분리
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Gaussian Naive Bayes 모델 생성 및 학습
model = GaussianNB()
model.fit(X_train, y_train)

# 테스트 데이터에 대해 예측
y_pred = model.predict(X_test)

# 정확도 및 분류 성능 평가
accuracy = accuracy_score(y_test, y_pred) # Accuracy: 97.78%
```
# 판별분석

- 공분산 : 하나의 변수가 다른 변수와 함께 변화하는 정도(유사한 크기와 방향)를 측정하는 지표
- 판별함수 : 예측변수에 적용했을 때, 클래스 구분을 최대화하는 함수
- 판별 가중치 : 판별함수를 적용하여 얻은 점수를 말하며, 어떤 클래스에 속할 확률을 추정하는 데 사용된다.

```python
import numpy as np

# 두 변수 데이터 (예시 데이터)
x = [2.1, 2.5, 3.6, 3.9]
y = [8, 10, 12, 14]

# 공분산 계산
cov_matrix = np.cov(x, y)

# 공분산 값
cov_xy = cov_matrix[0, 1]
```
![cov](/assets/images/data_scientists/cov.png)

# 로지스틱 회귀

> 로지스틱 회귀는 결과가 이진형 변수이다.

- logit : (0 ~ 1이 아니라) $$ \pm \infty $$의 범위에서 어떤 클래스에 속할 확률을 결정하는 함수
- odds : '실패(0)'에 대한 '성공(1)'의 비율
- log odds : 변환 모델(선형)의 응답변수, 이 값을 통해 확률을 구한다.

```python
# 데이터셋 로드 (유방암 진단 데이터셋)
data = load_breast_cancer()
X = data.data  # 특징 데이터
y = data.target  # 레이블 (이진 클래스: 0과 1)

# 학습 데이터와 테스트 데이터로 분할
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 로지스틱 회귀 모델 생성 및 학습
model = LogisticRegression(max_iter=10000)  # 반복 횟수 설정
model.fit(X_train, y_train)

# 테스트 데이터에 대한 확률 예측
y_proba = model.predict_proba(X_test)  # 클래스 1에 속할 확률

# 클래스 1의 확률 가져오기 (양성 클래스)
probs = y_proba[:, 1]

# odds 및 log odds 계산
odds = probs / (1 - probs)
log_odds = np.log(odds)
```

> 출력

```python
First 10 samples' odds:
[7.22592689e+00 3.06485905e-08 1.60786038e-03 8.17214888e+02
 7.07486668e+03 2.00329645e-10 6.15220705e-11 1.96425715e-02
 6.23237035e+01 1.74551484e+02]

First 10 samples' log odds:
[  1.97767552 -17.30067916  -6.43285094   6.70590208   8.86430388
 -22.33105688 -23.51162513  -3.93005605   4.13234183   5.16221973]
```



# 분류 모델 평가하기

- 정확도
- 혼동행렬(confusion matrix)
- 민감도 : 1을 정확히 1로 분류한 비울(= recall[재현율])
- 특이도 : 0을 정확히 0으로 분류한 비율
- 정밀도 : 1이라고 예측한 것들 중에 1이 맞는 경우의 비율
- ROC 곡선 : 민감도와 특이성을 표시한 그림
- lift : 모델이 다른 확률 컷오프에 대해 (비교적 드문) 1을 얼마나 더 효과적으로 구분하는지 나타내는 지표

```python
# 데이터셋 로드
data = load_breast_cancer()
X = data.data  # 특징 데이터
y = data.target  # 레이블 (이진 클래스: 0과 1)

# 학습 데이터와 테스트 데이터로 분할
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 로지스틱 회귀 모델 생성 및 학습
model = LogisticRegression(max_iter=10000)
model.fit(X_train, y_train)

# 예측 및 확률 예측
y_pred = model.predict(X_test)
y_proba = model.predict_proba(X_test)[:, 1]  # 클래스 1에 대한 확률

# 혼동행렬 생성
conf_matrix = confusion_matrix(y_test, y_pred)

# 민감도(Recall), 특이도(Specificity), 정밀도(Precision), 정확도(Accuracy) 계산
tn, fp, fn, tp = conf_matrix.ravel()
sensitivity = tp / (tp + fn)  # 민감도 (TPR)
specificity = tn / (tn + fp)  # 특이도 (TNR)
precision = precision_score(y_test, y_pred)  # 정밀도
accuracy = accuracy_score(y_test, y_pred)  # 정확도
```

```python
# ROC Curve 및 AUC 계산
fpr, tpr, thresholds = roc_curve(y_test, y_proba)
roc_auc = auc(fpr, tpr)

# ROC 곡선 그리기
plt.figure(figsize=(10, 6))
plt.plot(fpr, tpr, color='blue', label=f'ROC curve (area = {roc_auc:.2f})')
plt.plot([0, 1], [0, 1], color='gray', linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('False Positive Rate (1 - Specificity)')
plt.ylabel('True Positive Rate (Sensitivity)')
plt.title('ROC Curve')
plt.legend(loc="lower right")
plt.show()
```

```python
# Lift 곡선 그리기
precision, recall, thresholds_pr = precision_recall_curve(y_test, y_proba)
lift = precision / (np.sum(y_test) / len(y_test))  # Lift 계산

plt.figure(figsize=(10, 6))
plt.plot(recall, lift, color='green', label='Lift curve')
plt.xlabel('Recall')
plt.ylabel('Lift')
plt.title('Lift Curve')
plt.legend(loc="upper right")
plt.show()
```

> 출력

```python
Confusion Matrix:
[[39  4]
 [ 1 70]]
Sensitivity (Recall): 0.99
Specificity: 0.91
Precision: 0.95
Accuracy: 0.96
```

{% include plotly/ROC.html %}
{% include plotly/Lift.html %}


# 불균형 데이터 다루기
- 과소표본 : 분류 모델에서 개수가 많은 클래스 데이터 중 일부 소수만을 사용하는 것(= 다운샘플)
- 과잉표본 : 분류 모델에서 희귀 클래스 데이터를 중복하여, 필요하면 부트스트랩에서 사용하는 것(= 업샘플)
- 상향 가중치 or 하향 가중치 : 모델에서 회귀(혹은 다수) 클래스에 높은(혹은 낮은) 가중치를 주는 것
- 데이터 생성 : 부트스트랩과 비슷하게 다시 샘플링한 레코드를 빼고 원래 원본과 살짝 다르게 데이터를 생성하는 것
- z-score : 표준화 결과
- k : 최근접 이웃 알고리즘에서 이웃들의 개수
