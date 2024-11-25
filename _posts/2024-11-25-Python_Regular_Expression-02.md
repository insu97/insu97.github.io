---
layout : markdown
title : Python Regular Expression - 02
tags : [Regular_Expression, Python]
toc : true
---
{% include markdown.html %}

# 파이썬 정규표현식

## 정규식 사용하기

```python
import re

p = re.compile('ab*')
```

## 일치 수행하기

### match() : 문자열의 시작 부분에서 RE가 일치하는지 판단합니다.

```python
p = re.compile('[a-z]+')
m = p.match('tempo') # <re.Match object; span=(0, 5), match='tempo'>
```

- group() : RE와 일치하는 문자열을 반환합니다
- start() : 일치의 시작 위치를 반환
- end() : 일치의 끝 위치를 반환합니다
- span() : 일치의(시작, 끝) 위치를 포함하는 튜플을 반환합니다.

```python
m.group() # 'tempo'
m.start(), m.end() # (0, 5)
m.span() # (0, 5)
```

### search() : 이 RE가 일치하는 위치를 찾으면서, 문자열을 훑습니다.

```python
print(p.match('::: message')) # None
m = p.search('::: message') # <re.Match object; span=(4, 11), match='message'>
m.group() # 'message'
m.span() # (4, 11)
```

### findall() : RE가 일치하는 모든 부분 문자열을 찾아 리스트로 반환합니다.

```python
p = re.compile(r'\d+')
p.findall('12 drummers drumming, 11 pipers piping, 10 lords a-leaping') # ['12', '11', '10']
```
### finditer() : RE가 일치하는 모든 부분 문자열을 찾아 이터레이터로 반환합니다.

```python
iterator = p.finditer('12 drummers drumming, 11 pipers piping, 10 lords a-leaping')
for match in iterator:
    print(match.span())
# (0, 2)
# (22, 24)
# (40, 42)
```

## 컴파일 플래그

> 그냥 읽어보기

| 플래그                 | 의미                                                            |
|---------------------|---------------------------------------------------------------|
| ASCII, A            | \w, \b, \s 및 \d와 같은 여러 이스케이프가 해당 속성이 있는 ASCII 문자에만 일치하도록 합니다. |
| DOTALL, S           | .가 개행 문자를 포함한 모든 문자와 일치하도록 합니다.                               |
| IGNORECASE, I       | 대소 문자 구분 없는 일치를 수행합니다.                                        |
| LOCALE, L           | 로케일을 고려하는 일치를 수행합니다.                                          |
| MULTILINE, M        | 다중 행 일치, ^와 $에 영향을 줍니다.                                       |
| VERBOSE, X (‘확장’ 용) | 더 명확하고 이해하기 쉽게 정리될 수 있는 상세한 RE를 활성화합니다.                       |
