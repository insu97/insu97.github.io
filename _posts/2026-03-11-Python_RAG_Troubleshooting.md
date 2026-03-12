---
layout: markdown
title: Python RAG Reranker 오류 해결
tags: [Python, Troubleshooting, RAG]
toc: true
---

{% include markdown.html %}

## RAG - Reranker

### 재현 코드

```python
from langchain_community.cross_encoders import HuggingFaceCrossEncoder

hf_reranker = HuggingFaceCrossEncoder(
    model_name="BAAI/bge-reranker-v2-m3"
)
```

### 증상 (오류 메시지)

```text
Error rendering output item using 'jupyter-ipywidget-renderer'
Cannot read properties of undefined (reading 'ipywidgetsKernel')
```

### 원인

- `ipywidgets` 렌더러/확장 모듈 미설치 또는 버전 불일치

### 해결 방법

```bash
pip install ipywidgets --upgrade
jupyter nbextension enable --py widgetsnbextension --sys-prefix
jupyter nbextension install --py widgetsnbextension --sys-prefix
```