---
title : Hadoop-Putty
layout : markdown
tags: [hadoop, hadoop-udemy]
toc : true
---

{% include markdown.html %}

1. Putty 다운로드 : [putty download](https://putty.org/)
2. putty 실행 후 port번호 2222 입력, Connection type : SSH -> Saved Sessions : HDP 입력 후 Save
3. 비밀번호 입력 후 접속

> HDFS를 리눅스 호스트의 명령줄로 조작하려면 **hadoop fs -** 다음에 원하는 명령어 입력

1. **hadoop fs -ls** : 파일 보기
2. **hadoop fs -mkdir ml-100k** : ml-100k 폴더 생성
3. **wget http://media.sundog-soft.com/hadoop/ml-100k/u.data** : 웹상에서 데이터 다운로드
4. **ls -al** : 파일 보기
5. **hadoop fs -copyFromLocal u.data ml-100k/u.data** : 로컬 데이터를 하둡에 전달
6. **hadoop fs -ls ml-100k** : 데이터 확인
7. **hadoop fs -rm ml-100k/u.data** : 데이터 삭제
8. **hadoop fs -rmdir ml-100k** : 폴더 삭제
9. **exit** : 종료

> **hadoop fs** : 사용할 수 있는 명령어 보기
