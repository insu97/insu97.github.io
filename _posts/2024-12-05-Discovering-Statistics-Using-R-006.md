---
layout : markdown
title : Discovering Statistics Using R - 006
tags : [Discovering_Statistics_Using_R, R]
toc : true
---

{% include markdown.html %}

# 상관

## 관계를 측정하는 방법

> 두 변수가 어떤 식으로든 관계가 있는지 파악하는 가장 간단한 방법은 두 변수의 분산에 공통점이 있는지를 보는 것  

### 공분산

- 공분산 : $$ cov(x, y) = \frac{\sum(x_i - \bar{x})(y_i - \bar{y})}{N - 1} $$  
> 공분산이 양수라는 것은 한 변수가 평균에서 이탈하면 다른 변수도 같은 방향으로 이탈함을 뜻한다.  
> 측정의 축척에 의존한다는 것 -> 서로 다른 단위로 측정한 자료 집합들의 공분산들이 주어졌을 때 둘 중 어떤 것이 더 큰지 비교하는 것은 무의미

### 표준화

- 표준화 : 측정 척도 의존성 문제를 극복하려면 공분산을 어떤 표준 단위로 변환하는 과정
- 표준화된 공분사(= 상관계수) : $$ r = \frac{COV_{xy}}{S_{x}S_{y}} $$ [ = 피어슨 상관계수 ]
> $$ \pm 0.1 $$ : 작은 효과  
> $$ \pm 0.3 $$ : 중간 효과  
> $$ \pm 0.5 $$ : 큰 효과

### 상관계수의 유의성

- 유의성 검정하는 방법 -> z-score 사용

```
기존 z-score는 만일 자료가 정규분포라면 주어진 z 값이 나올 확률과 비교하는 식으로 활용
그런데 피어슨의 r에는 그것이 정규분포가 아닌 표집분포를 따른다는 문제점이 있다.
아래의 공식을 사용하면(=피셔) r의 표집분포가 실제로 정규분포가 되게 만들 수 있다.
```

> $$ z_r = \frac{1}{2}log_{e}\frac{1+r}{1-r} $$  
> $$ SE_{z_r} = \frac{1}{\sqrt{N-3}} $$

- Ex. r = .87 -> $$ z_r $$ = 1.33, SE = .71

> 여기서 우리가 알 고 싶은 것은 상관계수가 0과 다른지를 확인  
> $$ z = \frac{z_r}{SE_{z_r}} $$

- Ex. z = 1.33 / 0.71 = 1.87 -> 이 z 값으로 한쪽꼬리 확률은 0.307 -> 양쪽꼬리 확률 = 0.0307 * 2 = 0.0614
- 따라서 한쪽꼬리에서는 이 상관관계가 유의하고(p < 0.05), 양쪼꼬리에서는 유의하지 않다.

> 하지만 일반적으로 z-score로 검증하기보다는 자유도가 N - 2인 t통계량을 이용해서 검증하는 것이 일반적이다.  
> $$ t_r = \frac{r\sqrt{N-2}}{\sqrt{1-r^2}} $$

### r의 신뢰구간

- Ex. 95% 신뢰구간을 구하는 공식
> 신뢰구간의 하계 = $$ \bar{X} - (1.96 * SE) $$  
> 신뢰구간의 상계 = $$ \bar{X} + (1.96 * SE) $$

- 변환된 상관계수의 경우
> $$ 신뢰구간의 하계 = z_r - (1.96 * SE_{z_{r}}) $$  
> $$ 신뢰구간의 상계 = z_r + (1.96 * SE_{z_{r}}) $$  
-> 하계 : 1.33 - (1.96 * .71) = -0.062, 상계 : 1.33 + (1.96 * .71) = 2.72  
-> 그런데 이 값들은 z-score의 축척을 따르므로, 원래의 상관계수 단위로 변환할 필요가 있다.  
-> $$ r = \frac{e^{2z_r} - 1}{e^{2z_r} + 1} $$ -> r의 신뢰구간의 상계는 0.991, 하계는 -0.062

### 해석에 관한 경고

> 상관계수를 해석할 때는, 상관계수가 인과관계의 방향을 말해주지는 않는다는 점을 주의해야 한다.

1. 제 3변수 문제 : 결과에 영향을 미치는 다른 어떤 변수가 있을 수 있으므로 두 변수 사이의 인과관계를 가정할 수 없다.
2. 인과관계의 방향 : 상관관계가 A -> B or B - A 쪽으로 방향을 말해주지는 않는다.

## 상관분석을 위한 R

```R
# cor(x,y, use = "everything", method = "correlation type")
# use : 특정한 결측값 처리 방식을 지정
#  > everything : NA 출력, all.obs : 결측값이 존재하면 오류 메시지 발생,
#  > complete.obs : 모든 변수가 완전히 갖추어진 사례들로만 상관계수를 계산[= 목록별 결측값 제외],
#  > pairwise.complete.obs : 모든 변수 쌍에서 두 변수 모두 관측값이 존재하는 사례들에 대해 두 변수의 상관계수를 계산[= 쌍별 결측값 제외]
# method : 상관계수의 종류에 해당하는 문자열 지정[Ex. pearson, spearman, kendall]
> cor(examData$Exam, examData$Anxiety, use = "complete.obs", method = 'pearson') # -0.4409934
```

```R
> cor.test(examData$Exam, examData$Anxiety, alternative = 'less', method = 'pearson', conf.level = 0.99)
# alternative : two.sided : 양쪽꼬리 검정, 'less' : 음의 상관을 예측, 'greater' : 양의 상관을 예측
# conf.level : 상관계수의 신뢰구간 너비 지정
# --- 결과
# Pearson's product-moment correlation

# data:  examData$Exam and examData$Anxiety
# t = -4.938, df = 101, p-value = 0.000001564
# alternative hypothesis: true correlation is less than 0
# 99 percent confidence interval:
# -1.0000000 -0.2362782
# sample estimates:
#      cor
# -0.4409934
```

### 피어슨 상관계수

- 피어슨 r 의 가정들
> 피어슨 상관계수의 유일한 요구조건은 자료가 구간자료이어야 한다는 것.  
> 검정통계량이 유효하려면 표집분포가 정규분포이어야 함

```R
> cor(examData2)
              Exam    Anxiety     Revise
Exam     1.0000000 -0.4409934  0.3967207
Anxiety -0.4409934  1.0000000 -0.7092493
Revise   0.3967207 -0.7092493  1.0000000
```

### 결정계수

- $$ R^2 $$
> 한 변수의 변이성 또는 변동을 다른 변수가 어느 정도나 공유하는지 말해주는 측도  
> EX. 상관계수 값 : -0.4410 -> $$ R^2 = 0.194 $$ -> 두 변수의 변동 관련성은 19.4% 뿐, 나머지 80.6%는 다른 어떤 변수들과 관련되어 있다.
```R
> cor(examData2)^2
             Exam   Anxiety    Revise
Exam    1.0000000 0.1944752 0.1573873
Anxiety 0.1944752 1.0000000 0.5030345
Revise  0.1573873 0.5030345 1.0000000
```

### 스피어먼 상관계수

> 스피어먼 상관계수는 비모수적 통계량이다.  
> 따라서 정규분포가 아닌 자료 등 모수적 자료의 가정들을 위반하는 자료에 사용할 수 있다.

```R
> cor.test(liarData$Position, liarData$Creativity, alternative = "less", method = "spearman")

# Spearman's rank correlation rho

# data:  liarData$Position and liarData$Creativity
# S = 71948, p-value = 0.0008602
# alternative hypothesis: true rho is less than 0
# sample estimates:
#      rho
# -0.3732184
```
> 유의확률 < 0.05 , 상관계수의 절댓값이 꽤 크기 때문에 두 변수는 유의한 관계가 존재한다고 결론을 내릴 수 있다.

### 켄달의 타우(비모수적 상관계수)

> 자료 집합의 크기가 작고 동순위 점수들이 많을 때는 스피어먼 상관계수 대신 이 상관계수를 사용한다.

```R
> cor.test(liarData$Position, liarData$Creativity, alternative = "less", method = "kendal")

# 	Kendall's rank correlation tau

# data:  liarData$Position and liarData$Creativity
# z = -3.2252, p-value = 0.0006294
# alternative hypothesis: true tau is less than 0
# sample estimates:
#        tau
# -0.3002413
```

### 부트스트랩 방법을 적용한 상관분석

> 피어슨의 r에 깔린 가정들을 만족하지 않는 자료를 다루는 또 다른 방법

```R
> bootTau<-function(liarData,i)cor(liarData$Position[i], liarData$Creativity[i], use = "complete.obs", method = "kendall") # 함수 작성
> boot_kendall<-boot(liarData, bootTau, 2000) # boot(데이터, 함수, 반복 횟수)
> boot_kendall

ORDINARY NONPARAMETRIC BOOTSTRAP


Call:
boot(data = liarData, statistic = bootTau, R = 2000)


Bootstrap Statistics :
      original        bias    std. error
t1* -0.3002413 -0.0004526635  0.09607203
```

- 95% 신뢰구간 구하기

```R
> boot.ci(boot_kendall, 0.95)

BOOTSTRAP CONFIDENCE INTERVAL CALCULATIONS
Based on 2000 bootstrap replicates

CALL :
boot.ci(boot.out = boot_kendall)

Intervals :
Level      Normal              Basic         
95%   (-0.4881, -0.1115 )   (-0.4940, -0.1153 )  

Level     Percentile            BCa          
95%   (-0.4852, -0.1065 )   (-0.4763, -0.0927 )  
Calculations and Intervals on Original Scale
```

### 이연 상관과 점이연 상관

- 이연 상관 : 범주들 사이에 연속체가 있는 경우 -> 시험 통과 여부 [ 100점으로 통과, 75점으로 가까스로 통과 ]
- 점이연 상관 : 범주들 사이에 연속체가 전혀 없는 경우 -> 사망 여부

```R
> catData
   time gender recode
1    41      1      0
2    40      0      1
3    40      1      0
4    38      1      0

# 점이연
> cor.test(catData$time, catData$gender)

# 	Pearson's product-moment correlation

# data:  catData$time and catData$gender
# t = 3.1138, df = 58, p-value = 0.002868
# alternative hypothesis: true correlation is not equal to 0
# 95 percent confidence interval:
#  0.137769 0.576936
# sample estimates:
#       cor
# 0.3784542
```

> 이연, 점이연 상관에서 상관계수의 부호는 전적으로 어떤 범주에 어떤 코드를 배정하는가에 달려 있을 뿐이므로, 상관의 방향에 관한 모든 정보는 무시해야 한다.  
> $$ R^2 = 0.143 $$ -> 고양이의 성별이 고양이가 집 밖에서 보낸 시간의 변동의 14.3%를 설명한다는 결론

- 점이연 -> 이연 상관계수로 변경
> $$ r_b = \frac{r_{pb}\sqrt{pq}}{y} $$  
> $$ r_b $$ : 이연 상관계수  
> $$ r_{pb} $$ : 점이연 상관계수  
> p : 가장 큰 범주에 속하는 사례들의 비율  
> q : 가장 작은 범주에 속하는 사례들의 비율

```R
> catFrequencies<-table(catData$gender)
> prop.table(catFrequencies)

        0         1
0.5333333 0.4666667
# 수고양이(1)의 비율 : 0.467, 암고양이(0)의 비율 : 0.533
# 적은 비율인 수고양이 값을 q, 암고양이 비율을 p
> polyserial(catData$time, catData$gender) # 이연 상관계수
[1] 0.4749256
```

- 이연 상관계수의 유의성을 판정하려면 표준오차를 구해야 함

> $$ SE_{r_b} = \frac{\sqrt{pq}}{y\sqrt{N}} $$  
> Ex. $$ SE_{r_b} $$ = 0.162 -> $$ z_{r_b} = \frac{r_b - \bar{r_b}}{SE_{r_b}} $$  
> 모집단의 평균이 0이라고 가정(귀무가설)했으므로 -> $$ \bar{r_b} = 0 $$ -> $$ z_{r_b} = 2.93 $$  
> 한쪽꼬리 확률 : 0.00169 -> 양쪽꼬리 확률 : 0.00338 < 0.01 이므로 유의

## 편상관

- 편상관 : 다른 변수의 효과를 고정한 상태에서의 두 변수의 상관

```R
> pc<-pcor(c("Exam", "Anxiety", "Revise"), var(examData2)) # pcor(c("변수1", "변수2", "제어 변수1", "제어 변수2", ...), var(데이터프레임))
> pc # Exam 과 Anxiety 두 변수의 편상관계수
[1] -0.2466658
```
> Exam : 시험 점수, Anxiety : 시험 불안, Revise : 복습 시간  

```R
> pc^2 # 결정계수
[1] 0.06084403
```

- 유의성 판정

```R
> pcor.test(pc, 1, 103) # pcor로 만든 객체, 제어 변수의 개수, 표본 크기
$tval
[1] -2.545307

$df
[1] 100

$pvalue
[1] 0.01244581
```

> P < 0.05 로 유의하지만, $$ R^2 = 0.06 $$이므로 시험 불안이 시험 성적 변동의 6%만 공유한다는 뜻  
