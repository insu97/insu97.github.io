---
layout : markdown
title : Machine Learning At Work - 09
tags : [Machine_Learning_At_Work, Book]
toc : true
---
{% include markdown.html %}

# 킥스타터 분석하기 : 머신러닝을 사용하지 않는 선택지


> 가공하지 않은 데이터를 직접 보는 것은 분석 효율에 큰 영향을 준다.  
> 머신러닝을 이용하더라도 데이터의 전체적인 형태를 파악해두지 않으면 결과에 이상이 있을 때 그 원인을 깨닫기 어렵다.  
> 반드시 가공되지 않은 데이터를 직접 살펴보도록 하자.

## 데이터 살펴보기

> 모금액(pledged)과 목표액(goal) 정보를 이용해 달성률(pledged/goal) 확인

![달성률](/assets/images/Book/Machine_Learning_At_Work/달성률.jpg){: width="500vw" height="auto"}

> 100% 인 부분에서 특이점이 발생하는 것 처럼 보인다.  
> 상태(state)를 기준으로 필터링한 뒤 비교해보자.

![달성률(LiveProject)](/assets/images/Book/Machine_Learning_At_Work/달성률(LiveProject).jpg){: width="500vw" height="auto"}

> state가 live이면서 마감에 도달하지 않은 프로젝트에는 이 특이점이 없는 것 같다.  
> 즉 이 특이점은 프로젝트 종료 직전에 생겨난 것이라는 사실을 알 수 있다.

- why? 킥스타터는 종료 시점에 임박한 프로젝트를 최상위 페이지에 소개한다.
- why? 거의 목표에 달성했을 때 프로젝트 제안자가 더 열심히 홍보한다.

## 피벗 테이블로 다양하게 파악하기

> 달성률을 기준으로 파악하기  
> state가 live인 데이터는 제외하고 종료된 프로젝트만을 대상으로 진행  
> 통화 단위는 USD로 모금한 프로젝트로 대상을 좁힌다.

![피벗테이블_01](/assets/images/Book/Machine_Learning_At_Work/피벗테이블_01.png){: width="1000vw" height="auto"}

> 달성률에 따라 프로젝트를 크게 3가지로 분류 가능  
1. 달성률 50% 미만	：　전형적인 실패한 프로젝트
2. 달성률 50~200%	：　종료 즈음에 후원이 집중된 프로젝트
3. 달성률 200% 초과	：　크게 성공한 프로젝트

![피벗테이블_02](/assets/images/Book/Machine_Learning_At_Work/피벗테이블_02.png){: width="1000vw" height="auto"}

> 전형적인 실패한 프로젝트  
> 달성률 10% 미만인 프로젝트가 54% 차지  
> 프로젝트가 성공하려면 후원자 100명을 넘길 방법을 고민해야 함

## 보고서 작성하기

> 분석 절차를 보여주면서 어떤 방법을 사용했는지  
> 분석 결과와 그래프 그리고 발견한 사실 및 정리 후 해결 방안까지 정리 후 작성하기

> [보고서 예시](https://github.com/moseskim/ml-at-work/tree/master/chap09)
