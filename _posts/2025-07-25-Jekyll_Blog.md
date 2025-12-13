---
layout: markdown
title: Jekyll Blog
tags: [Jekyll_Blog]
toc: true
---

{% include markdown.html %}

## Settings

### 새로운 환경 설정
- 참고: [Jekyll with Bundler](https://jekyllrb-ko.github.io/tutorials/using-jekyll-with-bundler/)

#### 1) Ruby 설치
- 참고: [Ruby Installer](https://rubyinstaller.org/)
- 현재 사용 버전: 3.2.9

#### 2) Bundler 설치 및 사용
- 참고: [Bundler](https://bundler.io/)

- Gemfile이 있는 경우:
```bash
bundle install
```

- Gemfile이 없는 경우:

  1) Gemfile 작성
```ruby
source 'https://rubygems.org'
gem 'nokogiri'
gem 'rack', '~> 2.2.4'
gem 'rspec'
```
  2) 설치 실행
```bash
bundle install
```

## ERROR

### Ruby ↔ Bundler 호환성 문제
에러 예시:
```text
C:/Ruby34-x64/... NameError: uninitialized constant DidYouMean::SPELL_CHECKERS
```
해결:
- Ruby 버전을 호환되는 버전으로 조정
- Bundler 재설치 및 다시 시도

### Jekyll Build Error
에러 예시:
```text
Invalid date '<%= Time.now.strftime('%Y-%m-%d %H:%M:%S %z') %>': ... does not have a valid date in the YAML front matter.
```
해결:
- GitHub Actions 환경에서 `vendor/` 내부 템플릿이 빌드에 포함되지 않도록 설정
```yaml
# _config.yml
exclude:
        - vendor
```

## SEO: Sitemap.xml 설정 가이드

### 개요
- 검색 엔진이 사이트 구조를 빠르게 파악하고 색인하는 데 사용하는 XML 파일입니다.

### 설정 절차 (3단계)
1. Gem 추가
```ruby
# Gemfile
gem 'jekyll-sitemap'
```

2. Jekyll 설정 업데이트
```yaml
# _config.yml
url: "https://insu97.github.io"   # 자신의 GitHub Pages 도메인
plugins:
        - jekyll-sitemap
```

3. robots.txt 추가(권장)
```text
# robots.txt (루트에 생성)
User-agent: *
Allow: /
Sitemap: https://insu97.github.io/sitemap.xml
```

### 확인 방법
- 로컬
```bash
bundle install
bundle exec jekyll serve
# http://localhost:4000/sitemap.xml 에서 확인
```
- 배포 후
        - `https://insu97.github.io/sitemap.xml` 접속
        - Google Search Console → Sitemaps에 제출

### 주의사항
- `_config.yml`의 `url`은 실제 도메인으로 정확히 설정합니다.
- `plugins`에 `jekyll-sitemap`이 포함되어 있어야 자동 생성됩니다.
