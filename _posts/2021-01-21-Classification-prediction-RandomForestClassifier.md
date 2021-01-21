---
layout: single
title:  "Classification-RandomForestClassifier!"

categories :
  - Python

tags :
  - Classification
  - Prediction
  - RandomForestClassifier
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

랜덤 포레스트는 다수의 결정 트리들을 학습하는 앙상블 방법이다.  
랜덤 포레스트의 가장 큰 특징은 랜덤성(randomness)에 의해 트리들이 서로 조금씩 다른 특성을 갖는다는 점  
이 특성은 각 트리들의 예측(prediction)들이 비상관화(decorrelation) 되게하며, 결과적으로 일반화(generalization) 성능을 향상시킨다.  
랜덤화(randomization)는 포레스트가 노이즈가 포함된 데이터에 대해서도 강인하게 만들어 준다.  


```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score
```


```python
forest_clf = RandomForestClassifier(random_state=42)

forest_clf.fit(x_train, y_train)
```




    RandomForestClassifier(random_state=42)




```python
cross_val_score(forest_clf, x_train, y_train, cv=3, scoring="accuracy")
```




    array([0.78995434, 0.81278539, 0.82110092])




```python
cross_val_score(forest_clf, x_train, y_train, cv=3, scoring="accuracy").mean()
```




    0.8079468811528633




```python
forest_clf.score(x_valid , y_valid)
```




    0.8414634146341463



# 정답 제출


```python
answer = forest_clf.predict(test)
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

점수

![png](/assets/images/classification/score_randomforest_classification.png)
