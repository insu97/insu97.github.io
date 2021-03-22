---
layout: single
title:  "Wilcoxon Signed-Rank Test!"

categories :
  - R

tags :
  - Wilcoxon

comments : true

sidebar:
  nav: "R"
---




# Wilcoxon Signed-Rank Test
    : 자료가 정규분포를 따르지 않는다면 비모수 방법을 사용
    ( => one-sample t-test , paired t-test 의 경우 해당 )


```R
CBT = read.csv("../data/CBT.csv")
```


```R
with(CBT , shapiro.test(Postwt-Prewt)) # ==> 정규분포를 따른다는 귀무가설 기각
```



    	Shapiro-Wilk normality test

    data:  Postwt - Prewt
    W = 0.89618, p-value = 0.007945




```R
with(CBT , wilcox.test(Postwt-Prewt , exact = FALSE))
```



    	Wilcoxon signed rank test with continuity correction

    data:  Postwt - Prewt
    V = 303.5, p-value = 0.06447
    alternative hypothesis: true location is not equal to 0
