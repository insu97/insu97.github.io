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

# 생성자(constructor)

> 클래스로부터 인스턴스가 생성될 때 자동으로 실행되는 함수

# 상속(inheritance)

> 새로운 클래스를 만들 때 기존에 있던 클래스의 기능을 물려 받을 수 있는 역할

## 상속 선언

> 상속 선언을 할 시 자식 클래스에서 부모 클래스의 속성과 메소드는 따로 기재하지 않아도 자동으로 포함

## 메소드 오버라이딩

> 부모 클래스의 메소드를 자식 클래스에서 재정의 하는 것  
> 일반적인 메소드 오버라이딩 : 자식 클래스에서 생성된 객체의 메소드를 부르면 부모 클래스의 메소드는 무시  
> 부모 메소드 호출 : 부모 클래스의 메소드도 수행하고 자식 클래스의 메소드도 함께 수행하고 싶을 때 사용

# 코드로 한번에 보는 정리

```python
class animal():
    def __init__(self, name, voice):
        self.name = name
        self.voice = voice

    def say(self):
        print(self.name + "(이)가 " + self.voice + "하고 웁니다")

class cry_01(animal):
    def say(self):
        print("아직 울지 못해요..")

class cry_02(animal):
    def say(self):
        super().say()
        print("신기하네요")

cat = animal('고양이', '냐옹')

cat.say() # 고양이(이)가 냐옹하고 웁니다

baby_cat = cry_01('고양이', '냐옹')

baby_cat.say() # 아직 울지 못해요..

cat = cry_02('고양이', '먀')

cat.say()
# 고양이(이)가 먀하고 웁니다
# 신기하네요
```
> animal : class  
> object : cat  
> cat은 animal의 인스턴스  
> method : animal class의 say함수  
> 생성자 : __init__
> 상속 선언 : cry_01(animal)  
> 일반적인 메소드 오버라이딩 : cry_01 클래스 안에 say함수 재정의  
> 부모 메소드 호출 : cry_02 클래스 안에 super().say() 호출
