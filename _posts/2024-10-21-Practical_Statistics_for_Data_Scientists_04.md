---
layout : markdown
title : 데이터 과학을 위한 통계 - 회귀와 예측
tags : [Practical_Statistics_for_Data_Scientists, Python, Book]
toc : true
---
{% include markdown.html %}

# 단순선형회귀

- 종속변수 : 예측하고자 하는 변수
- 독립변수 : 응답치를 예측하기 위해 사용되는 변수
- 절편 : 회귀직선의 절편, 즉 X = 0일 때 예측값
- 회귀계수 : 회귀직선의 기울기
- 잔차(residual) : 관측값과 적합값의 차이(= 오차)
- 최소제곱 : 잔차의 제곱합을 최소화하여 회귀를 피팅하는 방법

> $$y = ax + b$$ [ a : 회귀계수, b : 절편, x : 독립변수, y : 종속변수]

```python
# 샘플 데이터 생성
X = np.array([1, 2, 3, 4, 5]).reshape(-1, 1)  # 입력 변수
y = np.array([1.2, 1.9, 3.1, 3.9, 5.2])  # 실제 출력 값

# 선형 회귀 모델 학습
model = LinearRegression()
model.fit(X, y)

# 예측 값 구하기
y_pred = model.predict(X)

# 잔차 계산 (실제 값 - 예측 값)
residuals = y - y_pred
```

{% include plotly/RESIDUALS.html %}

# 다중선형회귀

- 제곱근평균제곱오차(RMSE) : 회귀 시 평균제곱오차의 제곱근, 회귀모형을 평가하는 데 가장 널리 사용되는 측정 지표
- 잔차 표준오차(RSE, Root Standard Error) : 평균제곱오차와 동일하지만 자유도에 따라 보정된 값
- r-squared : 0에서 1까지 모델에 의해 설명된 분산의 비율(= 결정계수)
- t-statistic : 계수의 표준오차로 나눈 예측변수의 계수, 모델에서 변수의 중요도를 비교하는 기준
- 가중회귀 : 다른 가중치를 가진 레코드들을 회귀하는 방법

```python
X = np.random.rand(100, 3)  # 100개의 샘플, 3개의 독립 변수
y = 3.5*X[:,0] + 2.1*X[:,1] + 4.7*X[:,2] + np.random.randn(100)  # 종속 변수

# 데이터프레임 생성
df = pd.DataFrame(X, columns=['feature1', 'feature2', 'feature3'])
df['target'] = y

# 독립 변수(X)와 종속 변수(y) 분리
X = df[['feature1', 'feature2', 'feature3']]
y = df['target']

# 상수항 추가 (절편 계산을 위해)
X = sm.add_constant(X)

# 1. 다중 선형 회귀 모델 학습
model = sm.OLS(y, X).fit()

# 2. 예측 값 구하기
y_pred = model.predict(X)

# 1. RMSE 계산
rmse = np.sqrt(mean_squared_error(y, y_pred))

# 2. R-squared 값 계산
r_squared = model.rsquared

# 3. t-statistic 값 (각 독립 변수의 t-statistic)
t_statistics = model.tvalues

print(model.summary())
```
{% include plotly/model_summary.html %}

> RMSE : 값이 낮을수록 예측이 더 정확하다는 것을 의미  
> R-squared (결정계수) : 회귀 모델이 데이터의 분산을 얼마나 잘 설명하는지를 의미, 값이 1에 가까울수록 모델이 데이터를 잘 설명하는 것  
> t-statistic: 각 독립 변수에 대한 t-통계량이 크면 그 변수가 종속 변수에 미치는 영향이 유의미하다는 것 -> 보통 절대값이 2 이상일 때 유의미하다고 판단

# 회귀를 이용한 예측

- 예측구간 : 개별 예측값 주위의 불확실한 구간
- 외삽법 : 모델링에 사용된 데이터 범위를 벗어난 부분까지 모델을 확장하는 것

# 회귀에서의 요인변수

- dummy variable : 회귀나 다른 모델에서 요인 데이터를 사용하기 위해 0과 1의 이진변수로 부호화한 변수
- one-hot encoding
- deviation coding : 기준 수준과는 반대로 전체 평균에 대해 각 수준을 비교하는 부호화 방법

# 회귀방정식 해석

- 변수 간 상관
- 다중공선성 : 독립변수들이 완벽하거나 거의 완벽에 가까운 상관성을 갖는다고 할 때, 회귀는 불완정하며 계산이 불가능하다.
- 교란변수 : 중요한 독립변수지만 회귀방정식에 누락되어 결과를 잘못되게 이끄는 변수

# 회귀진단

- 표준화잔차 : 잔차를 표준오차로 나눈 값
- outlier : 나머지 데이터와 멀리 떨어진 레코드
- hat-value : 회귀식에 한 레코드가 미치는 영향력의 정도
- 이분산성 : 어떤 범위 내 출력값의 잔차가 매우 높은 분산을 보이는 경향 ( 어떤 예측변수를 회귀식이 놓치고 있다는 것을 의미 )

```python
# 이분산성을 가지는 데이터 생성
np.random.seed(0)
X = np.linspace(1, 10, 100)  # 독립 변수 X
y = 2 * X + np.random.randn(100) * X  # 종속 변수 y, X의 값에 따라 잔차의 크기가 커짐 (이분산성)
```

{% include plotly/Heteroscedasticity.html %}

# 다항회귀와 스플라인 회귀

- 다항회귀
- 스플라인 회귀 : 다항 구간들을 부드러운 곡선 형태로 피팅
- knot : 스플라인 구간을 구분하는 값들
- GAM(generalized additive model) : 자동으로 구간을 결정하는 스플라인 모델

```python
from pygam import LinearGAM, s

# 샘플 데이터 생성
np.random.seed(0)
X = np.linspace(0, 10, 100)  # 독립 변수
y = 5 * X**2 - 3 * X + np.random.normal(0, 10, 100)  # 종속 변수, 2차 다항식 형태

# 2D 형태로 변환 (GAM에서 X는 2D로 요구됨)
X = X[:, np.newaxis]

# GAM 모델 생성 (s()는 스플라인을 의미)
gam = LinearGAM(s(0, n_splines=20, spline_order=3)).fit(X, y)

# 예측 값 구하기
XX = np.linspace(0, 10, 100)
predictions = gam.predict(XX)
```

{% include plotly/GAM.html %}
