---
layout: markdown
title: "PEP 8 import 순서와 파이썬 코드 스타일"
date: 2026-10-08 09:00:00 +0900
description: "표준 라이브러리, 서드파티, 로컬 import를 PEP 8 순서로 나누고, 들여쓰기·이름·비교·포매터까지 함께 정리한다."
tags: [Python, PEP8, Code_Style]
toc: true
---

{% include markdown.html %}

import가 파일 위쪽에 흩어져 있으면, 이 모듈이 표준 라이브러리만 쓰는지 우리 패키지를 쓰는지 한눈에 안 들어온다. [PEP 8](https://peps.python.org/pep-0008/)은 그 순서를 세 그룹으로 고정한다. 표준 라이브러리, 서드파티, 로컬 코드. 그룹 사이에는 빈 줄을 둔다.

이 글은 그 import 규칙을 먼저 보고, 이어서 PEP 8에서 같이 지키면 좋은 들여쓰기, 줄 길이, 공백, 이름, 비교를 정리한다. 좋은 예와 나쁜 예는 바로 아래에 둔다. 마지막에는 isort, black, ruff, flake8이 그중 무엇을 대신 봐 주는지 적는다.

## import는 세 덩어리로

import는 모듈 docstring 바로 아래, 상수와 함수보다 위에 둔다. 그룹 순서는 언제나 같다.

1. 표준 라이브러리
2. 서드파티 패키지
3. 로컬 애플리케이션, 로컬 라이브러리

그룹과 그룹 사이에는 빈 줄을 하나 넣는다. 같은 그룹 안에서는 빈 줄 없이 이어 쓰고, 보통 모듈 이름 순으로 둔다.

```python
"""학습 데이터 로더."""

import csv
from pathlib import Path

import pandas as pd
from sklearn.model_selection import train_test_split

from myproject.data import load_frame
from myproject.utils import seed_everything

SEED = 7
```

`from __future__ import annotations` 같은 future import가 있으면 표준 라이브러리보다 위에 두고, 그 아래를 빈 줄로 나눈다.

```python
from __future__ import annotations

import csv
from pathlib import Path
```

## 그룹 순서

표준 라이브러리는 파이썬을 설치하면 같이 오는 모듈이다. `csv`, `os`, `pathlib`, `dataclasses`가 여기 들어간다. 서드파티는 pip로 설치한 패키지다. `numpy`, `pandas`, `sklearn`처럼 프로젝트 의존성이다. 로컬은 지금 저장소 안의 패키지와 모듈이다.

그룹을 섞으면 의존성이 읽히지 않는다. 아래는 순서가 뒤집힌 예다.

```python
from myproject.utils import seed_everything
import pandas as pd
import os
from pathlib import Path
```

같은 내용을 그룹만 다시 나누면 이렇게 된다.

```python
import os
from pathlib import Path

import pandas as pd

from myproject.utils import seed_everything
```

한 그룹 안에서는 `import` 문과 `from ... import` 문을 이름 순으로 두는 습관이 읽기 좋다. isort의 기본 동작도 이 방향이다. 사람이 매번 알파벳을 맞출 필요는 없고, 그룹만 지켜도 PEP 8의 요구는 충족한다. 정렬은 도구에 맡긴다.

## 그룹 사이 빈 줄

PEP 8은 그룹마다 빈 줄을 두라고 말한다. 빈 줄이 없으면 세 종류가 한 덩어리로 보이고, 빈 줄이 두 줄 이상이면 서로 다른 구역처럼 벌어진다.

**나쁜 예**

```python
import os
from pathlib import Path
import pandas as pd
from myproject.utils import seed_everything
```

**좋은 예**

```python
import os
from pathlib import Path

import pandas as pd

from myproject.utils import seed_everything
```

파일에 표준 라이브러리만 있다면 빈 줄을 일부러 만들 필요는 없다. 그룹이 하나뿐이기 때문이다.

## 절대 import와 상대 import

절대 import는 프로젝트 루트에서 패키지 이름까지 모두 적는다. PEP 8은 이 형태를 권장한다. 파일을 어디로 옮겨도 출처가 문장 안에 남아 있다.

```python
from myproject.models.train import fit_model
from myproject.data.loader import load_frame
```

명시적 상대 import는 점 하나로 "이 패키지 안"을 가리킨다. 패키지 구조가 깊을 때 절대 경로를 반복하지 않아도 된다. PEP 8은 이것도 허용한다.

```python
# myproject/models/train.py
from .metrics import rmse
from ..data.loader import load_frame
```

점은 현재 패키지, 점 두 개는 상위 패키지다. 상대 import는 패키지 안에서 import될 때만 동작한다. `python train.py`처럼 스크립트를 직접 실행하면 패키지 문맥이 없어서 실패할 수 있다. 진입 스크립트는 절대 import로 두고, 패키지 내부 모듈만 상대 import를 쓴다.

`import myproject.utils`처럼 모듈을 통째로 가져와도 되고, `from myproject.utils import seed_everything`처럼 이름을 꺼내도 된다. 짧은 스크립트에서는 이름을 꺼내는 편이 호출이 짧다. 출처를 호출마다 드러내고 싶으면 모듈 import가 낫다. 한 파일 안에서는 한 방식으로 맞춘다.

## 한 줄에 import 하나

`import`는 한 줄에 모듈 하나만 적는다. 쉼표로 여러 모듈을 붙이면 추가와 삭제가 diff에 잘 안 남고, 도구가 줄을 나누기도 어렵다.

**나쁜 예**

```python
import os, sys
```

**좋은 예**

```python
import os
import sys
```

한 모듈에서 여러 이름을 꺼내는 `from`은 예외다. PEP 8은 이 형태를 허용한다.

```python
from pathlib import Path, PurePath
```

이름이 길어져 한 줄을 넘으면 괄호로 나눈다.

```python
from myproject.features import (
    build_features,
    encode_categories,
    select_columns,
)
```

## 와일드카드 import를 피하기

`from module import *`는 그 모듈의 공개 이름을 현재 파일에 모두 풀어 놓는다. 이름이 어디서 왔는지 안 보이고, 나중에 import한 모듈이 같은 이름을 덮어쓸 수 있다. PEP 8은 와일드카드 import를 피하라고 말한다.

**나쁜 예**

```python
from numpy import *
from myproject.utils import *

result = array(rows)
```

필요한 이름만 적으면 출처가 파일 맨 위에 남는다.

**좋은 예**

```python
import numpy as np

from myproject.utils import seed_everything

result = np.array(rows)
seed_everything(7)
```

이름이 많을 때는 모듈에 별칭을 붙이는 편이 목록을 늘리는 것보다 낫다. `numpy`는 `np`, `pandas`는 `pd`처럼 이미 자리 잡은 별칭을 그대로 쓴다.

## 좋은 예와 나쁜 예

학습 스크립트 맨 위를 두 가지로 적으면 차이가 분명하다. 나쁜 예는 그룹이 섞여 있고, 한 줄에 모듈이 둘이며, 와일드카드가 들어 있다.

**나쁜 예**

```python
from myproject.utils import *
import pandas as pd, numpy as np
import os, sys
from pathlib import Path
from sklearn.model_selection import train_test_split
```

좋은 예는 표준 라이브러리, 서드파티, 로컬 순이고, 그룹 사이에 빈 줄이 하나 있다. 각 `import`는 한 줄이다.

**좋은 예**

```python
import os
import sys
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

from myproject.utils import seed_everything
```

패키지 안의 모듈이라면 로컬 그룹만 상대 import로 바꿔도 된다.

```python
import os
from pathlib import Path

import pandas as pd

from ..data import load_frame
from .metrics import rmse
```

## PEP 8에서 같이 보는 규칙

import 순서는 PEP 8의 한 절이다. 같은 문서가 들여쓰기, 줄 길이, 빈 줄, 공백, 이름, 주석, 비교도 정한다. 스타일 도구를 붙이기 전에 이 범위만 알아 두면, 린터가 왜 경고하는지 읽을 수 있다.

### 들여쓰기

들여쓰기는 4칸 스페이스다. 탭은 쓰지 않는다. 함수 인자가 길어지면 줄바꿈한 뒤 한 단계 더 들여쓰거나, 여는 괄호에 맞춘다.

```python
def train_model(frame, target, epochs, lr):
    return frame
```

```python
def train_model(
    frame,
    target,
    epochs,
    lr,
):
    return frame
```

한 줄에 문장을 여러 개 두지 않는다. `if` 본문을 같은 줄에 붙이는 형태도 피한다.

**나쁜 예**

```python
if ready: train()
```

**좋은 예**

```python
if ready:
    train()
```

### 줄 길이

PEP 8의 기준은 코드 79자, 주석과 docstring 72자다. 팀이 합의하면 99자까지 늘려도 된다고 적혀 있다. black과 ruff format의 기본값은 88자다.

숫자를 외우기보다 저장소에서 하나를 고르고 포매터에 맞추는 편이 낫다. PEP 8만 따를 거면 79, black을 쓸 거면 88. 중요한 것은 파일이 섞이지 않는 것이다.

긴 식은 괄호 안에서 줄을 나눈다. 백슬래시로 줄을 잇는 방법은 괄호로 대체할 수 있을 때 쓰지 않는다.

```python
score = (
    accuracy
    + f1
    + roc_auc
) / 3
```

### 빈 줄

최상위 함수와 클래스 사이에는 빈 줄을 두 개 둔다. 클래스 안의 메서드 사이에는 한 개면 된다. 함수 안에서는 논리 덩어리가 바뀔 때만 드물게 넣는다.

```python
SEED = 7


def load_frame(path):
    return path


class Trainer:
    def fit(self, frame):
        return frame

    def evaluate(self, frame):
        return frame
```

import 그룹의 빈 줄 한 개와, 최상위 정의의 빈 줄 두 개는 역할이 다르다. 위쪽은 의존성 구분이고, 아래는 함수와 클래스의 경계다.

### 공백

쉼표 뒤, 연산자 양쪽에는 공백을 둔다. 괄호 안쪽, 쉼표 앞, 함수 이름과 괄호 사이에는 두지 않는다. 키워드 인자와 기본값의 `=` 주변에도 공백을 넣지 않는다. 타입 힌트와 기본값이 함께 있을 때만 `=` 양옆에 공백을 둔다.

**나쁜 예**

```python
def scale( values,factor = 1 ) :
    total=values[ 0 ]+factor
    return total
```

**좋은 예**

```python
def scale(values, factor=1):
    total = values[0] + factor
    return total
```

```python
def scale(values: list, factor: float = 1.0) -> float:
    return values[0] + factor
```

세로로 맞추려고 `=` 앞에 공백을 여러 개 넣는 정렬은 PEP 8에서 피하는 쪽이다. 이름이 바뀌면 줄 전체가 diff로 남기 때문이다.

**나쁜 예**

```python
lr     = 0.01
epochs = 10
```

**좋은 예**

```python
lr = 0.01
epochs = 10
```

슬라이스 콜론 주위에도 불필요한 공백을 넣지 않는다. `rows[1:10]`, `rows[::2]`처럼 붙인다.

### 이름 규칙

이름은 역할을 드러내는 정도로만 길면 된다. PEP 8의 형태는 단순하다.

- 함수와 변수는 `snake_case`
- 클래스는 `CapWords`
- 상수는 `UPPER_SNAKE`
- 모듈과 패키지는 짧은 소문자. 가독성이 필요하면 밑줄
- 내부용 이름에는 `_`를 앞에 붙인다

**나쁜 예**

```python
maxepochs = 10

def LoadData(P):
    return P
```

**좋은 예**

```python
MAX_EPOCHS = 10


def load_data(path):
    return path
```

`l`, `O`, `I` 한 글자는 숫자와 헷갈리므로 피한다. 반복 변수가 필요하면 `index`, `row`, `name`처럼 적는다.

노트북에서 `df`는 흔하지만, 공개 함수의 인자 이름으로는 `frame`이나 `features`처럼 역할을 적는 편이 호출부에서 읽힌다.

### 주석과 docstring

주석은 코드가 말하지 못하는 이유만 적는다. "리스트를 순회한다"처럼 다음 줄을 다시 말하는 문장은 빼도 된다. 문장으로 쓰고, 최신 내용과 어긋나면 고치거나 지운다.

공개 모듈, 함수, 클래스, 메서드에는 docstring을 둔다. 삼중 따옴표를 쓰고, 한 줄 요약으로 시작한다. 인자 설명이 필요하면 요약을 빈 줄로 나눈 뒤에 적는다.

**나쁜 예**

```python
def split_frame(frame, test_size):
    # 분할한다
    return frame
```

**좋은 예**

```python
def split_frame(frame, test_size=0.2):
    """학습 집합과 검증 집합을 반환한다.

    test_size는 전체 행 대비 검증 비율이다.
    """
    return frame
```

인라인 주석은 코드와 두 칸 띄고 `#`로 시작한다. 남발하지 않는다.

```python
seed = 7  # 재현을 위해 실험 전체에서 고정한다
```

### 비교

`None`과의 비교는 `is`, `is not`을 쓴다. `== None`은 쓰지 않는다. 부정은 `if not x is None`이 아니라 `if x is not None`이다.

**나쁜 예**

```python
if value == None:
    skip = True
```

**좋은 예**

```python
if value is None:
    skip = True

if value is not None:
    skip = False
```

타입은 `type(x) == int` 대신 `isinstance`로 확인한다. 상속된 타입도 통과하고, 여러 타입은 튜플로 적는다.

**나쁜 예**

```python
if type(value) == int or type(value) == float:
    number = value
```

**좋은 예**

```python
if isinstance(value, (int, float)):
    number = value
```

비어 있는 리스트, 문자열, `None`이 아닌 컨테이너는 길이를 재기보다 객체 자체를 조건으로 쓴다. 빈 컨테이너는 거짓이다.

**나쁜 예**

```python
if len(rows) == 0:
    return

if flag == True:
    train()
```

**좋은 예**

```python
if not rows:
    return

if flag:
    train()
```

`== True`와 `== False`는 비교가 아니라 값 자체를 조건으로 쓰는 편이 PEP 8의 권고와 맞다.

## 도구

규칙을 외워서 맞추기보다, 저장하고 커밋하기 전에 도구가 고치게 두는 편이 낫다. 네 도구의 역할은 겹치되 같지 않다.

### isort

isort는 import 순서만 담당한다. 표준 라이브러리, 서드파티, 로컬로 나누고 그룹 사이에 빈 줄을 넣으며, 같은 그룹 안에서는 이름을 정렬한다.

```bash
pip install isort
isort --profile black .
```

`--profile black`은 black이 선호하는 줄바꿈과 충돌하지 않게 맞추는 설정이다. black과 함께 쓸 때 이 프로파일을 둔다.

### black

black은 들여쓰기, 줄 길이, 공백, 따옴표를 정해진 형식으로 다시 쓴다. 옵션이 거의 없어서 팀원마다 다른 결과가 나오지 않는다. 기본 줄 길이는 88이다. import 순서는 바꾸지 않는다.

```bash
pip install black
black .
```

black을 쓰면 "공백을 어디에 둘까"를 리뷰에서 빼도 된다. 리뷰에는 그룹이 맞는지, 이름이 맞는지, 동작이 맞는지만 남는다.

### ruff

ruff는 린트와 포맷을 한 실행 파일에서 처리한다. `E`, `F`는 flake8 계열 검사에 가깝고, `I`는 isort 계열 import 정렬이다. `ruff format`은 black과 호환되는 포매터다.

```bash
pip install ruff
ruff check .
ruff check --select I --fix .
ruff format .
```

프로젝트 루트에 범위를 적어 두면 로컬과 CI가 같은 규칙을 본다.

```toml
[tool.ruff]
line-length = 88

[tool.ruff.lint]
select = ["E", "F", "I"]
```

`ruff check --fix`는 import 순서와 일부 스타일 경고를 직접 고친다. 고칠 수 없는 항목만 메시지로 남는다.

### flake8

flake8은 스타일과 명백한 오류를 검사한다. 파일을 수정하지는 않는다. 기본 줄 길이는 79다. black의 88과 같이 쓰려면 줄 길이 설정을 맞춰야 경고가 줄지 않는다.

```bash
pip install flake8
flake8 .
```

import 그룹 순서는 flake8 본체만으로는 검사하지 않는다. 그 검사는 isort나 ruff의 `I` 규칙이 맡는다. 새로 고르는 조합이라면 ruff 하나로 린트, import, 포맷을 묶는 경우가 많다. 이미 flake8 설정이 있는 저장소라면 그 설정을 유지한 채 isort만 추가해도 import 규칙은 충족된다.

도구를 붙인 뒤에도 PEP 8이 대신하지 못하는 부분이 있다. 그룹에 서드파티와 로컬을 사람이 구분할 수 있게 패키지 이름이 분명해야 하고, 함수 이름은 여전히 작성자가 고른다. 포매터는 공백을 맞추고, 순서는 isort나 ruff가 맞추고, 이름의 의미는 리뷰가 본다.
