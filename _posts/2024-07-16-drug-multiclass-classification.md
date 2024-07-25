---
layout : markdown
title : Drug 다중분류
tags : [drug-multiclass-classification, kaggle]
toc : true
---

{% include markdown.html %}

## 다중분류 문제를 딥러닝을 사용하여 풀어보기

### data preprocessing
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

if select_scaler == 'StandardScaler':
    scaler = StandardScaler()
    X = scaler.fit_transform(X)
elif select_scaler == 'MinMaxScaler':
    scaler = MinMaxScaler()
    X = scaler.fit_transform(X)
elif select_scaler == 'Normalizer':
    scaler = Normalizer()
    X = scaler.fit_transform(X)
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

> 구현 사이트 : [github_site](https://github.com/insu97/Project/tree/main/001.Drug_classification)
