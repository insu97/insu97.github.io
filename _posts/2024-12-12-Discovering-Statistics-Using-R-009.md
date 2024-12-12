---
layout : markdown
title : Discovering Statistics Using R - 009
tags : [Discovering_Statistics_Using_R, R]
toc : true
---

{% include markdown.html %}

# 두 평균의 비교

- 평균을 비교하는 방법
1. 서로 다른 여러 그룹에 각각 다른 실험적 조작을 가하는 것[=그룹간 설계, 독립설계]
2. 하나의 그룹에 서로 다른 시점에서 여러 실험적 조작을 가하는 것[=반복측정 설계]

## 차이 살펴보기

### Data

```R
> head(spiderLong, n= 3)
    Group Anxiety
1 Picture      30
2 Picture      35
3 Picture      45
```

```R
> head(spiderWide, n= 3)
  picture real
1      30   40
2      35   35
3      45   50
```

```R
ggplot() +
    stat_summary(data = spiderWide, aes(x = "Spider Picture", y = picture),
                 fun = mean, geom = "bar", fill = "white", colour = "black") +
    stat_summary(data = spiderWide, aes(x = "Spider Picture", y = picture),
                 fun.data = mean_cl_normal, geom = "pointrange") +
    stat_summary(data = spiderWide, aes(x = "Spider Real", y = real),
                 fun = mean, geom = "bar", fill = "white", colour = "black") +
    stat_summary(data = spiderWide, aes(x = "Spider Real", y = real),
                 fun.data = mean_cl_normal, geom = "pointrange") +
    labs(x = "Type of Stimulus", y = "Anxiety") +
    theme_minimal()
```

![image_01](/assets/images/Book/Discovering_Statistics_Using_R/Rplot_033.png){: style="width: 30vw; height: 20vw" }


### 평균계산

```R
> spiderWide$pMean<-(spiderWide$picture + spiderWide$real)/2 # 각 실험 참가자의 평균 계산
> head(spiderWide, n=3)
  picture real pMean
1      30   40  35.0
2      35   35  35.0
3      45   50  47.5
```

```R
> grandMean<-mean(c(spiderWide$picture, spiderWide$real)) # 총 평균 계산
> grandMean
[1] 43.5
```

### 조정인자 계산

```R
> spiderWide$adj<-grandMean-spiderWide$pMean # 조정인자 계산
> head(spiderWide, n=3)
  picture real pMean  adj
1      30   40  35.0  8.5
2      35   35  35.0  8.5
3      45   50  47.5 -4.0
```

### 조정인자로 각 값을 조정

```R
> spiderWide$picture_adj<-spiderWide$picture + spiderWide$adj
> spiderWide$real_adj<-spiderWide$real + spiderWide$adj
> head(spiderWide, n=3)
  picture real pMean  adj picture_adj real_adj
1      30   40  35.0  8.5        38.5     48.5
2      35   35  35.0  8.5        43.5     43.5
3      45   50  47.5 -4.0        41.0     46.0
```

```R
> spiderWide$pMean2<-(spiderWide$picture_adj + spiderWide$real_adj)/2 # pMean2값이 전부 같은데 이는 평균의 개체 간 변동이 사라졌다는 증거
> head(spiderWide, n=3)
  picture real pMean  adj picture_adj real_adj pMean2
1      30   40  35.0  8.5        38.5     48.5   43.5
2      35   35  35.0  8.5        43.5     43.5   43.5
3      45   50  47.5 -4.0        41.0     46.0   43.5
```

![image_02](/assets/images/Book/Discovering_Statistics_Using_R/Rplot_034.png){: style="width: 30vw; height: 20vw" }

> 맨 처음 그래프와 비교
1. 두 조건의 평균이 바뀌지 않았다.
2. 오차 막대들은 이전보다 짧아졌으며, 겹치는 현상이 없어졌다.

## T 검정

### 일반선형모형으로서의 t검정

```R
> t.test.GLM<-lm(Anxiety ~ Group, data = spiderLong)
> summary(t.test.GLM)

Call:
lm(formula = Anxiety ~ Group, data = spiderLong)

Residuals:
   Min     1Q Median     3Q    Max
 -17.0   -8.5    1.5    8.0   18.0

Coefficients:
                 Estimate Std. Error t value Pr(>|t|)    
(Intercept)        40.000      2.944  13.587 3.53e-12 ***
GroupReal Spider    7.000      4.163   1.681    0.107    
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 10.2 on 22 degrees of freedom
Multiple R-squared:  0.1139,	Adjusted R-squared:  0.07359
F-statistic: 2.827 on 1 and 22 DF,  p-value: 0.1068
```

> 상수($$b_0$$)값이 평균과 같은 40이라는 점  
> 회귀계수($$b_1$$)의 값이 두 그룹 평균의 차이(47 - 40 = 7)랑 같다.  
> $$b_1$$이 0과 유의하게 다른지를 검사한 결과인 t 통계량을 확인해보면 유의하지 않다.  
> 따라서, $$b_1$$(두 그룹 평균의 차이)은 0과 유의하게 다르지 않다.

### 독립 t검정

- 절차
1. 자료를 입력한다.
2. 자료를 탐색한다.[그래프 -> 기술통계량 확인 -> 분포의 가정들도 점검]
3. 검정통계량을 계산한다.
4. 효과크기를 계산한다.

```R
> by(spiderLong$Anxiety, spiderLong$Group, stat.desc, basic = FALSE, norm = TRUE) # 기술 통계량 확인
spiderLong$Group: Picture
      median         mean      SE.mean CI.mean.0.95          var      std.dev     coef.var     skewness     skew.2SE
  40.0000000   40.0000000    2.6827168    5.9046200   86.3636364    9.2932038    0.2323301    0.0000000    0.0000000
    kurtosis     kurt.2SE   normtest.W   normtest.p
  -1.3939289   -0.5656047    0.9650165    0.8522870
------------------------------------------------------------------------------------------
spiderLong$Group: Real Spider
       median          mean       SE.mean  CI.mean.0.95           var       std.dev      coef.var      skewness
 50.000000000  47.000000000   3.183765638   7.007420922 121.636363636  11.028887688   0.234657185  -0.005590699
     skew.2SE      kurtosis      kurt.2SE    normtest.W    normtest.p
 -0.004386224  -1.459758279  -0.592315868   0.948872904   0.620569431
```

> 정규성 결과는 둘 다 유의하지 않다.

```R
> ind.t.test<-t.test(Anxiety ~ Group, data = spiderLong)
> ind.t.test

	Welch Two Sample t-test

data:  Anxiety by Group
t = -1.6813, df = 21.385, p-value = 0.1072
alternative hypothesis: true difference in means between group Picture and group Real Spider is not equal to 0
95 percent confidence interval:
 -15.648641   1.648641
sample estimates:
    mean in group Picture mean in group Real Spider
                       40                        47
```

> p값이 0.05보다 크므로 그룹 평균들이 다르지 않다는 귀무가설을 기각할 수 없다.  
> 신뢰구간의 하계와 상계는 95%의 경우에서 평균들의 진짜 차이가 포함되리라고 기대하는 차이 범위를 정의

#### 독립 평균들의 강건한 비교 방법

```R
> yuen(spiderWide$real, spiderWide$picture, tr=.2, alpha=.05) # tr : 평균을 깎는(절사: trimming) 비율, alpha : 검정의 유의 수준(알파)을 설정
> yuenbt(spiderWide$real, spiderWide$picture, tr=.2, alpha=.05, nboot = 2000) # nboot : 사용할 부트스트랩 표본들의 개수
> pb2gen(spiderWide$real, spiderWide$picture, alpha=.05, nboot=2000, est=mom) # 부트스트랩과 M 추정량(절사평균이 아니라)으로 검정을 수행
```

#### 효과크기 계산

```R
> t<-ind.t.test$statistic[[1]] # t 검정의 t값
> t
[1] 1.681346
> df<-ind.t.test$parameter[[1]] # 자유도
> df
[1] 21.38502
> r <- sqrt(t^2/(t^2+df)) # 효과크기 계산
> round(r, 3)
[1] 0.342
```

> r = 0.342 > 0.3 --> 중간 효과

#### 결과

```
평균적으로 참가자들은 거미 사진을 보았을 때 (M = 40, SE = 2.68) 보다 진짜 거미를 보았을 때 더 많이 불안해했다.(M=47, SE=3.18).
그 차이는 유의하지 않다(t(21.39) = -1.68, p > 0.05).
그렇긴 하지만, 그 차이는 중간 크기의 효과를 대표한다(r = 0.34)
```

### 종속 t검정

- 통계량 확인

```R
> stat.desc(spiderWide, basic = FALSE, norm = TRUE) # 기술 통계량 확인
                picture          real
median       40.0000000  50.000000000
mean         40.0000000  47.000000000
SE.mean       2.6827168   3.183765638
CI.mean.0.95  5.9046200   7.007420922
var          86.3636364 121.636363636
std.dev       9.2932038  11.028887688
coef.var      0.2323301   0.234657185
skewness      0.0000000  -0.005590699
skew.2SE      0.0000000  -0.004386224
kurtosis     -1.3939289  -1.459758279
kurt.2SE     -0.5656047  -0.592315868
normtest.W    0.9650165   0.948872904
normtest.p    0.8522870   0.620569431
```

- t 검정

```R
> dep.t.test<-t.test(spiderWide$real, spiderWide$picture, paired = TRUE) # paired = TRUE : 주어진 점수들이 종속적
> dep.t.test

	Paired t-test

data:  spiderWide$real and spiderWide$picture
t = 2.4725, df = 11, p-value = 0.03098
alternative hypothesis: true mean difference is not equal to 0
95 percent confidence interval:
  0.7687815 13.2312185
sample estimates:
mean difference
              7
```

> t = 2.47, df = N - 1 = 11  
> 거미 공포증 자료의 경우 그 확률은 아주 낮다(p = 0.031) -> 즉, 귀무가설이 참일 때 t가 2.47일 가능성은 3.1%밖에 되지 않는다.  
> t값은 유의하며, t값이 양수라는 뜻은 첫 조건(real)의 평균이 둘째 조건(picture)의 평균보다 크다는 뜻  
> 따라서 거미 사진보다 진짜 거미가 참가자들을 더 불안하게 했다고 말할 수 있다.  
> 결론 : 사진을 제시했을 때보다 진짜 거미를 제시했을 때 거미 공포증 환자들이 유의하게 더 높은 수준의 불안을 보였다.

- 종속평균들을 비교하는 강건한 방법

```R
> yuend(spiderWide$real, spiderWide$picture, tr=.2, alpha=.05)
> ydbt(spiderWide$real, spiderWide$picture, tr=.2, alpha=.05, nboot = 2000)
> bootdpci(spiderWide$real, spiderWide$picture, est=tmean, nboot=2000)
```

- 효과크기 계산

```R
> t<-dep.t.test$statistic[[1]]
> t
[1] 2.472533
> df<-dep.t.test$parameter[[1]]
> df
[1] 11
> r <- sqrt(t^2/(t^2+df))
> round(r, 3)
[1] 0.598
```

- 보고

```
> 평균적으로 참가자들은 거미 사진을 보았을 때보다 진짜 거미를 보았을 때 유의하게 더 많이 불안해했다.
```
