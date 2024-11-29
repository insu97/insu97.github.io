---
layout : markdown
title : Discovering Statistics Using R - 003
tags : [Discovering_Statistics_Using_R, R]
toc : true
---
{% include markdown.html %}

# R의 기본적인 사용법

[자료 사이트](https://studysites.sagepub.com/dsur/study/scriptfi.htm)

- R의 명령은 객체와 함수라는 두 부분으로 구성된다.
> 객체 <- 함수  
> 객체가 함수로부터 생성된다.

## 작업환경 설정
> setwd('경로 입력')
```R
setwd('C:/github/R/Discovering-Statistics-Using-R')
getwd() # 현재 작업환경 보기
```

## c() : 연결 함수(concatenate function)
> 객체를 생성하고 주어진 여러 인수를 하나로 묶는 역할을 한다.  
```R
metallica <- c("Lars", "James", "Jason", "Kirk")
```

## 객체에서 값 제외하기
```R
> metallica != "Jason"
[1]  TRUE  TRUE FALSE  TRUE
> metallica[metallica != "Jason"]
[1] "Lars"  "James" "Kirk"
> metallica = metallica[metallica != "Jason"]
> metallica
[1] "Lars"  "James" "Kirk"
```

## 값 추가하기
```R
> metallica <- c(metallica, "Rob")
> metallica
[1] "Lars"  "James" "Kirk"  "Rob"  
```

## 파일 불러오기
```R
> myData <- read.delim("../data/data.dat")
> myData
     name birth_date job friends alcohol income neurotic
1     Ben   7/3/1977   1       5      10  20000       10
2  Martin  5/24/1969   1       2      15  40000       17
3    Andy  6/21/1973   1       0      20  35000       14
4    Paul  7/16/1970   1       4       5  22000       13
5  Graham 10/10/1949   1       1      30  50000       21
6  Carina  11/5/1983   2      10      25   5000        7
7  Karina  10/8/1987   2      12      20    100       13
8    Doug  1/23/1989   2      15      16   3000        9
9    Mark  5/20/1973   2      12      17  10000       14
10    Zoe 11/12/1984   2      17      18     10       13
```

## 패키지 설치 및 불러오기
```R
install.packages("DSUR") # DSUR 이라는 패키지 설치
library(DSUR)
```

### 패키지 안에 있는 함수 사용하기

```R
car::recode() # car 패키지에 있는 recode()함수를 사용
```

## 변수 생성
```R
> job<-c(1,1,1,1,1,2,2,2,2,2) # 기본적인 생성 방법
> job
 [1] 1 1 1 1 1 2 2 2 2 2
> job<-c(rep(1, 5),rep(2, 5)) # 반복 사용
> job
 [1] 1 1 1 1 1 2 2 2 2 2
> job<-factor(job, levels = c(1:2), labels = c("Lecturer", "Student")) # job 객체를 1 -> Lecturer, 2 -> Student 로 변환
> job
 [1] Lecturer Lecturer Lecturer Lecturer Lecturer Student  Student  Student  Student  Student
Levels: Lecturer Student
> job<-gl(2, 5, labels = c("Lecturer", "Student")) # gl : general level, gl(수준 수, 각 수준의 사례 수, 전체 사례 수, labels = c("이름표1", "이름표2",...))
> job
 [1] Lecturer Lecturer Lecturer Lecturer Lecturer Student  Student  Student  Student  Student
Levels: Lecturer Student
```

## 데이터프레임

### 생성

```R
> metallicaAges <- c(47,47,48,46)
> metallicaNames <- metallica
> metallica <- data.frame(Name=metallicaNames, Age = metallicaAges)
> metallica
   Name Age
1  Lars  47
2 James  47
3  Kirk  48
4   Rob  46
```

### 컬럼값 확인하기

```R
> metallica$Name
[1] Lars  James Kirk  Rob  
Levels: James Kirk Lars Rob
```

### 컬럼 추가하기
```R
> metallica$childAge<-c(12,12,4,6)
> metallica
   Name Age childAge
1  Lars  47       12
2 James  47       12
3  Kirk  48        4
4   Rob  46        6
```

### 컬럼명 확인하기
```R
> names(metallica)
[1] "Name"     "Age"      "childAge"
```

### 기본 변수들로 새 변수 계산하기
```R
> metallica$fatherhoodAge<-metallica$Age - metallica$childAge
> metallica
   Name Age childAge fatherhoodAge
1  Lars  47       12            35
2 James  47       12            35
3  Kirk  48        4            44
4   Rob  46        6            40
```

### 데이터프레임 특정 부분 선택

```R
> lecturerPersonality <- lecturerData[, c("friends", "alcohol", "neurotic")] # 일부 변수들만 보고 싶을 때
> lecturerPersonality
   friends alcohol neurotic
1        5      10       10
2        2      15       17
3        0      20       14
4        4       5       13
5        1      30       21
6       10      25        7
7       12      20       13
8       15      16        9
9       12      17       14
10      17      18       13
```

### 조건에 맞는 데이터 확인

```R
> lecturerOnly <- lecturerData[job=="Lecturer",]
> lecturerOnly
    name birth_date job friends alcohol income neurotic
1    Ben   7/3/1977   1       5      10  20000       10
2 Martin  5/24/1969   1       2      15  40000       17
3   Andy  6/21/1973   1       0      20  35000       14
4   Paul  7/16/1970   1       4       5  22000       13
5 Graham 10/10/1949   1       1      30  50000       21
```

### subset 활용

```R
> lecturerOnly <- subset(lecturerData, job=="Lecturer")
```
