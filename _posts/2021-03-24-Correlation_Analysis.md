---
layout: single
title:  "Correlation_Analysis!"

categories :
  - R

tags :
  - Correlation_Analysis

comments : true

sidebar:
  nav: "R"
---


# 데이터


```R
attitude
```


<table>
<thead><tr><th scope=col>rating</th><th scope=col>complaints</th><th scope=col>privileges</th><th scope=col>learning</th><th scope=col>raises</th><th scope=col>critical</th><th scope=col>advance</th></tr></thead>
<tbody>
	<tr><td>43</td><td>51</td><td>30</td><td>39</td><td>61</td><td>92</td><td>45</td></tr>
	<tr><td>63</td><td>64</td><td>51</td><td>54</td><td>63</td><td>73</td><td>47</td></tr>
	<tr><td>71</td><td>70</td><td>68</td><td>69</td><td>76</td><td>86</td><td>48</td></tr>
	<tr><td>61</td><td>63</td><td>45</td><td>47</td><td>54</td><td>84</td><td>35</td></tr>
	<tr><td>81</td><td>78</td><td>56</td><td>66</td><td>71</td><td>83</td><td>47</td></tr>
	<tr><td>43</td><td>55</td><td>49</td><td>44</td><td>54</td><td>49</td><td>34</td></tr>
	<tr><td>58</td><td>67</td><td>42</td><td>56</td><td>66</td><td>68</td><td>35</td></tr>
	<tr><td>71</td><td>75</td><td>50</td><td>55</td><td>70</td><td>66</td><td>41</td></tr>
	<tr><td>72</td><td>82</td><td>72</td><td>67</td><td>71</td><td>83</td><td>31</td></tr>
	<tr><td>67</td><td>61</td><td>45</td><td>47</td><td>62</td><td>80</td><td>41</td></tr>
	<tr><td>64</td><td>53</td><td>53</td><td>58</td><td>58</td><td>67</td><td>34</td></tr>
	<tr><td>67</td><td>60</td><td>47</td><td>39</td><td>59</td><td>74</td><td>41</td></tr>
	<tr><td>69</td><td>62</td><td>57</td><td>42</td><td>55</td><td>63</td><td>25</td></tr>
	<tr><td>68</td><td>83</td><td>83</td><td>45</td><td>59</td><td>77</td><td>35</td></tr>
	<tr><td>77</td><td>77</td><td>54</td><td>72</td><td>79</td><td>77</td><td>46</td></tr>
	<tr><td>81</td><td>90</td><td>50</td><td>72</td><td>60</td><td>54</td><td>36</td></tr>
	<tr><td>74</td><td>85</td><td>64</td><td>69</td><td>79</td><td>79</td><td>63</td></tr>
	<tr><td>65</td><td>60</td><td>65</td><td>75</td><td>55</td><td>80</td><td>60</td></tr>
	<tr><td>65</td><td>70</td><td>46</td><td>57</td><td>75</td><td>85</td><td>46</td></tr>
	<tr><td>50</td><td>58</td><td>68</td><td>54</td><td>64</td><td>78</td><td>52</td></tr>
	<tr><td>50</td><td>40</td><td>33</td><td>34</td><td>43</td><td>64</td><td>33</td></tr>
	<tr><td>64</td><td>61</td><td>52</td><td>62</td><td>66</td><td>80</td><td>41</td></tr>
	<tr><td>53</td><td>66</td><td>52</td><td>50</td><td>63</td><td>80</td><td>37</td></tr>
	<tr><td>40</td><td>37</td><td>42</td><td>58</td><td>50</td><td>57</td><td>49</td></tr>
	<tr><td>63</td><td>54</td><td>42</td><td>48</td><td>66</td><td>75</td><td>33</td></tr>
	<tr><td>66</td><td>77</td><td>66</td><td>63</td><td>88</td><td>76</td><td>72</td></tr>
	<tr><td>78</td><td>75</td><td>58</td><td>74</td><td>80</td><td>78</td><td>49</td></tr>
	<tr><td>48</td><td>57</td><td>44</td><td>45</td><td>51</td><td>83</td><td>38</td></tr>
	<tr><td>85</td><td>85</td><td>71</td><td>71</td><td>77</td><td>74</td><td>55</td></tr>
	<tr><td>82</td><td>82</td><td>39</td><td>59</td><td>64</td><td>78</td><td>39</td></tr>
</tbody>
</table>



# 분석

## 공분산


```R
cov(attitude , method = "pearson" , use ="pairwise.complete.obs") # 공분산 , use 에 입력한 값은 NAN값이 있을 때 사용
```


<table>
<thead><tr><th></th><th scope=col>rating</th><th scope=col>complaints</th><th scope=col>privileges</th><th scope=col>learning</th><th scope=col>raises</th><th scope=col>critical</th><th scope=col>advance</th></tr></thead>
<tbody>
	<tr><th scope=row>rating</th><td>148.17126</td><td>133.77931</td><td> 63.46437</td><td> 89.10460</td><td> 74.68851</td><td>18.84253 </td><td> 19.42299</td></tr>
	<tr><th scope=row>complaints</th><td>133.77931</td><td>177.28276</td><td> 90.95172</td><td> 93.25517</td><td> 92.64138</td><td>24.73103 </td><td> 30.76552</td></tr>
	<tr><th scope=row>privileges</th><td> 63.46437</td><td> 90.95172</td><td>149.70575</td><td> 70.84598</td><td> 56.67126</td><td>17.82529 </td><td> 43.21609</td></tr>
	<tr><th scope=row>learning</th><td> 89.10460</td><td> 93.25517</td><td> 70.84598</td><td>137.75747</td><td> 78.13908</td><td>13.46782 </td><td> 64.19770</td></tr>
	<tr><th scope=row>raises</th><td> 74.68851</td><td> 92.64138</td><td> 56.67126</td><td> 78.13908</td><td>108.10230</td><td>38.77356 </td><td> 61.42299</td></tr>
	<tr><th scope=row>critical</th><td> 18.84253</td><td> 24.73103</td><td> 17.82529</td><td> 13.46782</td><td> 38.77356</td><td>97.90920 </td><td> 28.84598</td></tr>
	<tr><th scope=row>advance</th><td> 19.42299</td><td> 30.76552</td><td> 43.21609</td><td> 64.19770</td><td> 61.42299</td><td>28.84598 </td><td>105.85747</td></tr>
</tbody>
</table>



## 상관계수


```R
cor(attitude) # 상관계수
```


<table>
<thead><tr><th></th><th scope=col>rating</th><th scope=col>complaints</th><th scope=col>privileges</th><th scope=col>learning</th><th scope=col>raises</th><th scope=col>critical</th><th scope=col>advance</th></tr></thead>
<tbody>
	<tr><th scope=row>rating</th><td>1.0000000</td><td>0.8254176</td><td>0.4261169</td><td>0.6236782</td><td>0.5901390</td><td>0.1564392</td><td>0.1550863</td></tr>
	<tr><th scope=row>complaints</th><td>0.8254176</td><td>1.0000000</td><td>0.5582882</td><td>0.5967358</td><td>0.6691975</td><td>0.1877143</td><td>0.2245796</td></tr>
	<tr><th scope=row>privileges</th><td>0.4261169</td><td>0.5582882</td><td>1.0000000</td><td>0.4933310</td><td>0.4454779</td><td>0.1472331</td><td>0.3432934</td></tr>
	<tr><th scope=row>learning</th><td>0.6236782</td><td>0.5967358</td><td>0.4933310</td><td>1.0000000</td><td>0.6403144</td><td>0.1159652</td><td>0.5316198</td></tr>
	<tr><th scope=row>raises</th><td>0.5901390</td><td>0.6691975</td><td>0.4454779</td><td>0.6403144</td><td>1.0000000</td><td>0.3768830</td><td>0.5741862</td></tr>
	<tr><th scope=row>critical</th><td>0.1564392</td><td>0.1877143</td><td>0.1472331</td><td>0.1159652</td><td>0.3768830</td><td>1.0000000</td><td>0.2833432</td></tr>
	<tr><th scope=row>advance</th><td>0.1550863</td><td>0.2245796</td><td>0.3432934</td><td>0.5316198</td><td>0.5741862</td><td>0.2833432</td><td>1.0000000</td></tr>
</tbody>
</table>




```R
with(attitude , cor(rating , complaints))
```


0.825417569542146


## p-value


```R
with(attitude , cor.test(rating , complaints))
```



    	Pearson's product-moment correlation

    data:  rating and complaints
    t = 7.737, df = 28, p-value = 1.988e-08
    alternative hypothesis: true correlation is not equal to 0
    95 percent confidence interval:
     0.6620128 0.9139139
    sample estimates:
          cor
    0.8254176




```R
with(attitude , cor.test(rating , complaints , method = "kendall"))
```

    Warning message in cor.test.default(rating, complaints, method = "kendall"):
    "Cannot compute exact p-value with ties"



    	Kendall's rank correlation tau

    data:  rating and complaints
    z = 5.0074, p-value = 5.518e-07
    alternative hypothesis: true tau is not equal to 0
    sample estimates:
          tau
    0.6549712



# Simulation
    : 과연 어디에서 사용될까..?


```R
library(MASS)
```


```R
X = mvrnorm(n = nrow(attitude) , mu = colMeans(attitude) , Sigma = cov(attitude))
X
```


<table>
<thead><tr><th scope=col>rating</th><th scope=col>complaints</th><th scope=col>privileges</th><th scope=col>learning</th><th scope=col>raises</th><th scope=col>critical</th><th scope=col>advance</th></tr></thead>
<tbody>
	<tr><td>45.72784</td><td>57.04167</td><td>44.09715</td><td>59.39942</td><td>74.45901</td><td>83.97207</td><td>49.35798</td></tr>
	<tr><td>79.14738</td><td>81.83686</td><td>59.89551</td><td>71.88210</td><td>85.82904</td><td>74.40606</td><td>53.42897</td></tr>
	<tr><td>76.59132</td><td>71.04781</td><td>79.65348</td><td>58.98540</td><td>68.71347</td><td>87.78001</td><td>33.46760</td></tr>
	<tr><td>41.77908</td><td>44.42853</td><td>51.10557</td><td>41.02633</td><td>55.14193</td><td>71.10382</td><td>38.12836</td></tr>
	<tr><td>56.37756</td><td>61.39023</td><td>36.94970</td><td>61.11715</td><td>69.82550</td><td>70.06967</td><td>39.13629</td></tr>
	<tr><td>62.42140</td><td>78.76956</td><td>45.14302</td><td>38.26721</td><td>70.41413</td><td>78.65869</td><td>39.73944</td></tr>
	<tr><td>73.85963</td><td>83.17287</td><td>53.45922</td><td>54.40128</td><td>63.03985</td><td>79.03512</td><td>46.86835</td></tr>
	<tr><td>53.15112</td><td>59.03449</td><td>52.38338</td><td>66.09491</td><td>61.32112</td><td>77.92298</td><td>41.30485</td></tr>
	<tr><td>66.72585</td><td>64.33027</td><td>36.79314</td><td>59.83262</td><td>78.39846</td><td>85.86299</td><td>43.54019</td></tr>
	<tr><td>65.18069</td><td>66.08225</td><td>35.49460</td><td>46.26069</td><td>64.31073</td><td>69.05607</td><td>42.78898</td></tr>
	<tr><td>77.21763</td><td>81.55610</td><td>61.90459</td><td>61.12852</td><td>73.13623</td><td>80.77537</td><td>51.11148</td></tr>
	<tr><td>75.78748</td><td>72.08024</td><td>60.38817</td><td>49.46170</td><td>54.65827</td><td>81.40452</td><td>27.86087</td></tr>
	<tr><td>47.08739</td><td>60.24801</td><td>59.26098</td><td>49.93318</td><td>56.98873</td><td>71.72197</td><td>52.90243</td></tr>
	<tr><td>64.31366</td><td>75.21901</td><td>61.61323</td><td>53.39337</td><td>65.59854</td><td>68.51817</td><td>42.06868</td></tr>
	<tr><td>54.38802</td><td>53.20436</td><td>43.58900</td><td>36.50971</td><td>47.42108</td><td>65.33891</td><td>22.58263</td></tr>
	<tr><td>74.34503</td><td>88.46796</td><td>75.92281</td><td>70.96424</td><td>94.71292</td><td>87.17308</td><td>50.22973</td></tr>
	<tr><td>66.02424</td><td>72.02671</td><td>68.48106</td><td>55.72704</td><td>70.48299</td><td>80.78288</td><td>31.54606</td></tr>
	<tr><td>75.58387</td><td>83.39715</td><td>66.82175</td><td>65.80744</td><td>79.02351</td><td>76.88234</td><td>53.24604</td></tr>
	<tr><td>72.73391</td><td>78.09988</td><td>58.08864</td><td>61.40603</td><td>67.21142</td><td>87.50362</td><td>53.16789</td></tr>
	<tr><td>76.44536</td><td>69.21742</td><td>61.61339</td><td>53.35577</td><td>61.85786</td><td>84.28171</td><td>43.60338</td></tr>
	<tr><td>65.35830</td><td>62.79866</td><td>44.16845</td><td>38.54038</td><td>61.73476</td><td>75.32087</td><td>31.76571</td></tr>
	<tr><td>41.22032</td><td>31.77560</td><td>35.25872</td><td>39.95298</td><td>51.87675</td><td>58.99058</td><td>54.44534</td></tr>
	<tr><td>67.79251</td><td>71.95515</td><td>59.42252</td><td>66.01404</td><td>59.78173</td><td>78.28944</td><td>63.16679</td></tr>
	<tr><td>72.93519</td><td>66.39559</td><td>57.59320</td><td>78.51903</td><td>75.82843</td><td>72.26979</td><td>67.50274</td></tr>
	<tr><td>67.81675</td><td>76.43662</td><td>64.19519</td><td>52.03735</td><td>72.33195</td><td>91.33179</td><td>39.26825</td></tr>
	<tr><td>67.14487</td><td>71.05305</td><td>41.12621</td><td>44.82402</td><td>56.19270</td><td>69.92820</td><td>24.73077</td></tr>
	<tr><td>59.26266</td><td>60.58390</td><td>48.47695</td><td>68.54189</td><td>64.17852</td><td>60.21246</td><td>52.89236</td></tr>
	<tr><td>68.32265</td><td>62.67817</td><td>56.02358</td><td>53.42080</td><td>72.13222</td><td>82.19480</td><td>54.77646</td></tr>
	<tr><td>54.92306</td><td>59.73550</td><td>43.81172</td><td>56.07884</td><td>61.04395</td><td>69.44076</td><td>49.17448</td></tr>
	<tr><td>75.73046</td><td>72.65524</td><td>49.52684</td><td>72.98301</td><td>61.09675</td><td>63.32056</td><td>46.91748</td></tr>
</tbody>
</table>
