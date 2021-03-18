---
layout: single
title:  "Two_Sample T-test!"

categories :
  - R

tags :
  - Two_Sample T-test

comments : true
---

# Two_Sample T-test

    : 서로 독립적인 두 집단의 평균의 차이가 0인지를 검정하는 방법.

    - 순서
        - 1 . 두 집단의 분산이 같은지
        - 2 . 분산이 다르면 Welch의 t-test를 적용
        - 3 . 분산이 같으면 pooled variance를 이용한 t-test를 사용


```R
dental = read.csv("../data/dental.csv")
```


```R
dental
```


<table>
<thead><tr><th scope=col>treatment</th><th scope=col>resp</th></tr></thead>
<tbody>
	<tr><td>test   </td><td>148    </td></tr>
	<tr><td>test   </td><td>190    </td></tr>
	<tr><td>test   </td><td> 68    </td></tr>
	<tr><td>test   </td><td> 79    </td></tr>
	<tr><td>test   </td><td> 70    </td></tr>
	<tr><td>control</td><td> 40    </td></tr>
	<tr><td>control</td><td> 80    </td></tr>
	<tr><td>control</td><td> 64    </td></tr>
	<tr><td>control</td><td> 52    </td></tr>
	<tr><td>control</td><td> 45    </td></tr>
</tbody>
</table>



## 분석


```R
boxplot(resp ~ treatment , data = dental , col = 'red')
```



![png](/assets/images/R/boxplot1.png)




```R
boxplot(log(resp) ~ treatment , data = dental , col = 'red')     # 이 데이터는 로그 변환을 해줘야 정규분포를 따른다
```



![png](/assets/images/R/boxplot2.png)



## 등분산 검정

    : 분산이 같은지 확인하는 작업


```R
var.test(log(resp) ~ treatment , data = dental)    # 분산이 같다는 귀무가설을 기각하지 못한다
```



    	F test to compare two variances

    data:  log(resp) by treatment
    F = 0.34321, num df = 4, denom df = 4, p-value = 0.325
    alternative hypothesis: true ratio of variances is not equal to 1
    95 percent confidence interval:
     0.03573413 3.29636586
    sample estimates:
    ratio of variances
             0.3432095



### 분산이 같은 경우
    : Pooled variance 사용


```R
t.test(log(resp) ~ treatment , var.equal = TRUE , data = dental)    # 평균이 같다는 귀무가설 기각
```



    	Two Sample t-test

    data:  log(resp) by treatment
    t = -2.5217, df = 8, p-value = 0.03571
    alternative hypothesis: true difference in means is not equal to 0
    95 percent confidence interval:
     -1.18465764 -0.05293907
    sample estimates:
    mean in group control    mean in group test
                 3.997539              4.616337



### 분산이 다른 경우

    : log-normal 분포를 따른다는 것을 무시하고 원래 값으로 진행


```R
var.test(resp ~ treatment , data = dental) # 분산이 같다는 귀무가설 기각
```



    	F test to compare two variances

    data:  resp by treatment
    F = 0.084906, num df = 4, denom df = 4, p-value = 0.03483
    alternative hypothesis: true ratio of variances is not equal to 1
    95 percent confidence interval:
     0.008840233 0.815484912
    sample estimates:
    ratio of variances
            0.08490628




```R
t.test(resp ~ treatment , data = dental) # 평균의 차이가 없다
```



    	Welch Two Sample t-test

    data:  resp by treatment
    t = -2.1333, df = 4.6744, p-value = 0.08988
    alternative hypothesis: true difference in means is not equal to 0
    95 percent confidence interval:
     -122.23919   12.63919
    sample estimates:
    mean in group control    mean in group test
                     56.2                 111.0
