---
layout: markdown
title: Python 환경 및 패키지 관리
tags: [Python, Python_Setup]
toc: true
---

{% include markdown.html %}

## 가상환경 설정

### Windows - Anaconda

**명령어 형식**

```cmd
conda create -n {가상환경명} python={파이썬버전}
conda activate {가상환경명}
conda deactivate
```

**예시**

```cmd
conda create -n venv python=3.11
conda activate venv
conda deactivate
```

### Windows - uv

```cmd
pip install uv
uv venv --python 3.11
.venv\Scripts\activate
```

## 라이브러리 관리

### 방법 1: pip freeze 기반

```bash
pip freeze > requirements.txt
pip install -r requirements.txt
```

### 방법 2: pipreqs 기반

```bash
pip install pipreqs
pipreqs ./ --force

# 폴더 내에 가상환경이 있는 경우
pipreqs . --force --ignore "{가상환경}/Lib"
```

### 방법 3: 특정 패키지 점검

```bash
pip freeze | grep cohere
```