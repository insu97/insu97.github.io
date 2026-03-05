---
layout: markdown
title: "배드민턴 통계 챗봇 개발기 — Text-to-SQL + RAG 하이브리드"
date: 2026-03-05
categories: [Project, AI]
tags: [RAG]
---

## 프로젝트 개요

배드민턴 동호회 경기 기록을 자연어로 조회할 수 있는 AI 챗봇을 개발했습니다.

- **기간**: 2026.02 ~ 2026.03 (개인 프로젝트)
- **배포**: [https://bm-stats-chatbot.streamlit.app](https://bm-stats-chatbot.streamlit.app)
- **GitHub**: [https://github.com/insu97/badminton-stats-chatbot](https://github.com/insu97/badminton-stats-chatbot)

---

## 배경 및 문제 정의

배드민턴 동호회를 운영하면서 경기 기록을 Google Sheets로 관리하고 있었습니다.  
매번 승률을 확인하려면 스프레드시트를 직접 열고 필터링해야 했고,  
경기 후기 같은 정성적인 데이터는 별도 텍스트 파일로 흩어져 있었습니다.

**핵심 문제:**
- 통계 조회가 불편 (매번 수작업)
- 정량 데이터(승률, 득실점)와 정성 데이터(후기)가 분리되어 있음
- 자연어로 "내 승률이 어때?" 같은 질문에 바로 답할 수 없음

---

## 해결 아키텍처

```
User Prompt
    │
    ▼
Hybrid Router (LLM)
    ├── 통계 질문 → Text-to-SQL → SQLite → 결과 반환
    └── 후기 질문 → RAG → FAISS Vector DB → 결과 반환
    │
    ▼
LLM Response (GPT-4o-mini)
```

질문 의도를 LLM이 분석해서 **정량 분석(SQL)** 과 **정성 분석(RAG)** 중 적합한 방식으로 자동 라우팅합니다.

---

## 기술 스택

| 구분 | 기술 |
|---|---|
| Language | Python 3.13 |
| Framework | LangChain, Streamlit |
| LLM | OpenAI GPT-4o-mini |
| DB (정형) | SQLite |
| DB (비정형) | FAISS (Vector DB) |
| 데이터 소스 | Google Sheets API |
| 배포 | Streamlit Cloud |

---

## 주요 구현

### 1. DB 자동 생성 (db_loader.py)

Google Sheets에서 경기 기록을 불러와 SQLite DB를 자동 생성합니다.  
통계는 직접 입력받지 않고, 경기 기록에서 **자동 계산**합니다.

```python
def calc_player_stats(matches_df):
    """경기 기록에서 개인 통계 자동 계산"""
    stats = {}
    for _, row in matches_df.iterrows():
        # 승자/패자 분류 후 승률, 득실점 계산
        ...
    return pd.DataFrame(stats).T
```

시즌 컬럼을 자동 감지해서 전체 통계와 시즌별 통계를 모두 생성합니다.

### 2. RAG 파이프라인 (rag_loader.py)

경기 후기 텍스트 파일을 벡터화해서 FAISS에 저장합니다.  
파일명에서 날짜를 추출해 메타데이터로 추가, 최신 경기 후기 검색 정확도를 높였습니다.

```python
def load_reviews():
    docs = []
    for file in glob("data/reviews/[!sample]*.txt"):
        # 파일명에서 날짜 추출
        date = extract_date_from_filename(file)
        content = open(file).read()
        docs.append(Document(
            page_content=f"[날짜: {date}]\n{content}",
            metadata={"date": date}
        ))
    return docs
```

### 3. 하이브리드 라우터 (chain.py)

```python
def route_question(question):
    """질문 의도에 따라 SQL 또는 RAG 선택"""
    router_prompt = f"""
    다음 질문이 통계/수치 관련이면 'sql',
    경기 후기/느낌 관련이면 'rag'로만 답하세요.
    질문: {question}
    """
    intent = llm.invoke(router_prompt).content.strip()
    return intent
```

---

## 트러블슈팅

### 하이픈 포함 컬럼명 SQL 오류

`팀A-1`, `팀B-1` 같은 컬럼명을 SQLite가 빼기 연산자로 인식하는 문제가 있었습니다.

```
# 오류
SELECT 팀A-1 FROM matches  →  팀A 마이너스 1로 해석

# 해결: 프롬프트에 규칙 추가
"하이픈 포함 컬럼명은 큰따옴표로 감싸세요"
SELECT "팀A-1" FROM matches  →  정상 동작
```

### RAG 날짜 컨텍스트 문제

"가장 마지막 경기 후기" 질문 시 최신 파일이 아닌 오래된 파일이 검색되는 문제가 있었습니다.

```python
# 해결: 검색 쿼리에 날짜 명시적 추가
query = f"{latest_date} 날짜 경기 {question}"
```

### 괄호 불균형 SQL 생성

LLM이 가끔 `WHERE (조건;` 처럼 닫는 괄호가 없는 SQL을 생성했습니다.

```python
def clean_sql(sql):
    # 괄호 균형 보정
    open_count = sql.count('(')
    close_count = sql.count(')')
    if open_count > close_count:
        sql = sql.rstrip(';') + ')' * (open_count - close_count) + ';'
    return sql
```

---

## 결과

- Streamlit Cloud 배포 및 실제 서비스 운영 중
- 자연어로 통계 질문과 후기 질문을 모두 처리
- 시즌별 통계 자동 계산으로 Google Sheets 구조 단순화

---

## 회고

**잘한 점**
- 기획부터 배포까지 end-to-end 단독 수행
- 실제 사용하는 데이터로 실용적인 서비스 구축
- 버그를 만날 때마다 프롬프트 규칙과 코드 방어 로직 양쪽에서 접근

**아쉬운 점 / 개선 계획**
- LangSmith 연동으로 응답 품질 모니터링 추가 예정
- Airflow DAGs로 DB 자동 동기화 파이프라인 구축 예정 (LLMOps)
- GraphRAG 도입으로 선수 간 관계 분석 고도화 검토 중

---

## 링크

- **Live Demo**: [https://bm-stats-chatbot.streamlit.app](https://bm-stats-chatbot.streamlit.app)
- **GitHub**: [https://github.com/insu97/badminton-stats-chatbot](https://github.com/insu97/badminton-stats-chatbot)