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

# 006

```python
def plusMinus(arr):
    a = 0
    b = 0
    c = 0

    for i in arr:
        if i > 0:
            a += 1
        elif i == 0:
            b += 1
        else:
            c += 1

    print(round(a/len(arr), 6))
    print(round(c/len(arr), 6))
    print(round(b/len(arr), 6))
```

# 007

```python
def staircase(n):

    for i in range(1, n+1):
        print(' ' * (n-i) + '#' * (i))
```

# 008

```python
def miniMaxSum(arr):

    a = max(arr)
    b = min(arr)

    print(sum(arr) - a, sum(arr) - b)
```

# 009

```python
def birthdayCakeCandles(candles):
    a = max(candles)
    b = 0
    for i in candles:
        if a == i:
            b += 1

    return b
```

# 010

```python
def timeConversion(s):

    if s[8:] == 'AM':
        a = s.split('AM')[0]
        b = int(a.split(':')[0])
        if b >= 12:
            b -= 12
        if b == 0:
            b = '00'
        elif b < 10:
            b = '0' + str(b)
        c = str(b) + a[2:]

        return c
    elif s[8:] == 'PM':
        a = s.split('PM')[0]
        b = int(a.split(':')[0])
        b += 12
        if b >= 24:
            b -= 12
        if b == 0:
            b = '00'
        elif b < 10:
            b = '0' + str(b)
        c = str(b) + a[2:]

        return c
```
