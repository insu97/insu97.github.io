---
layout : markdown
title : Python Class 정리
tags : [Python, Class]
toc : true
---
{% include markdown.html %}

# 객체 지향 프로그래밍(Object Oriented Programming)

> 프로그램 설계 방법론  
> 프로그램을 여러 개의 독립적인 단위인 '객체'라는 기본 단위로 나누고  
> '객체'들의 상호작용을 통해 프로그램을 설계하고 개발하는 방식

- 장점 : 코드 재사용 용이, 유지보수 용이, 대형 프로젝트 적합
- 단점 : 실행 속도가 상대적으로 느림, 객체가 많으면 프로그램 용량 커짐, 설계시 많은 시간 소요

# 클래스(Class) & 객체(Object) & 인스턴스

> [class](https://ko.wikipedia.org/wiki/%ED%81%B4%EB%9E%98%EC%8A%A4_(%EC%BB%B4%ED%93%A8%ED%84%B0_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)) : 객체 지향 프로그래밍(OOP)에서 특정 객체를 생성하기 위해 변수와 메소드를 정의하는 일종의 틀(template)이다.  
> [object](https://ko.wikipedia.org/wiki/%EA%B0%9D%EC%B2%B4_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99)) : 클래스에서 정의한 것을 토대로 메모리(실제 저장공간)에 할당된 것으로 프로그램에서 사용되는 데이터 또는 식별자에 의해 참조되는 공간을 의미  
> 객체지향 프로그래밍에서 객체는 클래스의 인스턴스이다.

# 메소드(method)

> 클래스가 가지고 있는 함수를 의미

```python
class animal():
    def __init__(self, name, voice):
        self.name = name
        self.voice = voice

    def say(self):
        print(self.name + "(이)가 " + self.voice + "하고 웁니다")

cat = animal('고양이', '냐옹')

cat.say() # 고양이(이)가 냐옹하고 웁니다
```
> animal : class  
> object : cat  
> cat은 animal의 인스턴스  
> method : animal class의 say함수
