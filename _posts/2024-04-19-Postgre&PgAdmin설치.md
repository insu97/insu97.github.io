---
title : PostgreSQL & PgAdmin 설치
layout : markdown
tags: [database, sql, sql-udemy]
---

{% include markdown.html %}

# Postgre 설치

1. 공식 사이트로 이동 : [download_site](https://www.postgresql.org/download/)
2. 사용환경에 해당하는 버튼 클릭
3. **Download the installer** 문구 클릭
4. 다운로드 시작
-> 실패 ( 오류 발샐 .. )

##  Postgre 설치 - 2차 시도

1. 권한, 한글 경로 등 전부 시도 -> 실패
2. 하위 버전 다운받기 -> 실패

## 해결

1. [download_site](https://get.enterprisedb.com/postgresql/postgresql-11.2-1-windows-x64.exe) 에 들어가서 다운 받으니까 성공...

## 다운로드 받은 후

1. 다운로드 받은 파일 실행
2. 비밀번호 지정
3. 설치

# PgAdmin 설치

1. 공식 사이트로 이동 : [download_site](https://www.pgadmin.org/)
2. 메인 페이지 사이드바에 다운로드 클릭
3. 사용환경에 해당하는 버튼 클릭
4. 다운로드
5. 설치

## PgAdmin 실행 error

-> <사용자명>/Appdata/Roaming/pgadmin 폴더 삭제 후 다시 실행

## PgAdmin 실행

1. PgAdmin 실행
2. 사이드 바에 있는 PostgreSql 버전 클릭 후 비밀번호 입력
3. database 파일을 받은 후 [ 따로 ] PostgreSql 우클릭 -> Server -> Create 클릭
4. database 이름 넣고 save
5. 사이드 바에 db 생성 확인 후 우클릭 -> Restore -> 파일 지정
6. Data Option -> Pre-data, Data, Post-data 활성화 -> Restore 클릭
7. 사이드 바에 db 우클릭 -> Query tool 클릭
8. 테이블 조회 쿼리 작성 후 f5 누르기 -> 잘 실행되는지 확인

** PgAdmin : GUI로서 실질적 쿼리를 실행하고 PostgreSql에 연결하기 위해 사용
