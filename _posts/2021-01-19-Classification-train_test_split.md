---
layout: single
title:  "Classification-train_test_split!"

categories :
  - Python

tags :
  - Classification
  - train_test_split
---

```python
import warnings
warnings.filterwarnings('ignore')
import pandas as pd
import numpy as np
```


```python
train = pd.read_csv("../data/titanic/pre_train.csv")
test = pd.read_csv("../data/titanic/pre_test.csv")
```

# random
    - 어떤 데이터 셋에도 특정 값이 누락되어서는 안되며 비슷한 샘플이 연이어 나오면 성능이 나빠질 가능성이 존재
    - 과적합을 줄일 수 있다.


```python
from sklearn.model_selection import train_test_split
```


```python
feature = train.columns.drop('Survived')
label = ['Survived']
```

* **test_size**: validation set에 할당할 비율 (20% -> 0.2)
* **shuffle**: 셔플 옵션 (기본 True)
* **random_state**: 랜덤 시드값


```python
x_train , x_valid, y_train, y_valid = train_test_split(train[feature], train[label], test_size=0.2, shuffle=True, random_state=9701)
```


```python
x_train.shape, y_train.shape , x_valid.shape, y_valid.shape
```




    ((656, 9), (656, 1), (164, 9), (164, 1))




```python
x_train.index
```




    Int64Index([207, 356, 163, 522, 587, 622, 530, 623, 291, 482,
                ...
                785, 484, 172, 406, 743, 521,  17, 132, 435, 407],
               dtype='int64', length=656)




```python
x_valid.index
```




    Int64Index([590,  11, 221,  67, 403, 563, 318,  59, 707, 535,
                ...
                710, 627, 769, 125, 182, 311, 212, 501, 445, 417],
               dtype='int64', length=164)




```python
y_train['Survived'].value_counts()/len(y_train)
```




    0.0    0.603659
    1.0    0.396341
    Name: Survived, dtype: float64




```python
y_valid['Survived'].value_counts()/len(y_valid)
```




    0.0    0.591463
    1.0    0.408537
    Name: Survived, dtype: float64



# 정답 비율을 일정하게 나누기
    stratify: label의 클래스의 분포를 균등하게 배분


```python
x_train , x_valid, y_train, y_valid = train_test_split(train[feature], train[label], test_size=0.2 , stratify= train['Survived'] , random_state=9701)
```


```python
y_train['Survived'].value_counts()/len(y_train)
```




    0.0    0.60061
    1.0    0.39939
    Name: Survived, dtype: float64




```python
y_valid['Survived'].value_counts()/len(y_valid)
```




    0.0    0.603659
    1.0    0.396341
    Name: Survived, dtype: float64



# 데이터 저장


```python
x_train.to_csv("../data/titanic/x_train.csv" , index = False)
x_valid.to_csv("../data/titanic/x_valid.csv" , index = False)
y_train.to_csv("../data/titanic/y_train.csv" , index = False)
y_valid.to_csv("../data/titanic/y_valid.csv" , index = False)
```
