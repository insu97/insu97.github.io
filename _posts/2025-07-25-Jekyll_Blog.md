---
layout: markdown
title: Jekyll Blog
tags: [Jekyll_Blog]
toc: true
---

{% include markdown.html %}

## Settings

### 새로운 환경에서 설정

> 참고 사이트 : [jekyll document](https://jekyllrb-ko.github.io/tutorials/using-jekyll-with-bundler/)

1. RUBY 설치

> 참고 사이트 : [Ruby](https://rubyinstaller.org/)

** 내 ruby version : 3.2.9

2. bundler 설치

> 참고 사이트 : [Bundler](https://bundler.io/)

2-1. gemfile 이 존재할 때

```cmd
bundle install
```

2-2. gemfile 이 없을 때

Gemfile 작성

```gemfile
source 'https://rubygems.org'
gem 'nokogiri'
gem 'rack', '~> 2.2.4'
gem 'rspec'
```

명령어 입력

```cmd
bundle install
```

## ERROR

### Ruby와 bundler 호환성 문제

- error 코드

```
C:/Ruby34-x64/lib/ruby/gems/3.4.0/gems/bundler-2.1.4/lib/bundler/vendor/thor/lib/thor/error.rb:105:in '<class:Thor>': uninitialized constant DidYouMean::SPELL_CHECKERS (NameError)

    DidYouMean::SPELL_CHECKERS.merge!(
              ^^^^^^^^^^^^^^^^
Did you mean?  DidYouMean::SpellChecker
        from C:/Ruby34-x64/lib/ruby/gems/3.4.0/gems/bundler-2.1.4/lib/bundler/vendor/thor/lib/thor/error.rb:1:in '<top (required)>'
        from C:/Ruby34-x64/lib/ruby/gems/3.4.0/gems/bundler-2.1.4/lib/bundler/vendor/thor/lib/thor/base.rb:3:in 'Kernel#require_relative'
        from C:/Ruby34-x64/lib/ruby/gems/3.4.0/gems/bundler-2.1.4/lib/bundler/vendor/thor/lib/thor/base.rb:3:in '<top (required)>'
        from C:/Ruby34-x64/lib/ruby/gems/3.4.0/gems/bundler-2.1.4/lib/bundler/vendor/thor/lib/thor.rb:2:in 'Kernel#require_relative'
        from C:/Ruby34-x64/lib/ruby/gems/3.4.0/gems/bundler-2.1.4/lib/bundler/vendor/thor/lib/thor.rb:2:in '<top (required)>'
        from C:/Ruby34-x64/lib/ruby/gems/3.4.0/gems/bundler-2.1.4/lib/bundler/vendored_thor.rb:8:in 'Kernel#require_relative'
        from C:/Ruby34-x64/lib/ruby/gems/3.4.0/gems/bundler-2.1.4/lib/bundler/vendored_thor.rb:8:in '<top (required)>'
        from C:/Ruby34-x64/lib/ruby/gems/3.4.0/gems/bundler-2.1.4/lib/bundler/friendly_errors.rb:3:in 'Kernel#require_relative'
        from C:/Ruby34-x64/lib/ruby/gems/3.4.0/gems/bundler-2.1.4/lib/bundler/friendly_errors.rb:3:in '<top (required)>'
        from C:/Ruby34-x64/lib/ruby/gems/3.4.0/gems/bundler-2.1.4/exe/bundle:29:in 'Kernel#require_relative'
        from C:/Ruby34-x64/lib/ruby/gems/3.4.0/gems/bundler-2.1.4/exe/bundle:29:in '<top (required)>'
        from C:/Ruby34-x64/bin/bundle:25:in 'Kernel#load'
        from C:/Ruby34-x64/bin/bundle:25:in '<main>'
```

- 해결 방법

1. Ruby 버젼을 낮추기
2. 다시 설치과정을 거쳐서 확인

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
