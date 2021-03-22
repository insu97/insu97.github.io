---
layout: single
title:  "Classification-prediction-RandomForestClassifier!"

categories :
  - Python

tags :
  - Classification
  - Prediction
  - RandomForestClassifier
  - hyperparameter

comments : true

sidebar:
  nav: "Python"
  
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

![png](/assets/images/classification/score_randomforest_classification.png)

# 하이퍼 파라미터

참고 + 변형 : https://towardsdatascience.com/hyperparameter-tuning-the-random-forest-in-python-using-scikit-learn-28d2aa77dd74


```python
from sklearn.ensemble import RandomForestClassifier
from pprint import pprint # print문을 한번에 여러번 쓰기 위해 + 줄 정리
rf = RandomForestClassifier(random_state = 9701)
```


```python
# Look at parameters used by our current forest
print('Parameters currently in use:\n')
pprint(rf.get_params())
```

    Parameters currently in use:

    {'bootstrap': True,
     'ccp_alpha': 0.0,
     'class_weight': None,
     'criterion': 'gini',
     'max_depth': None,
     'max_features': 'auto',
     'max_leaf_nodes': None,
     'max_samples': None,
     'min_impurity_decrease': 0.0,
     'min_impurity_split': None,
     'min_samples_leaf': 1,
     'min_samples_split': 2,
     'min_weight_fraction_leaf': 0.0,
     'n_estimators': 100,
     'n_jobs': None,
     'oob_score': False,
     'random_state': 9701,
     'verbose': 0,
     'warm_start': False}

## 랜덤하게 찾기

```python
from sklearn.model_selection import RandomizedSearchCV

# Number of trees in random forest
n_estimators = [int(x) for x in np.linspace(start = 100, stop = 600, num = 10)]

# Number of features to consider at every split
max_features = ['auto', 'sqrt']

# Maximum number of levels in tree
max_depth = [int(x) for x in np.linspace(10, 110, num = 11)]
max_depth.append(None)

# Minimum number of samples required to split a node
min_samples_split = [2, 5, 10]
# Minimum number of samples required at each leaf node
min_samples_leaf = [1, 2, 4]
# Method of selecting samples for training each tree
bootstrap = [True, False]
```


```python
# Create the random grid
random_grid = {'n_estimators': n_estimators,
               'max_features': max_features,
               'max_depth': max_depth,
               'min_samples_split': min_samples_split,
               'min_samples_leaf': min_samples_leaf,
               'bootstrap': bootstrap}
pprint(random_grid)
```

    {'bootstrap': [True, False],
     'max_depth': [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, None],
     'max_features': ['auto', 'sqrt'],
     'min_samples_leaf': [1, 2, 4],
     'min_samples_split': [2, 5, 10],
     'n_estimators': [100, 155, 211, 266, 322, 377, 433, 488, 544, 600]}


```python
# Use the random grid to search for best hyperparameters
# First create the base model to tune
rf = RandomForestClassifier()
# Random search of parameters, using 3 fold cross validation,
# search across 100 different combinations, and use all available cores
rf_random = RandomizedSearchCV(estimator = rf, param_distributions = random_grid, n_iter = 100, cv = 3, verbose=2, random_state=9701, n_jobs = -1)
# Fit the random search model
rf_random.fit(x_train, y_train)
```

    Fitting 3 folds for each of 100 candidates, totalling 300 fits


    [Parallel(n_jobs=-1)]: Using backend LokyBackend with 8 concurrent workers.
    [Parallel(n_jobs=-1)]: Done  25 tasks      | elapsed:    3.1s
    [Parallel(n_jobs=-1)]: Done 146 tasks      | elapsed:    9.9s
    [Parallel(n_jobs=-1)]: Done 300 out of 300 | elapsed:   19.0s finished





    RandomizedSearchCV(cv=3, estimator=RandomForestClassifier(), n_iter=100,
                       n_jobs=-1,
                       param_distributions={'bootstrap': [True, False],
                                            'max_depth': [10, 20, 30, 40, 50, 60,
                                                          70, 80, 90, 100, 110,
                                                          None],
                                            'max_features': ['auto', 'sqrt'],
                                            'min_samples_leaf': [1, 2, 4],
                                            'min_samples_split': [2, 5, 10],
                                            'n_estimators': [100, 155, 211, 266,
                                                             322, 377, 433, 488,
                                                             544, 600]},
                       random_state=9701, verbose=2)




```python
rf_random.best_params_
```




    {'n_estimators': 544,
     'min_samples_split': 10,
     'min_samples_leaf': 2,
     'max_features': 'auto',
     'max_depth': 60,
     'bootstrap': False}




```python
def evaluate(model, x_train, y_train):
    accuracy = model.score(x_train , y_train)
    print('Model Performance')
    print('Accuracy = {:0.2f}%'.format(accuracy* 100))

    return accuracy
```


```python
base_model = RandomForestClassifier(n_estimators = 10, random_state = 9701)
base_model.fit(x_train, y_train)
```




    RandomForestClassifier(n_estimators=10, random_state=9701)




```python
base_accuracy = evaluate(base_model, x_valid, y_valid)
```

    Model Performance
    Accuracy = 84.15%



```python
best_random = rf_random.best_estimator_
random_accuracy = evaluate(best_random, x_valid, y_valid)
```

    Model Performance
    Accuracy = 87.80%



```python
print('Improvement of {:0.2f}%.'.format( 100 * (random_accuracy - base_accuracy)))
```

    Improvement of 3.66%.


### 정답 제출


```python
answer = rf_random.predict(test)
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

![png](/assets/images/classification/score_randomforest_classification_hyper_random.png)


## 그리드 서치


```python
from sklearn.model_selection import GridSearchCV
# Create the parameter grid based on the results of random search
param_grid = {
    'bootstrap': [True],
    'max_depth': [80, 90, 100, 110],
    'max_features': [2, 3],
    'min_samples_leaf': [3, 4, 5],
    'min_samples_split': [8, 10, 12],
    'n_estimators': [100, 200, 300, 1000]
}
```


```python
# Create a based model
rf = RandomForestClassifier()
# Instantiate the grid search model
grid_search = GridSearchCV(estimator = rf, param_grid = param_grid,
                          cv = 3, n_jobs = -1, verbose = 2)
```


```python
# Fit the grid search to the data
grid_search.fit(x_train, y_train)
```

    Fitting 3 folds for each of 288 candidates, totalling 864 fits


    [Parallel(n_jobs=-1)]: Using backend LokyBackend with 8 concurrent workers.
    [Parallel(n_jobs=-1)]: Done  25 tasks      | elapsed:    3.5s
    [Parallel(n_jobs=-1)]: Done 146 tasks      | elapsed:   11.7s
    [Parallel(n_jobs=-1)]: Done 349 tasks      | elapsed:   26.5s
    [Parallel(n_jobs=-1)]: Done 632 tasks      | elapsed:   47.2s
    [Parallel(n_jobs=-1)]: Done 864 out of 864 | elapsed:  1.1min finished





    GridSearchCV(cv=3, estimator=RandomForestClassifier(), n_jobs=-1,
                 param_grid={'bootstrap': [True], 'max_depth': [80, 90, 100, 110],
                             'max_features': [2, 3], 'min_samples_leaf': [3, 4, 5],
                             'min_samples_split': [8, 10, 12],
                             'n_estimators': [100, 200, 300, 1000]},
                 verbose=2)




```python
grid_search.best_params_
```




    {'bootstrap': True,
     'max_depth': 100,
     'max_features': 2,
     'min_samples_leaf': 4,
     'min_samples_split': 12,
     'n_estimators': 100}




```python
best_grid = grid_search.best_estimator_
```


```python
grid_accuracy = evaluate(best_grid, x_valid, y_valid)
```

    Model Performance
    Accuracy = 85.37%



```python
print('Improvement of {:0.2f}%.'.format(100 * (grid_accuracy - base_accuracy)))
```

    Improvement of 1.22%.


### 정답 제출


```python
answer = grid_search.predict(test)
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

![png](/assets/images/classification/score_randomforest_classification_hyper_grid.png)
