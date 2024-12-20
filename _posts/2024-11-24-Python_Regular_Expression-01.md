---
layout : markdown
title : Python Regular Expression - 01
tags : [Regular_Expression, Python]
toc : true
---
{% include markdown.html %}

# 파이썬 정규표현식

> 정규식(RE, regexes 또는 regex 패턴)  
> [참고 사이트](https://docs.python.org/ko/3/howto/regex.html)

## 단순한 패턴

### 문자 일치

1. [ 와 ]
> EX. [abc] : a,b 또는 c 문자와 일치 == [a-c]  
> EX. [a-z] : 소문자들만 일치
2. ^ : 여집합
> EX. [^5] : 5를 제외한 모든 문자와 일치
3. \ : 백 슬래시 다음에 다양한 특수 시퀀스를 알리는 다양한 문자가 따라올 수 있다.
> Ex. [\\] : \ 일치  
    1. \d : 모든 십진 숫자와 일치 == [0-9]
    2. \D : 모든 비 숫자 문자와 일치 == [^0-9]
    3. \s : 모든 공백 문자와 일치 == [ \t\n\r\f\v]
    4. \S : 모든 비 공백 문자와 일치 == [^ \t\n\r\f\v]
    5. \w : 모든 영숫자와 일치 == [a-zA-Z0-9_]
    6. \W : 모든 비 영숫자와 일치 == [^a-zA-Z0-9_]
4.. : "모든 문자"와 일치시키려고 할 때 자주 사용

### 반복하기

- \* : 리터럴 문자 '*'와 일치하지 않는다. 대신 이전 문자를 정확히 한 번이 아닌 0번 이상 일치시킬 수 있도록 지정
> Ex. [ca*t] : 'ct' (0개의 a문자), 'cat'(1개의 a문자), 'caaat'(3개의 a문자) 등과 일치  
> \* 은 탐욕적이다 -> RE를 반복할 때, 일치 엔진은 가능한 한 여러 번 반복하려고 시도  
> Ex. [a[bcd]*b]이 정규식을 'abcbd'와 일치시킨다고 생각

| 단계 | 일치된 것 | 설명                                          |
|----|-------|---------------------------------------------|
| 1  | a     | RE의 a가 일치합니다.                               |
| 2  | abcbd | 엔진은 가능한 한 길게 [bcd]*와 일치시키려고 문자열의 끝까지 갑니다.   |
| 3  | 실패    | 엔진은 b를 일치하려고 시도하지만, 현재 위치가 문자열의 끝이므로 실패합니다. |
| 4  | abcb  | 물러서서, [bcd]*가 하나 적은 문자와 일치합니다.              |
| 5  | 실패    | b를 다시 시도하지만, 현재 위치는 'd' 인 마지막 문자에 있습니다.     |
| 6  | abc   | 다시 물러서서, [bcd]*가 bc하고 만 일치합니다.              |
| 6  | abcb  | b를 다시 시도합니다. 이번에는 현재 위치의 문자가 'b'이므로 성공합니다.  |

- \+ : 하나 이상과 일치
- ? : 한 번 또는 0번 일치
> Ex. [home-?brew]인 정규표현식은 'homebrew' or 'home-brew'와 일치
- {m, n} : m, n은 십진수 정수, 최소 m번, 최대 n번의 반복이 있어야 함을 의미
> [a/{1,3}]인 정규표현식은 'a/b', 'a//b', 'a///b'와 일치  
> {m}인 경우 이전 항목과 정확히 m번 일치
