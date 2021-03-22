---
layout: single
title:  "Paired t-test!"

categories :
  - R

tags :
  - Paired
  - t-test

comments : true

sidebar:
  nav: "R"
---


# Paired T-Test
    : 쌍을 이룬 두 변수의 차이를 보는 검정
    (ex . 약물 복용 전 과 후 비교)


```R
FT = read.csv("../data/FT.csv")
```


```R
FT   # Postwt - Prewt 를 보자!
```


<table>
<thead><tr><th scope=col>Prewt</th><th scope=col>Postwt</th></tr></thead>
<tbody>
	<tr><td>83.8 </td><td> 95.2</td></tr>
	<tr><td>83.3 </td><td> 94.3</td></tr>
	<tr><td>86.0 </td><td> 91.5</td></tr>
	<tr><td>82.5 </td><td> 91.9</td></tr>
	<tr><td>86.7 </td><td>100.3</td></tr>
	<tr><td>79.6 </td><td> 76.7</td></tr>
	<tr><td>76.9 </td><td> 76.8</td></tr>
	<tr><td>94.2 </td><td>101.6</td></tr>
	<tr><td>73.4 </td><td> 94.9</td></tr>
	<tr><td>80.5 </td><td> 75.2</td></tr>
	<tr><td>81.6 </td><td> 77.8</td></tr>
	<tr><td>82.1 </td><td> 95.5</td></tr>
	<tr><td>77.6 </td><td> 90.7</td></tr>
	<tr><td>83.5 </td><td> 92.5</td></tr>
	<tr><td>89.9 </td><td> 93.8</td></tr>
	<tr><td>86.0 </td><td> 91.7</td></tr>
	<tr><td>87.3 </td><td> 98.0</td></tr>
</tbody>
</table>



## 정규성 검정
    : shapiro.test 를 사용


```R
with(FT , shapiro.test(Postwt-Prewt))
```



    	Shapiro-Wilk normality test

    data:  Postwt - Prewt
    W = 0.95358, p-value = 0.5156



## t-test


```R
with(FT , t.test(Postwt-Prewt)) # 차이의 평균이 0인 귀무가설을 기각한다 ( why ? p-value < 0.05 )
```



    	One Sample t-test

    data:  Postwt - Prewt
    t = 4.1849, df = 16, p-value = 0.0007003
    alternative hypothesis: true mean is not equal to 0
    95 percent confidence interval:
      3.58470 10.94471
    sample estimates:
    mean of x
     7.264706
