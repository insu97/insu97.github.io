---
layout: single
title:  "Classification-prediction-LogisticRegression!"

categories :
  - Python

tags :
  - Classification
  - Prediction
  - LogisticRegression
  - hyperparameter

comments : true

---


```python
import warnings
warnings.filterwarnings('ignore')
import pandas as pd
import numpy as np
random_state=9701
```


```python
x_train = pd.read_csv("../data/titanic/x_train.csv")
x_valid = pd.read_csv("../data/titanic/x_valid.csv")
y_train = pd.read_csv("../data/titanic/y_train.csv")
y_valid = pd.read_csv("../data/titanic/y_valid.csv")

train = pd.read_csv("../data/titanic/pre_train.csv")
test = pd.read_csv("../data/titanic/pre_test.csv")
```

# 예측

로지스틱 회귀 분석은 이진 분류를 수행하는 데 사용된다.  
데이터 샘플을 양성(1) 또는 음성(0) 클래스 둘 중 어디에 속하는지 예측


```python
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score
```


```python
lr = LogisticRegression()

lr.fit(x_train, y_train)
```




    LogisticRegression()




```python
cross_val_score(lr, x_train, y_train, cv=3, scoring='accuracy')
```




    array([0.79452055, 0.80821918, 0.80733945])




```python
cross_val_score(lr, x_train, y_train, cv=3, scoring='accuracy').mean()
```




    0.8033597251895607




```python
lr.score(x_valid , y_valid)
```




    0.8353658536585366



## 정답 제출


```python
answer = lr.predict(test)
```


```python
submission = pd.read_csv("../data/titanic/gender_submission.csv")
```


```python
submission['Survived'] = answer.astype('int')
```


```python
submission.to_csv("../data/titanic/gender_submission.csv" , index = False)
```

![png](/assets/images/classification/score_LR_calssification.png)

# 하이퍼 파라미터

참고 : https://ivo-lee.tistory.com/95

## 랜덤 서치


```python
from scipy.stats import uniform

penalty = ['l1', 'l2'] # 페널티 하이퍼파라미터 후보를 만듭니다.
C = uniform(loc=0, scale=4) # 규제 하이퍼파라미터 값의 후보를 위한 분포를 만듭니다.
hyperparameters = dict(C=C, penalty=penalty) # 하이퍼파라미터 옵션을 만듭니다.
```


```python
from sklearn.model_selection import RandomizedSearchCV
```


```python
# 랜덤 서치 객체 생성
lr_random = RandomizedSearchCV(lr,
                              hyperparameters,
                              random_state=random_state,
                              n_iter=100,
                              cv=5,
                              verbose=2,
                              n_jobs=-1)
```


```python
lr_random.fit(x_train, y_train) # 랜덤 서치 수행
```

    Fitting 5 folds for each of 100 candidates, totalling 500 fits


    [Parallel(n_jobs=-1)]: Using backend LokyBackend with 8 concurrent workers.
    [Parallel(n_jobs=-1)]: Done  34 tasks      | elapsed:    0.0s
    [Parallel(n_jobs=-1)]: Done 500 out of 500 | elapsed:    0.9s finished





    RandomizedSearchCV(cv=5, estimator=LogisticRegression(), n_iter=100, n_jobs=-1,
                       param_distributions={'C': <scipy.stats._distn_infrastructure.rv_frozen object at 0x0000026AB767D280>,
                                            'penalty': ['l1', 'l2']},
                       random_state=9701, verbose=2)




```python
lr_random.best_params_
```




    {'C': 0.7241143039266293, 'penalty': 'l2'}




```python
best_random = lr_random.best_estimator_
random_accuracy = evaluate(best_random, x_valid, y_valid)
```

    Model Performance
    Accuracy = 82.93%


### 정답 제출


```python
answer = lr_random.predict(test)
```


```python
submission = pd.read_csv("../data/titanic/gender_submission.csv")
```


```python
submission['Survived'] = answer.astype('int')
```


```python
submission.to_csv("../data/titanic/gender_submission.csv" , index = False)
```

![png](/assets/images/classification/score_LR_calssification_random.png)

## 그리드 서치


```python
from sklearn.model_selection import GridSearchCV
```


```python
lr.get_params()
```




    {'C': 1.0,
     'class_weight': None,
     'dual': False,
     'fit_intercept': True,
     'intercept_scaling': 1,
     'l1_ratio': None,
     'max_iter': 100,
     'multi_class': 'auto',
     'n_jobs': None,
     'penalty': 'l2',
     'random_state': None,
     'solver': 'lbfgs',
     'tol': 0.0001,
     'verbose': 0,
     'warm_start': False}




```python
penalty = ['l1', 'l2']
C = np.logspace(0, 4, 10)
hyperparameters = dict(C=C, penalty=penalty)
```


```python
hyperparameters
```




    {'C': array([1.00000000e+00, 2.78255940e+00, 7.74263683e+00, 2.15443469e+01,
            5.99484250e+01, 1.66810054e+02, 4.64158883e+02, 1.29154967e+03,
            3.59381366e+03, 1.00000000e+04]),
     'penalty': ['l1', 'l2']}



- verbose  
    - 탐색 시간이 긴 경우에 잘 진행되는지 확인할 수 있는 옵션  
    - 탐색 과정에서 출력되는 메시지의 양을 결정.    
    - 0은 아무것도 출력하지 않고 1에서 3까지 갈수록 자세한 메시지를 출력


```python
gridsearch = GridSearchCV(lr, hyperparameters, cv=5, verbose=1 , n_jobs=-1) # 그리드 서치 객체 생성
```


```python
best_model = gridsearch.fit(x_train, y_train) # 그리드 서치 수행
```

    Fitting 5 folds for each of 20 candidates, totalling 100 fits


    [Parallel(n_jobs=1)]: Using backend SequentialBackend with 1 concurrent workers.
    [Parallel(n_jobs=1)]: Done 100 out of 100 | elapsed:    1.0s finished



```python
# 최선의 하이퍼파라미터를 확인합니다.
print('가장 좋은 페널티:', best_model.best_estimator_.get_params()['penalty'])
print('가장 좋은 C 값:', best_model.best_estimator_.get_params()['C'])
```

    가장 좋은 페널티: l2
    가장 좋은 C 값: 464.15888336127773



```python
best_grid = grid_search.best_estimator_
```


```python
def evaluate(model, x_train, y_train):
    accuracy = model.score(x_train , y_train)
    print('Model Performance')
    print('Accuracy = {:0.2f}%'.format(accuracy* 100))

    return accuracy
```


```python
grid_accuracy = evaluate(best_grid, x_valid, y_valid)
```

    Model Performance
    Accuracy = 83.54%


### 정답 제출


```python
answer = best_grid.predict(test)
```


```python
submission = pd.read_csv("../data/titanic/gender_submission.csv")
```


```python
submission['Survived'] = answer.astype('int')
```


```python
submission.to_csv("../data/titanic/gender_submission.csv" , index = False)
```

![png](/assets/images/classification/score_LR_calssification_grid.png)

하이퍼 파라미터로 모델을 개선시켜도 점수가 크게 변하지는 않는다
