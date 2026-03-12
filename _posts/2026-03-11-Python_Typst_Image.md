---
layout: markdown
title: Python Typst 이미지 변환
tags: [Python, Typst]
toc: true
---

{% include markdown.html %}

## 이미지 변환 (webp -> png)

```python
from PIL import Image

img = Image.open("image.webp")
img.save("image.png", "PNG")
```