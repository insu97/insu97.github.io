---
layout : markdown
title : HackerRank - Python - Warmup
tags : [Python, Algorithms]
toc : true
---
{% include markdown.html %}

# 001

```python
def solveMeFirst(a,b):
	return a + b

num1 = int(input())
num2 = int(input())
res = solveMeFirst(num1,num2)
print(res)
```

# 002

```python
def simpleArraySum(ar):
    a = 0
    for i in ar:
        a += i
    return a
```

# 003

```python
def compareTriplets(a, b):
    alice = 0
    bob = 0

    for i in range(len(a)):
        if a[i] > b[i]:
            alice +=1
        elif b[i] > a[i]:
            bob += 1

    return alice, bob
```

# 004

```python
def aVeryBigSum(ar):
    # Write your code here
    b = 0
    for i in ar:
        b += i

    return b
```

# 005

```python
def diagonalDifference(arr):

    a = 0
    b = 0

    for i in range(len(arr[0])):
        a += arr[i][i]

    for j in range(len(arr[0])):
        b += arr[j][-1-j]

    return abs(a - b)
```
