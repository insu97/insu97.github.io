---
layout: single
title:  "Prediction-pycaret!"

categories :
  - Python

tags :
  - Prediction
  - pycaret
---

```python
import warnings
warnings.filterwarnings('ignore')
import pandas as pd
import numpy as np
random_state=9701
```


```python
x_train = pd.read_csv("../data/titanic/x_train.csv")
x_valid = pd.read_csv("../data/titanic/x_valid.csv")
y_train = pd.read_csv("../data/titanic/y_train.csv")
y_valid = pd.read_csv("../data/titanic/y_valid.csv")

train = pd.read_csv("../data/titanic/pre_train.csv")
test = pd.read_csv("../data/titanic/pre_test.csv")
```

# 예측

공식 사이트 : https://pycaret.readthedocs.io/en/latest/index.html#pycaret.classification.setup


```python
from pycaret.classification import *
```


```python
clf = setup(data = train, target = 'Survived') # 전체 데이터 사용 , setup상태에서 enter 누르기
```


<style  type="text/css" >
</style><table id="T_24d64e1d_5ade_11eb_82de_b42e99092f91" ><thead>    <tr>        <th class="blank level0" ></th>        <th class="col_heading level0 col0" >Description</th>        <th class="col_heading level0 col1" >Value</th>    </tr></thead><tbody>
                <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row0" class="row_heading level0 row0" >0</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row0_col0" class="data row0 col0" >session_id</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row0_col1" class="data row0 col1" >4676</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row1" class="row_heading level0 row1" >1</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row1_col0" class="data row1 col0" >Target</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row1_col1" class="data row1 col1" >Survived</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row2" class="row_heading level0 row2" >2</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row2_col0" class="data row2 col0" >Target Type</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row2_col1" class="data row2 col1" >Binary</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row3" class="row_heading level0 row3" >3</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row3_col0" class="data row3 col0" >Label Encoded</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row3_col1" class="data row3 col1" >0.0: 0, 1.0: 1</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row4" class="row_heading level0 row4" >4</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row4_col0" class="data row4 col0" >Original Data</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row4_col1" class="data row4 col1" >(820, 10)</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row5" class="row_heading level0 row5" >5</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row5_col0" class="data row5 col0" >Missing Values</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row5_col1" class="data row5 col1" >False</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row6" class="row_heading level0 row6" >6</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row6_col0" class="data row6 col0" >Numeric Features</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row6_col1" class="data row6 col1" >5</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row7" class="row_heading level0 row7" >7</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row7_col0" class="data row7 col0" >Categorical Features</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row7_col1" class="data row7 col1" >4</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row8" class="row_heading level0 row8" >8</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row8_col0" class="data row8 col0" >Ordinal Features</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row8_col1" class="data row8 col1" >False</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row9" class="row_heading level0 row9" >9</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row9_col0" class="data row9 col0" >High Cardinality Features</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row9_col1" class="data row9 col1" >False</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row10" class="row_heading level0 row10" >10</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row10_col0" class="data row10 col0" >High Cardinality Method</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row10_col1" class="data row10 col1" >None</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row11" class="row_heading level0 row11" >11</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row11_col0" class="data row11 col0" >Transformed Train Set</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row11_col1" class="data row11 col1" >(573, 9)</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row12" class="row_heading level0 row12" >12</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row12_col0" class="data row12 col0" >Transformed Test Set</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row12_col1" class="data row12 col1" >(247, 9)</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row13" class="row_heading level0 row13" >13</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row13_col0" class="data row13 col0" >Shuffle Train-Test</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row13_col1" class="data row13 col1" >True</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row14" class="row_heading level0 row14" >14</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row14_col0" class="data row14 col0" >Stratify Train-Test</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row14_col1" class="data row14 col1" >False</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row15" class="row_heading level0 row15" >15</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row15_col0" class="data row15 col0" >Fold Generator</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row15_col1" class="data row15 col1" >StratifiedKFold</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row16" class="row_heading level0 row16" >16</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row16_col0" class="data row16 col0" >Fold Number</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row16_col1" class="data row16 col1" >10</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row17" class="row_heading level0 row17" >17</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row17_col0" class="data row17 col0" >CPU Jobs</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row17_col1" class="data row17 col1" >-1</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row18" class="row_heading level0 row18" >18</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row18_col0" class="data row18 col0" >Use GPU</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row18_col1" class="data row18 col1" >False</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row19" class="row_heading level0 row19" >19</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row19_col0" class="data row19 col0" >Log Experiment</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row19_col1" class="data row19 col1" >False</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row20" class="row_heading level0 row20" >20</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row20_col0" class="data row20 col0" >Experiment Name</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row20_col1" class="data row20 col1" >clf-default-name</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row21" class="row_heading level0 row21" >21</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row21_col0" class="data row21 col0" >USI</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row21_col1" class="data row21 col1" >9215</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row22" class="row_heading level0 row22" >22</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row22_col0" class="data row22 col0" >Imputation Type</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row22_col1" class="data row22 col1" >simple</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row23" class="row_heading level0 row23" >23</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row23_col0" class="data row23 col0" >Iterative Imputation Iteration</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row23_col1" class="data row23 col1" >None</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row24" class="row_heading level0 row24" >24</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row24_col0" class="data row24 col0" >Numeric Imputer</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row24_col1" class="data row24 col1" >mean</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row25" class="row_heading level0 row25" >25</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row25_col0" class="data row25 col0" >Iterative Imputation Numeric Model</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row25_col1" class="data row25 col1" >None</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row26" class="row_heading level0 row26" >26</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row26_col0" class="data row26 col0" >Categorical Imputer</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row26_col1" class="data row26 col1" >constant</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row27" class="row_heading level0 row27" >27</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row27_col0" class="data row27 col0" >Iterative Imputation Categorical Model</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row27_col1" class="data row27 col1" >None</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row28" class="row_heading level0 row28" >28</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row28_col0" class="data row28 col0" >Unknown Categoricals Handling</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row28_col1" class="data row28 col1" >least_frequent</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row29" class="row_heading level0 row29" >29</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row29_col0" class="data row29 col0" >Normalize</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row29_col1" class="data row29 col1" >False</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row30" class="row_heading level0 row30" >30</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row30_col0" class="data row30 col0" >Normalize Method</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row30_col1" class="data row30 col1" >None</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row31" class="row_heading level0 row31" >31</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row31_col0" class="data row31 col0" >Transformation</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row31_col1" class="data row31 col1" >False</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row32" class="row_heading level0 row32" >32</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row32_col0" class="data row32 col0" >Transformation Method</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row32_col1" class="data row32 col1" >None</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row33" class="row_heading level0 row33" >33</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row33_col0" class="data row33 col0" >PCA</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row33_col1" class="data row33 col1" >False</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row34" class="row_heading level0 row34" >34</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row34_col0" class="data row34 col0" >PCA Method</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row34_col1" class="data row34 col1" >None</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row35" class="row_heading level0 row35" >35</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row35_col0" class="data row35 col0" >PCA Components</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row35_col1" class="data row35 col1" >None</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row36" class="row_heading level0 row36" >36</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row36_col0" class="data row36 col0" >Ignore Low Variance</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row36_col1" class="data row36 col1" >False</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row37" class="row_heading level0 row37" >37</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row37_col0" class="data row37 col0" >Combine Rare Levels</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row37_col1" class="data row37 col1" >False</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row38" class="row_heading level0 row38" >38</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row38_col0" class="data row38 col0" >Rare Level Threshold</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row38_col1" class="data row38 col1" >None</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row39" class="row_heading level0 row39" >39</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row39_col0" class="data row39 col0" >Numeric Binning</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row39_col1" class="data row39 col1" >False</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row40" class="row_heading level0 row40" >40</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row40_col0" class="data row40 col0" >Remove Outliers</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row40_col1" class="data row40 col1" >False</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row41" class="row_heading level0 row41" >41</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row41_col0" class="data row41 col0" >Outliers Threshold</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row41_col1" class="data row41 col1" >None</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row42" class="row_heading level0 row42" >42</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row42_col0" class="data row42 col0" >Remove Multicollinearity</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row42_col1" class="data row42 col1" >False</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row43" class="row_heading level0 row43" >43</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row43_col0" class="data row43 col0" >Multicollinearity Threshold</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row43_col1" class="data row43 col1" >None</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row44" class="row_heading level0 row44" >44</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row44_col0" class="data row44 col0" >Clustering</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row44_col1" class="data row44 col1" >False</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row45" class="row_heading level0 row45" >45</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row45_col0" class="data row45 col0" >Clustering Iteration</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row45_col1" class="data row45 col1" >None</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row46" class="row_heading level0 row46" >46</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row46_col0" class="data row46 col0" >Polynomial Features</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row46_col1" class="data row46 col1" >False</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row47" class="row_heading level0 row47" >47</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row47_col0" class="data row47 col0" >Polynomial Degree</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row47_col1" class="data row47 col1" >None</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row48" class="row_heading level0 row48" >48</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row48_col0" class="data row48 col0" >Trignometry Features</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row48_col1" class="data row48 col1" >False</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row49" class="row_heading level0 row49" >49</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row49_col0" class="data row49 col0" >Polynomial Threshold</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row49_col1" class="data row49 col1" >None</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row50" class="row_heading level0 row50" >50</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row50_col0" class="data row50 col0" >Group Features</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row50_col1" class="data row50 col1" >False</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row51" class="row_heading level0 row51" >51</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row51_col0" class="data row51 col0" >Feature Selection</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row51_col1" class="data row51 col1" >False</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row52" class="row_heading level0 row52" >52</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row52_col0" class="data row52 col0" >Features Selection Threshold</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row52_col1" class="data row52 col1" >None</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row53" class="row_heading level0 row53" >53</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row53_col0" class="data row53 col0" >Feature Interaction</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row53_col1" class="data row53 col1" >False</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row54" class="row_heading level0 row54" >54</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row54_col0" class="data row54 col0" >Feature Ratio</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row54_col1" class="data row54 col1" >False</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row55" class="row_heading level0 row55" >55</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row55_col0" class="data row55 col0" >Interaction Threshold</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row55_col1" class="data row55 col1" >None</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row56" class="row_heading level0 row56" >56</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row56_col0" class="data row56 col0" >Fix Imbalance</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row56_col1" class="data row56 col1" >False</td>
            </tr>
            <tr>
                        <th id="T_24d64e1d_5ade_11eb_82de_b42e99092f91level0_row57" class="row_heading level0 row57" >57</th>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row57_col0" class="data row57 col0" >Fix Imbalance Method</td>
                        <td id="T_24d64e1d_5ade_11eb_82de_b42e99092f91row57_col1" class="data row57 col1" >SMOTE</td>
            </tr>
    </tbody></table>



```python
best_3 = compare_models(sort = 'AUC', n_select = 3) # AUC로 높은 모델 3 개 선택
```


<style  type="text/css" >
    #T_3319028c_5ade_11eb_9b3f_b42e99092f91 th {
          text-align: left;
    }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row0_col0 {
            text-align:  left;
            text-align:  left;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row0_col1 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row0_col2 {
            text-align:  left;
            text-align:  left;
            background-color:  yellow;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row0_col3 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row0_col4 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row0_col5 {
            text-align:  left;
            text-align:  left;
            background-color:  yellow;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row0_col6 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row0_col7 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row0_col8 {
            text-align:  left;
            text-align:  left;
            : ;
            background-color:  lightgrey;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row1_col0 {
            text-align:  left;
            text-align:  left;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row1_col1 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row1_col2 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row1_col3 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row1_col4 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row1_col5 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row1_col6 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row1_col7 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row1_col8 {
            text-align:  left;
            text-align:  left;
            : ;
            background-color:  lightgrey;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row2_col0 {
            text-align:  left;
            text-align:  left;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row2_col1 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row2_col2 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row2_col3 {
            text-align:  left;
            text-align:  left;
            background-color:  yellow;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row2_col4 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row2_col5 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row2_col6 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row2_col7 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row2_col8 {
            text-align:  left;
            text-align:  left;
            : ;
            background-color:  lightgrey;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row3_col0 {
            text-align:  left;
            text-align:  left;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row3_col1 {
            text-align:  left;
            text-align:  left;
            background-color:  yellow;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row3_col2 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row3_col3 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row3_col4 {
            text-align:  left;
            text-align:  left;
            background-color:  yellow;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row3_col5 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row3_col6 {
            text-align:  left;
            text-align:  left;
            background-color:  yellow;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row3_col7 {
            text-align:  left;
            text-align:  left;
            background-color:  yellow;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row3_col8 {
            text-align:  left;
            text-align:  left;
            : ;
            background-color:  lightgrey;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row4_col0 {
            text-align:  left;
            text-align:  left;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row4_col1 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row4_col2 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row4_col3 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row4_col4 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row4_col5 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row4_col6 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row4_col7 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row4_col8 {
            text-align:  left;
            text-align:  left;
            : ;
            background-color:  lightgrey;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row5_col0 {
            text-align:  left;
            text-align:  left;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row5_col1 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row5_col2 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row5_col3 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row5_col4 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row5_col5 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row5_col6 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row5_col7 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row5_col8 {
            text-align:  left;
            text-align:  left;
            : ;
            background-color:  lightgrey;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row6_col0 {
            text-align:  left;
            text-align:  left;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row6_col1 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row6_col2 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row6_col3 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row6_col4 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row6_col5 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row6_col6 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row6_col7 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row6_col8 {
            text-align:  left;
            text-align:  left;
            : ;
            background-color:  lightgrey;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row7_col0 {
            text-align:  left;
            text-align:  left;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row7_col1 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row7_col2 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row7_col3 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row7_col4 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row7_col5 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row7_col6 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row7_col7 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row7_col8 {
            text-align:  left;
            text-align:  left;
            background-color:  yellow;
            background-color:  lightgrey;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row8_col0 {
            text-align:  left;
            text-align:  left;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row8_col1 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row8_col2 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row8_col3 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row8_col4 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row8_col5 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row8_col6 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row8_col7 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row8_col8 {
            text-align:  left;
            text-align:  left;
            : ;
            background-color:  lightgrey;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row9_col0 {
            text-align:  left;
            text-align:  left;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row9_col1 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row9_col2 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row9_col3 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row9_col4 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row9_col5 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row9_col6 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row9_col7 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row9_col8 {
            text-align:  left;
            text-align:  left;
            background-color:  yellow;
            background-color:  lightgrey;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row10_col0 {
            text-align:  left;
            text-align:  left;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row10_col1 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row10_col2 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row10_col3 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row10_col4 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row10_col5 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row10_col6 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row10_col7 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row10_col8 {
            text-align:  left;
            text-align:  left;
            background-color:  yellow;
            background-color:  lightgrey;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row11_col0 {
            text-align:  left;
            text-align:  left;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row11_col1 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row11_col2 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row11_col3 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row11_col4 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row11_col5 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row11_col6 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row11_col7 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row11_col8 {
            text-align:  left;
            text-align:  left;
            : ;
            background-color:  lightgrey;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row12_col0 {
            text-align:  left;
            text-align:  left;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row12_col1 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row12_col2 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row12_col3 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row12_col4 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row12_col5 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row12_col6 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row12_col7 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row12_col8 {
            text-align:  left;
            text-align:  left;
            background-color:  yellow;
            background-color:  lightgrey;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row13_col0 {
            text-align:  left;
            text-align:  left;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row13_col1 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row13_col2 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row13_col3 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row13_col4 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row13_col5 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row13_col6 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row13_col7 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row13_col8 {
            text-align:  left;
            text-align:  left;
            : ;
            background-color:  lightgrey;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row14_col0 {
            text-align:  left;
            text-align:  left;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row14_col1 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row14_col2 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row14_col3 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row14_col4 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row14_col5 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row14_col6 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row14_col7 {
            text-align:  left;
            text-align:  left;
            : ;
        }    #T_3319028c_5ade_11eb_9b3f_b42e99092f91row14_col8 {
            text-align:  left;
            text-align:  left;
            background-color:  yellow;
            background-color:  lightgrey;
        }</style><table id="T_3319028c_5ade_11eb_9b3f_b42e99092f91" ><thead>    <tr>        <th class="blank level0" ></th>        <th class="col_heading level0 col0" >Model</th>        <th class="col_heading level0 col1" >Accuracy</th>        <th class="col_heading level0 col2" >AUC</th>        <th class="col_heading level0 col3" >Recall</th>        <th class="col_heading level0 col4" >Prec.</th>        <th class="col_heading level0 col5" >F1</th>        <th class="col_heading level0 col6" >Kappa</th>        <th class="col_heading level0 col7" >MCC</th>        <th class="col_heading level0 col8" >TT (Sec)</th>    </tr></thead><tbody>
                <tr>
                        <th id="T_3319028c_5ade_11eb_9b3f_b42e99092f91level0_row0" class="row_heading level0 row0" >rf</th>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row0_col0" class="data row0 col0" >Random Forest Classifier</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row0_col1" class="data row0 col1" >0.8394</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row0_col2" class="data row0 col2" >0.8948</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row0_col3" class="data row0 col3" >0.7826</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row0_col4" class="data row0 col4" >0.8078</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row0_col5" class="data row0 col5" >0.7918</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row0_col6" class="data row0 col6" >0.6616</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row0_col7" class="data row0 col7" >0.6652</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row0_col8" class="data row0 col8" >0.0470</td>
            </tr>
            <tr>
                        <th id="T_3319028c_5ade_11eb_9b3f_b42e99092f91level0_row1" class="row_heading level0 row1" >gbc</th>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row1_col0" class="data row1 col0" >Gradient Boosting Classifier</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row1_col1" class="data row1 col1" >0.8342</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row1_col2" class="data row1 col2" >0.8933</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row1_col3" class="data row1 col3" >0.7427</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row1_col4" class="data row1 col4" >0.8249</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row1_col5" class="data row1 col5" >0.7773</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row1_col6" class="data row1 col6" >0.6465</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row1_col7" class="data row1 col7" >0.6528</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row1_col8" class="data row1 col8" >0.0180</td>
            </tr>
            <tr>
                        <th id="T_3319028c_5ade_11eb_9b3f_b42e99092f91level0_row2" class="row_heading level0 row2" >lightgbm</th>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row2_col0" class="data row2 col0" >Light Gradient Boosting Machine</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row2_col1" class="data row2 col1" >0.8325</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row2_col2" class="data row2 col2" >0.8913</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row2_col3" class="data row2 col3" >0.7874</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row2_col4" class="data row2 col4" >0.7915</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row2_col5" class="data row2 col5" >0.7867</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row2_col6" class="data row2 col6" >0.6493</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row2_col7" class="data row2 col7" >0.6522</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row2_col8" class="data row2 col8" >0.0090</td>
            </tr>
            <tr>
                        <th id="T_3319028c_5ade_11eb_9b3f_b42e99092f91level0_row3" class="row_heading level0 row3" >catboost</th>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row3_col0" class="data row3 col0" >CatBoost Classifier</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row3_col1" class="data row3 col1" >0.8430</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row3_col2" class="data row3 col2" >0.8896</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row3_col3" class="data row3 col3" >0.7561</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row3_col4" class="data row3 col4" >0.8335</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row3_col5" class="data row3 col5" >0.7897</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row3_col6" class="data row3 col6" >0.6654</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row3_col7" class="data row3 col7" >0.6704</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row3_col8" class="data row3 col8" >0.7890</td>
            </tr>
            <tr>
                        <th id="T_3319028c_5ade_11eb_9b3f_b42e99092f91level0_row4" class="row_heading level0 row4" >xgboost</th>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row4_col0" class="data row4 col0" >Extreme Gradient Boosting</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row4_col1" class="data row4 col1" >0.8237</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row4_col2" class="data row4 col2" >0.8872</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row4_col3" class="data row4 col3" >0.7783</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row4_col4" class="data row4 col4" >0.7805</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row4_col5" class="data row4 col5" >0.7759</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row4_col6" class="data row4 col6" >0.6312</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row4_col7" class="data row4 col7" >0.6349</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row4_col8" class="data row4 col8" >0.0470</td>
            </tr>
            <tr>
                        <th id="T_3319028c_5ade_11eb_9b3f_b42e99092f91level0_row5" class="row_heading level0 row5" >et</th>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row5_col0" class="data row5 col0" >Extra Trees Classifier</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row5_col1" class="data row5 col1" >0.8359</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row5_col2" class="data row5 col2" >0.8787</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row5_col3" class="data row5 col3" >0.7692</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row5_col4" class="data row5 col4" >0.8126</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row5_col5" class="data row5 col5" >0.7851</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row5_col6" class="data row5 col6" >0.6532</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row5_col7" class="data row5 col7" >0.6592</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row5_col8" class="data row5 col8" >0.0400</td>
            </tr>
            <tr>
                        <th id="T_3319028c_5ade_11eb_9b3f_b42e99092f91level0_row6" class="row_heading level0 row6" >lr</th>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row6_col0" class="data row6 col0" >Logistic Regression</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row6_col1" class="data row6 col1" >0.8028</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row6_col2" class="data row6 col2" >0.8487</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row6_col3" class="data row6 col3" >0.7251</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row6_col4" class="data row6 col4" >0.7650</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row6_col5" class="data row6 col5" >0.7409</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row6_col6" class="data row6 col6" >0.5826</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row6_col7" class="data row6 col7" >0.5867</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row6_col8" class="data row6 col8" >0.0150</td>
            </tr>
            <tr>
                        <th id="T_3319028c_5ade_11eb_9b3f_b42e99092f91level0_row7" class="row_heading level0 row7" >lda</th>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row7_col0" class="data row7 col0" >Linear Discriminant Analysis</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row7_col1" class="data row7 col1" >0.7975</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row7_col2" class="data row7 col2" >0.8476</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row7_col3" class="data row7 col3" >0.7164</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row7_col4" class="data row7 col4" >0.7637</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row7_col5" class="data row7 col5" >0.7346</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row7_col6" class="data row7 col6" >0.5721</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row7_col7" class="data row7 col7" >0.5775</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row7_col8" class="data row7 col8" >0.0050</td>
            </tr>
            <tr>
                        <th id="T_3319028c_5ade_11eb_9b3f_b42e99092f91level0_row8" class="row_heading level0 row8" >ada</th>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row8_col0" class="data row8 col0" >Ada Boost Classifier</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row8_col1" class="data row8 col1" >0.7924</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row8_col2" class="data row8 col2" >0.8459</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row8_col3" class="data row8 col3" >0.7215</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row8_col4" class="data row8 col4" >0.7490</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row8_col5" class="data row8 col5" >0.7297</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row8_col6" class="data row8 col6" >0.5625</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row8_col7" class="data row8 col7" >0.5678</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row8_col8" class="data row8 col8" >0.0200</td>
            </tr>
            <tr>
                        <th id="T_3319028c_5ade_11eb_9b3f_b42e99092f91level0_row9" class="row_heading level0 row9" >nb</th>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row9_col0" class="data row9 col0" >Naive Bayes</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row9_col1" class="data row9 col1" >0.7717</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row9_col2" class="data row9 col2" >0.8129</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row9_col3" class="data row9 col3" >0.7219</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row9_col4" class="data row9 col4" >0.7113</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row9_col5" class="data row9 col5" >0.7121</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row9_col6" class="data row9 col6" >0.5241</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row9_col7" class="data row9 col7" >0.5288</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row9_col8" class="data row9 col8" >0.0050</td>
            </tr>
            <tr>
                        <th id="T_3319028c_5ade_11eb_9b3f_b42e99092f91level0_row10" class="row_heading level0 row10" >dt</th>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row10_col0" class="data row10 col0" >Decision Tree Classifier</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row10_col1" class="data row10 col1" >0.7852</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row10_col2" class="data row10 col2" >0.7795</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row10_col3" class="data row10 col3" >0.7468</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row10_col4" class="data row10 col4" >0.7272</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row10_col5" class="data row10 col5" >0.7299</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row10_col6" class="data row10 col6" >0.5527</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row10_col7" class="data row10 col7" >0.5601</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row10_col8" class="data row10 col8" >0.0050</td>
            </tr>
            <tr>
                        <th id="T_3319028c_5ade_11eb_9b3f_b42e99092f91level0_row11" class="row_heading level0 row11" >knn</th>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row11_col0" class="data row11 col0" >K Neighbors Classifier</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row11_col1" class="data row11 col1" >0.7400</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row11_col2" class="data row11 col2" >0.7768</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row11_col3" class="data row11 col3" >0.6314</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row11_col4" class="data row11 col4" >0.6832</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row11_col5" class="data row11 col5" >0.6545</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row11_col6" class="data row11 col6" >0.4472</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row11_col7" class="data row11 col7" >0.4495</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row11_col8" class="data row11 col8" >0.0070</td>
            </tr>
            <tr>
                        <th id="T_3319028c_5ade_11eb_9b3f_b42e99092f91level0_row12" class="row_heading level0 row12" >qda</th>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row12_col0" class="data row12 col0" >Quadratic Discriminant Analysis</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row12_col1" class="data row12 col1" >0.6631</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row12_col2" class="data row12 col2" >0.6683</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row12_col3" class="data row12 col3" >0.4798</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row12_col4" class="data row12 col4" >0.3894</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row12_col5" class="data row12 col5" >0.4156</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row12_col6" class="data row12 col6" >0.2611</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row12_col7" class="data row12 col7" >0.2672</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row12_col8" class="data row12 col8" >0.0050</td>
            </tr>
            <tr>
                        <th id="T_3319028c_5ade_11eb_9b3f_b42e99092f91level0_row13" class="row_heading level0 row13" >svm</th>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row13_col0" class="data row13 col0" >SVM - Linear Kernel</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row13_col1" class="data row13 col1" >0.6234</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row13_col2" class="data row13 col2" >0.0000</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row13_col3" class="data row13 col3" >0.5457</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row13_col4" class="data row13 col4" >0.4034</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row13_col5" class="data row13 col5" >0.4377</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row13_col6" class="data row13 col6" >0.2103</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row13_col7" class="data row13 col7" >0.2403</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row13_col8" class="data row13 col8" >0.0060</td>
            </tr>
            <tr>
                        <th id="T_3319028c_5ade_11eb_9b3f_b42e99092f91level0_row14" class="row_heading level0 row14" >ridge</th>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row14_col0" class="data row14 col0" >Ridge Classifier</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row14_col1" class="data row14 col1" >0.7975</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row14_col2" class="data row14 col2" >0.0000</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row14_col3" class="data row14 col3" >0.7164</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row14_col4" class="data row14 col4" >0.7637</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row14_col5" class="data row14 col5" >0.7346</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row14_col6" class="data row14 col6" >0.5721</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row14_col7" class="data row14 col7" >0.5775</td>
                        <td id="T_3319028c_5ade_11eb_9b3f_b42e99092f91row14_col8" class="data row14 col8" >0.0050</td>
            </tr>
    </tbody></table>



```python
blended = blend_models(estimator_list = best_3, fold = 5, method = 'soft') # method = 'soft' or 'hard'
```


<style  type="text/css" >
    #T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row5_col0 {
            background:  yellow;
        }    #T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row5_col1 {
            background:  yellow;
        }    #T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row5_col2 {
            background:  yellow;
        }    #T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row5_col3 {
            background:  yellow;
        }    #T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row5_col4 {
            background:  yellow;
        }    #T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row5_col5 {
            background:  yellow;
        }    #T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row5_col6 {
            background:  yellow;
        }</style><table id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91" ><thead>    <tr>        <th class="blank level0" ></th>        <th class="col_heading level0 col0" >Accuracy</th>        <th class="col_heading level0 col1" >AUC</th>        <th class="col_heading level0 col2" >Recall</th>        <th class="col_heading level0 col3" >Prec.</th>        <th class="col_heading level0 col4" >F1</th>        <th class="col_heading level0 col5" >Kappa</th>        <th class="col_heading level0 col6" >MCC</th>    </tr></thead><tbody>
                <tr>
                        <th id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91level0_row0" class="row_heading level0 row0" >0</th>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row0_col0" class="data row0 col0" >0.8174</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row0_col1" class="data row0 col1" >0.8592</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row0_col2" class="data row0 col2" >0.7556</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row0_col3" class="data row0 col3" >0.7727</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row0_col4" class="data row0 col4" >0.7640</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row0_col5" class="data row0 col5" >0.6151</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row0_col6" class="data row0 col6" >0.6152</td>
            </tr>
            <tr>
                        <th id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91level0_row1" class="row_heading level0 row1" >1</th>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row1_col0" class="data row1 col0" >0.8522</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row1_col1" class="data row1 col1" >0.8946</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row1_col2" class="data row1 col2" >0.8000</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row1_col3" class="data row1 col3" >0.8182</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row1_col4" class="data row1 col4" >0.8090</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row1_col5" class="data row1 col5" >0.6884</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row1_col6" class="data row1 col6" >0.6886</td>
            </tr>
            <tr>
                        <th id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91level0_row2" class="row_heading level0 row2" >2</th>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row2_col0" class="data row2 col0" >0.8261</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row2_col1" class="data row2 col1" >0.9089</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row2_col2" class="data row2 col2" >0.7778</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row2_col3" class="data row2 col3" >0.7778</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row2_col4" class="data row2 col4" >0.7778</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row2_col5" class="data row2 col5" >0.6349</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row2_col6" class="data row2 col6" >0.6349</td>
            </tr>
            <tr>
                        <th id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91level0_row3" class="row_heading level0 row3" >3</th>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row3_col0" class="data row3 col0" >0.8684</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row3_col1" class="data row3 col1" >0.9295</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row3_col2" class="data row3 col2" >0.8222</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row3_col3" class="data row3 col3" >0.8409</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row3_col4" class="data row3 col4" >0.8315</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row3_col5" class="data row3 col5" >0.7236</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row3_col6" class="data row3 col6" >0.7237</td>
            </tr>
            <tr>
                        <th id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91level0_row4" class="row_heading level0 row4" >4</th>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row4_col0" class="data row4 col0" >0.8596</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row4_col1" class="data row4 col1" >0.9121</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row4_col2" class="data row4 col2" >0.7111</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row4_col3" class="data row4 col3" >0.9143</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row4_col4" class="data row4 col4" >0.8000</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row4_col5" class="data row4 col5" >0.6945</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row4_col6" class="data row4 col6" >0.7075</td>
            </tr>
            <tr>
                        <th id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91level0_row5" class="row_heading level0 row5" >Mean</th>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row5_col0" class="data row5 col0" >0.8447</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row5_col1" class="data row5 col1" >0.9008</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row5_col2" class="data row5 col2" >0.7733</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row5_col3" class="data row5 col3" >0.8248</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row5_col4" class="data row5 col4" >0.7965</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row5_col5" class="data row5 col5" >0.6713</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row5_col6" class="data row5 col6" >0.6740</td>
            </tr>
            <tr>
                        <th id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91level0_row6" class="row_heading level0 row6" >SD</th>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row6_col0" class="data row6 col0" >0.0197</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row6_col1" class="data row6 col1" >0.0236</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row6_col2" class="data row6 col2" >0.0382</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row6_col3" class="data row6 col3" >0.0514</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row6_col4" class="data row6 col4" >0.0236</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row6_col5" class="data row6 col5" >0.0401</td>
                        <td id="T_9b95da4f_5ade_11eb_9c7c_b42e99092f91row6_col6" class="data row6 col6" >0.0419</td>
            </tr>
    </tbody></table>



```python
pred_holdout = predict_model(blended) # test data로 평가
```


<style  type="text/css" >
</style><table id="T_a2319d73_5ade_11eb_ab6b_b42e99092f91" ><thead>    <tr>        <th class="blank level0" ></th>        <th class="col_heading level0 col0" >Model</th>        <th class="col_heading level0 col1" >Accuracy</th>        <th class="col_heading level0 col2" >AUC</th>        <th class="col_heading level0 col3" >Recall</th>        <th class="col_heading level0 col4" >Prec.</th>        <th class="col_heading level0 col5" >F1</th>        <th class="col_heading level0 col6" >Kappa</th>        <th class="col_heading level0 col7" >MCC</th>    </tr></thead><tbody>
                <tr>
                        <th id="T_a2319d73_5ade_11eb_ab6b_b42e99092f91level0_row0" class="row_heading level0 row0" >0</th>
                        <td id="T_a2319d73_5ade_11eb_ab6b_b42e99092f91row0_col0" class="data row0 col0" >Voting Classifier</td>
                        <td id="T_a2319d73_5ade_11eb_ab6b_b42e99092f91row0_col1" class="data row0 col1" >0.8300</td>
                        <td id="T_a2319d73_5ade_11eb_ab6b_b42e99092f91row0_col2" class="data row0 col2" >0.8838</td>
                        <td id="T_a2319d73_5ade_11eb_ab6b_b42e99092f91row0_col3" class="data row0 col3" >0.7549</td>
                        <td id="T_a2319d73_5ade_11eb_ab6b_b42e99092f91row0_col4" class="data row0 col4" >0.8191</td>
                        <td id="T_a2319d73_5ade_11eb_ab6b_b42e99092f91row0_col5" class="data row0 col5" >0.7857</td>
                        <td id="T_a2319d73_5ade_11eb_ab6b_b42e99092f91row0_col6" class="data row0 col6" >0.6452</td>
                        <td id="T_a2319d73_5ade_11eb_ab6b_b42e99092f91row0_col7" class="data row0 col7" >0.6466</td>
            </tr>
    </tbody></table>



```python
# 전체 데이터에 대한 재학습
# train / validation으로 나눠서 실험을 한 것 => 전체 train 데이터에 학습되어 있지 않음
# 따라서 전체 데이터에 학습을 시켜줌
final_model = finalize_model(blended)
```


```python
predictions = predict_model(final_model, data = test) # 예측
```


```python
predictions
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Pclass</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Fare</th>
      <th>Embarked_C</th>
      <th>Embarked_Q</th>
      <th>Embarked_S</th>
      <th>Label</th>
      <th>Score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>3.0</td>
      <td>1</td>
      <td>34.500000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>7.8292</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0.0</td>
      <td>0.9574</td>
    </tr>
    <tr>
      <th>1</th>
      <td>3.0</td>
      <td>0</td>
      <td>47.000000</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>7.0000</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0.0</td>
      <td>0.9297</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2.0</td>
      <td>1</td>
      <td>62.000000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>9.6875</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0.0</td>
      <td>0.9820</td>
    </tr>
    <tr>
      <th>3</th>
      <td>3.0</td>
      <td>1</td>
      <td>27.000000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>8.6625</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>1.0</td>
      <td>0.5323</td>
    </tr>
    <tr>
      <th>4</th>
      <td>3.0</td>
      <td>0</td>
      <td>22.000000</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>12.2875</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0.0</td>
      <td>0.5725</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>413</th>
      <td>3.0</td>
      <td>1</td>
      <td>24.398878</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>8.0500</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0.0</td>
      <td>0.9654</td>
    </tr>
    <tr>
      <th>414</th>
      <td>1.0</td>
      <td>0</td>
      <td>39.000000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>108.9000</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>1.0</td>
      <td>0.9899</td>
    </tr>
    <tr>
      <th>415</th>
      <td>3.0</td>
      <td>1</td>
      <td>38.500000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>7.2500</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0.0</td>
      <td>0.9706</td>
    </tr>
    <tr>
      <th>416</th>
      <td>3.0</td>
      <td>1</td>
      <td>24.398878</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>8.0500</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0.0</td>
      <td>0.9654</td>
    </tr>
    <tr>
      <th>417</th>
      <td>3.0</td>
      <td>1</td>
      <td>22.299039</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>22.3583</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>1.0</td>
      <td>0.5349</td>
    </tr>
  </tbody>
</table>
<p>418 rows × 11 columns</p>
</div>




```python
submission = pd.read_csv("../data/titanic/gender_submission.csv")
```


```python
submission['Survived'] = predictions['Label']
```


```python
submission.to_csv("../data/titanic/gender_submission.csv" , index = False)
```
