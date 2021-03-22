---
layout: single
title:  "Wilcoxon Rank_sum Test!"

categories :
  - R

tags :
  - Wilcoxon Rank_sum Test

comments : true

sidebar:
  nav: "R"
---



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




```R
with(dental,shapiro.test(resp))  # 정규분포를 따르지 않는다.
```



    	Shapiro-Wilk normality test

    data:  resp
    W = 0.78966, p-value = 0.01085




```R
wilcox.test( resp ~ treatment , data = dental )    # 귀무가설을 기각할 수 없다
```



    	Wilcoxon rank sum test

    data:  resp by treatment
    W = 3, p-value = 0.05556
    alternative hypothesis: true location shift is not equal to 0




```R
wilcox.test( log(resp) ~ treatment , data = dental )    # 같은 결과를 얻는다 -> but 자료값이 0보다 커야 가능
```



    	Wilcoxon rank sum test

    data:  log(resp) by treatment
    W = 3, p-value = 0.05556
    alternative hypothesis: true location shift is not equal to 0
