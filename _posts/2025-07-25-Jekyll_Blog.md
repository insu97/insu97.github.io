---
layout: markdown
title: Jekyll Blog
tags: [Jekyll_Blog]
toc: true
---

{% include markdown.html %}

## ERROR

### Jekyll Build Error

- error 코드

```
Invalid date '<%= Time.now.strftime('%Y-%m-%d %H:%M:%S %z') %>': Document '.../0000-00-00-welcome-to-jekyll.markdown.erb' does not have a valid date in the YAML front matter.
```

- 해결 방법

  > GitHub Actions 환경에서 이 에러가 발생한 것이라면, 루트 디렉토리에 있는 \_posts/가 아닌 vendor/ 내부에 있는 템플릿 파일이 빌드 과정에 포함되지 않도록 설정해야 함.

  ```
  # _config.yml 에 아래 작성
  exclude:
  - vendor
  ```
