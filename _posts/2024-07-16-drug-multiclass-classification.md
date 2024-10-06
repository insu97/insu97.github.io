---
layout : markdown
title : Drug 다중분류
tags : [Kaggle, Multiclass-Classification]
toc : true
---

{% include markdown.html %}

## Data preprocessing
```python

df = pd.concat([df, pd.get_dummies(df[['Sex','BP','Cholesterol']], dtype=int)], axis=1)
df.drop(columns=['Sex','BP','Cholesterol'], axis=1, inplace=True)

le = LabelEncoder()
df['Drug'] = le.fit_transform(df['Drug'])

print("Drug LabelEncoder : ", le.classes_)

X = df.drop(columns=['Drug'], axis=1)
y = df['Drug']
```

![image](/assets/images/drug/df.head().png)
> Na_to_k : 혈중 나트륨 vs 칼륨 비율  
> BP : 혈압

---

### scaler 선택

```python
select_scaler = input("Scaler 선택 : ['StandardScaler', 'MinMaxScaler', 'Normalizer']")
```

---
### train_test_split

```python
y = y.values

x_train, x_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

x_val = x_train[:40]
x_train = x_train[40:]
y_val = y_train[:40]
y_train = y_train[40:]
```

---
## Parameter

### optimizer and learning_rate
```python
learning_rate = 0.01

select_optimizer = input("optimizer 선택 : ['SGD','Momentum','Nesterov','AdaGrad','RMSprop','Adam']")
```

---
## Hyperparameter

```python
iters_num= 1000
train_size = x_train.shape[0]
batch_size = 50
dropout_ratio = 0.1
weight_decay_lambda = 0.1
use_batchnorm = True
```

---
## model 생성
```python
net = simpleNet(9, [6,6,6,6,6], 5, dropout_ratio=dropout_ratio, weight_decay_lambda=weight_decay_lambda, use_batchnorm=use_batchnorm)
```
---
## 결과
![image](/assets/images/drug/train_test_acc.png)
![image](/assets/images/drug/train_loss.png)

---

> 구현 사이트 : [github_site](https://github.com/insu97/Project/tree/main/001.Drug_classification)
