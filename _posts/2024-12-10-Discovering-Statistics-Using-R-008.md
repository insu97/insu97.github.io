---
layout : markdown
title : Discovering Statistics Using R - 008
tags : [Discovering_Statistics_Using_R, R]
toc : true
---

{% include markdown.html %}

# 로지스틱 회귀

> 로지스틱 회귀란 결과변수가 범주형변수이고 예측변수들이 연속변수 또는 범주형변수인 다중회귀이다.  
> 로지스틱 회귀에서는 Y의 값이 이미 알고 있는 $$X_1$$의 값(또는 X의 값들)일 확률을 예측한다.

- 로지스틱 회귀 방정식
> $$ P(Y) = \frac{1}{1 + e^{-(b_0+b_1X_{1i}+b_2X_{2i}+...+b_nX_{ni})}}$$

## 모형의 평가

1. 로그 가능도 통계량
> 로그 가능도는 예측값들과 실체 관측값들에 관한 확률들의 합이다.  
> 로그 가능도 통계량의 값이 크다는 것은 설명되지 않은 관측이 많이 남아 있다는 뜻으로, 그런 경우 해당 통계적 모형은 자료에 적합하지 않다.
2. 이탈도(deviance) 통계량
> 이탈도는 카이제곱 분포를 따르기 때문에 로그 가능도를 그냥 사용하는 것보다 사용하기 편하다. -> 유의성을 계산하기가 쉽다.
3. $$ R과 R^2$$
> 모형이 자료에 얼마나 잘 들어맞는지를 측정하는데 사용하는 측도  
> R-statistic : 결과변수와 각 예측변수 사이의 편상관계수로, 값의 범위는 -1부터 1까지
4. z 통계량
> 정규분포를 따르며, 주어진 예측변수의 b 계수가 0과 유의하게 다른지의 여부를 나타낸다.
5. 승산비(odds ratio; 오즈비)
> 예측변수의 1단위 변화에 따른 승산의 변화 비율

## 로지스틱 회귀 방법

### 강제 도입법

> 예측변수들을 모두 한꺼번에 회귀모형에 포함하고 각 예측변수의 매개변수들을 추정하는 방법

### 단계적 방법

> (전진, 후진, 또는 둘의 조합)을 선택해야 함.  
> 매개변수의 변화가 있을 때 마다 AIC, BIC 중 선택한 기준을 이용해서 개선되었는지 확인

## 가정

1. 선형성 : 임의의 연속 예측변수들과 결과변수의 로짓의 관계가 선형이라는 가정
2. 오차의 독립성 : 자료의 사례들 사이에 관계가 없어야 함
3. 다중공선성의 부재 : 예측변수들 사이의 상관관계가 너무 크면 안된다.

## R을 이용한 로지스틱 회귀

### 이항 로지스틱 회귀

#### Intervention

- 결과변수 : Cured[치료됨 or 치료되지 않음]
- 예측변수
1. Intervention : 개입했음, 처치가 없었음
2. Duration : 환자가 처치를 받기 전까지 문제를 겪은 기간, 단위는 일

```R
> head(eelData, n = 5)
      Cured Intervention Duration
1 Not Cured No Treatment        7
2 Not Cured No Treatment        7
3 Not Cured No Treatment        6
4     Cured No Treatment        8
5     Cured Intervention        7
```

- 변수를 요인으로 변경 후 기저를 부정인 값으로 지정

```R
> eelData$Cured <- as.factor(eelData$Cured)
> eelData$Intervention <- as.factor(eelData$Intervention)
> eelData$Cured<-relevel(eelData$Cured, "Not Cured")
> eelData$Intervention<-relevel(eelData$Intervention, "No Treatment")
```

- glm : generalized linear model
- glm(결과변수 ~ 예측변수(들), data = 데이터프레임, family = 분포의 종류, na.action = 결측값처리방식)
- family : binomial() -> 로지스틱 회귀는 이항분포에 기초하므로 이렇게 지정해야 함

```R
> eelModel.1 <- glm(Cured ~ Intervention, data = eelData, family = binomial())
```

- 모형의 전반적인 적합도는 이탈도로 평가. [ 이 값이 클수록 통계적 모형으로서의 이 회귀모형은 자료에 잘 적합되지 않는 것 ]
- 귀무 이탈도(null deviance) : 상수만 있고 예측 변수는 전혀 없는 모형의 이탈도 [ = -2LL(기저모형) = 154.08 ]
- 잔차 이탈도를 제공 : -2LL(새모형) [ 144.16 ]
- 기저 이탈도(154.08)에서 Intervention을 추가(144.16)하니 이탈도가 감소했다. -> 추가한 모형이 결과를 좀 더 잘 예측함
- 모형이 결과변수를 '얼마나 더 잘'예측하는지는 모형의 카이제곱 통계량으로 평가[카이제곱 : 현재의 모형과 상수만 있는 모형의 차이를 측정]
- Z통계량의 유의확률이 0.05보다 작으므로 Intervention은 치료 여부의 유의한 예측변수라고 할 수 있다.

```R
> summary(eelModel.1)

Call:
glm(formula = Cured ~ Intervention, family = binomial(), data = eelData)

Coefficients:
                         Estimate Std. Error z value Pr(>|z|)   
(Intercept)               -0.2877     0.2700  -1.065  0.28671   
InterventionIntervention   1.2287     0.3998   3.074  0.00212 **
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

(Dispersion parameter for binomial family taken to be 1)

    Null deviance: 154.08  on 112  degrees of freedom
Residual deviance: 144.16  on 111  degrees of freedom
AIC: 148.16

Number of Fisher Scoring iterations: 4
```

- 카이제곱 = 154.08 - 144.16 = 9.92 [ 이 값은 카이제곱 분포를 따르므로, 유의성을 확인하면 < 0.05 수준에서 유의하므로 상수만 있는 모형보다 이 모형이 더 잘 예측한다고 할 수 있다.]
- 모형에 Intervention을 포함 함으로써 모형의 적합도가 $$\chi^2(1) = 9.93, p = 0.002$$로 유의하게 개선되었다는 결론을 내릴 수 있다.

```R
> modelChi <- eelModel.1$null.deviance - eelModel.1$deviance # 카이제곱 구하기
> chidf <- eelModel.1$df.null - eelModel.1$df.residual # 통계량의 자유도 구하기
> chisq.prob <- 1 - pchisq(modelChi, chidf) # 카이제곱 통계량과 관련된 확률 구하기
> modelChi; chidf; chisq.prob
[1] 9.926201
[1] 1
[1] 0.001629425 # < 0.05 이므로 모형이 결과를 더 잘 예측하지 못한다는 귀무가설을 기각할 수 있다.
```

```R
> exp(eelModel.1$coefficients) # 승산비 구하기
             (Intercept) InterventionIntervention
                0.750000                 3.416667
# 결론 : 처치를 받은 환자가 치료될 승산이 처치를 받지 않은 환자가 치료될 승산의 3.42배라고 말할 수 있다.
```

```R
> exp(confint(eelModel.1)) # 승산비들의 신뢰구간
                             2.5 %   97.5 %
(Intercept)              0.4374531 1.268674
InterventionIntervention 1.5820127 7.625545
# 결과에서 중요한 점은 하계와 상계의 값이 1보다 크다는 점
# 왜냐하면, 예측변수가 증가함에 따라 환자가 치료될 승산이 커짐을 뜻하기 때문이다.
# 만약 하계가 1보다 작다면, 모집단에서의 관계의 방향이 관측된 방향과 다를 여지가 존재하는 것 -> 실험자의 개입이 환자가 치료될 승산을 증가한다고 확신할 수 없다.
```

### Intervention and Duration

- Duration의 b 추정값이 0.008으로 꽤 작은 값이며, 그 변수에 관련된 확률은 0.964 > 0.05이므로 이 값은 유의하지 않다.
- 두 모형의 이탈도(=144.16)으로 똑같고, AIC(150.16)으로 모형 1의 값(148.16)보다 큰 값으로, 이는 모형 1이 더 나은 모형임을 뜻한다.

```R
> eelModel.2 <- glm(Cured ~ Intervention + Duration, data = eelData, family = binomial())
> summary(eelModel.2)

Call:
glm(formula = Cured ~ Intervention + Duration, family = binomial(),
    data = eelData)

Coefficients:
                          Estimate Std. Error z value Pr(>|z|)   
(Intercept)              -0.234660   1.220563  -0.192  0.84754   
InterventionIntervention  1.233532   0.414565   2.975  0.00293 **
Duration                 -0.007835   0.175913  -0.045  0.96447   
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

(Dispersion parameter for binomial family taken to be 1)

    Null deviance: 154.08  on 112  degrees of freedom
Residual deviance: 144.16  on 110  degrees of freedom
AIC: 150.16

Number of Fisher Scoring iterations: 4
```

- 두 모형을 비교하는 방법
- 두 모형의 이탈도 차이는 0.00198이며 자유도 차이는 1이다.
- p값은 0.9645 > 0.05이므로 모형1보다 유의하게 개선된 것은 아니라는 결론을 내릴 수 있다.

```R
> anova(eelModel.1, eelModel.2)
Analysis of Deviance Table

Model 1: Cured ~ Intervention
Model 2: Cured ~ Intervention + Duration
  Resid. Df Resid. Dev Df  Deviance Pr(>Chi)
1       111     144.16                      
2       110     144.16  1 0.0019835   0.9645
```

### 로지스틱 회귀의 사례별 진단

- 기본적인 진단 통계량 구하는 코드

```R
eelData$predicted.probabilities<-fitted(eelModel.1)
eelData$standardized.residuals<-rstandard(eelModel.1)
eelData$studentized.residuals<-rstudent(eelModel.1)
eelData$dfbeta<-dfbeta(eelModel.1)
eelData$dffit<-dffits(eelModel.1)
eelData $leverage<-hatvalues(eelModel.1)
```

- 예측변수 : Intervention
- 환자가 처치를 받지 않았을 때 치료될 확률은 0.429, 개입이 있었다면 환자가 치료될 확률은 0.719

```R
> head(eelData[, c("Cured", "Intervention", "Duration", "predicted.probabilities")], n=5)
      Cured Intervention Duration predicted.probabilities
1 Not Cured No Treatment        7               0.4285714
2 Not Cured No Treatment        7               0.4285714
3 Not Cured No Treatment        6               0.4285714
4     Cured No Treatment        8               0.4285714
5     Cured Intervention        7               0.7192982
```

- 잔차 통계량을 확인했을 때 확인해야 할 사항
1. 지렛대
2. 스튜던트화 잔차와 표준화잔차
3. 상수의 DFBeta와 예측변수의 DFBeta

```R
> head(eelData[, c("leverage", "studentized.residuals", "dfbeta")], n=5)
    leverage studentized.residuals dfbeta.(Intercept) dfbeta.InterventionIntervention
1 0.01785714            -1.0643627        -0.03886912                      0.03886912
2 0.01785714            -1.0643627        -0.03886912                      0.03886912
3 0.01785714            -1.0643627        -0.03886912                      0.03886912
4 0.01785714             1.3110447         0.04782751                     -0.04782751
5 0.01754386             0.8160435         0.00000000                      0.03225994
```

- 주의사항! 만약 현저한 이상치 사례들이 발견되었다면, 단지 모형을 좀 더 자료에 적합하게 만들기 위해 사례들을 제거하는 것은 정당한 일이 아니라는 점

### 보고

![image_01](/assets/images/Book/Discovering_Statistics_Using_R/table_001.png)
