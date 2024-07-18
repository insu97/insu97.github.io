---
layout : markdown
title : Drug 다중분류
tags : [drug-multiclass-classification, kaggle]
---

{% include markdown.html %}

## 다중분류 문제를 딥러닝을 사용하여 풀어보기

```python
#%% data preprocessing

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
>

---

> 구현 사이트 : [github_site](https://github.com/insu97/Project/tree/main/001.Drug_classification)
