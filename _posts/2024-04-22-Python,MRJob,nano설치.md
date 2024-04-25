---
title : Python, MRJob, nano 설치
layout : markdown
tags: [hadoop, hadoop-udemy]
---

{% include markdown.html %}

1. virtualbox 실행
2. putty 실행 -> 로그인
3. **su root** 실행
4. 초기 비밀번호 입력 : **hadoop** -> 다시 한번 **hadoop** 입력 후 비밀번호 변경
> $ 대신 # 이 있으면 OK -> 모든 권한이 있다고 판단  
5. **yum-config-manager --save --setopt=HDP-SOLR-2.6-100.skip_if_unavailable=true** 입력
6. **yum install https://repo.ius.io/ius-release-el7.rpm https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm** 입력 후 y
7. **yum install python-pip** 입력 -> y 입력
8. **pip install pathlib** 입력
9. **pip install mrjob==0.7.4** 입력
10. **pip install PyYAML==5.4.1** 입력
11. **yum install nano** 입력
