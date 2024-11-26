---
layout : markdown
title : Python Regular Expression - 03
tags : [Regular_Expression, Python]
toc : true
---
{% include markdown.html %}

# 정규 표현식

## 더 많은 패턴 기능

### 메타 문자 더 보기

- \| : or 연산자 , Ex. Crow\|Servo 는 'Crow'나 'Servo'와 일치
- ^ : 줄의 시작 부분에 일치

```python
print(re.search('^From', 'From Here to Eternity')) # <re.Match object; span=(0, 4), match='From'>
print(re.search('^From', 'Reciting From Memory')) # None
```

- $ : 줄의 끝부분과 일치하는데, 문자열의 끝이나 줄 바꿈 문자 다음에 오는 모든 위치로 정의

```python
print(re.search('}$', '{block}')) # <re.Match object; span=(6, 7), match='}'>
print(re.search('}$', '{block} ')) # None
print(re.search('}$', '{block}\n')) # <re.Match object; span=(6, 7), match='}'>
```

- \\A : 문자열의 시작 부분에서만 일치 == ^
- \\Z : 문자열 끝부분에서만 일치
- \\b : 단어 경계, 단어의 시작이나 끝부분에서만 일치하는 폭이 없는 어서션 <-> \\B : 현재 위치가 단어 경계에 있지 않을 때만 일치

```python
p = re.compile(r'\bclass\b')
print(p.search('no class at all')) # <re.Match object; span=(3, 8), match='class'>
print(p.search('the declassified algorithm')) # None
print(p.search('one subclass is')) # None
```

### 그룹

- () : 일치하는 텍스트의 시작과 끝 인덱스도 포착

```python
p = re.compile('(a(b)c)d')
m = p.match('abcd')
m.group(0) # 'abcd'
m.group(1) # 'abc'
m.group(2) # 'b'
```

## 문자열 수정하기

- split() : RE가 일치하는 모든 곳에서 분할하여, 문자열을 리스트로 분할
> .split(string, maxsplit=0) : maxsplit 값이 0이 아니면 최대 maxsplit번 분할만 이루어지고, 나머지 문자열은 리스트의 마지막 요소로 반환

```python
p = re.compile(r'\W+')
p.split('This is a test, short and sweet, of split().')
# ['This', 'is', 'a', 'test', 'short', 'and', 'sweet', 'of', 'split', '']
p.split('This is a test, short and sweet, of split().', 3)
# ['This', 'is', 'a', 'test, short and sweet, of split().']
```

- sub() : RE가 일치하는 모든 부분 문자열을 찾고, 다른 문자열로 대체
> .sub(replacement, string, count=0)  
> string 에서 가장 왼쪽에 나타나는 겹쳐지지 않은 RE의 일치를 replacement로 치환  
> count는 치환될 패턴 일치의 최대 수

```python
p = re.compile('(blue|white|red)')
p.sub('colour', 'blue socks and red shoes') # 'colour socks and colour shoes'
p.sub('colour', 'blue socks and red shoes', count=1) # 'colour socks and red shoes'
```

- subn() : sub()와 같은 일을 하지만, 새로운 문자열과 치환 횟수를 반환

```python
p = re.compile('(blue|white|red)')
p.subn('colour', 'blue socks and red shoes') # ('colour socks and colour shoes', 2)
p.subn('colour', 'no colours at all') # ('no colours at all', 0)
```
