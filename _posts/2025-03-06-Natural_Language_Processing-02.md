---
layout: markdown
title: Natural Language Processing - 02
tags: [DL, NLP]
toc: true
---

{% include markdown.html %}

# 텍스트 전처리

- 방법
> HTML 태그, 특수문자, 이모티콘  
> 정규표현식  
> 불용어 : 분석에 큰 의미가 없는 단어로 코퍼스 내에 빈번하게 등장하나, 실질적으로 의미를 갖고 있지 않은 용어  
> 어간추출  : 어형이 변형된 단어로부터 접사 등을 제거하고 그 단어의 어간을 분리해내는 것 < 포터 스태머 알고리즘 >  
> 표제어추출(Lemmatization) : 품사 정보가 보존된 형태의 기본형으로 변환

- 라이브러리 : KoNLPy, NLTK, SentencePiece

## 토큰화(Tokenization)

1. 주어진 데이터를 토큰이라 불리는 단위로 나누는 작업
2. 토큰이 되는 기준은 다를 수 있음

### 문장 토큰화

문장 분리

### 단어 토큰화

구두점 분리, 단어 분리

### 편집거리(Edit distance)

- Levenshtein distance
   1. 한 string s1 을 s2로 변환하는 최소 횟수를 두 string 간의 거리. 거리가 낮을수록 유사한 문자열로 판단함

### 정규표현식(Regex)

특정한 규칙을 가진 문자열의 집합을 표현하는 데 사용하는 형식 언어

### 고려사항

1. 구두점이나 특수 문자를 단순 제외
2. 줄임말과 단어 내 띄어쓰기
3. 문장 토큰화 : 단순 마침표를 기준으로 자를 수 있음

## 텍스트 정제

코퍼스 내에서 토큰화 작업에 방해가 되거나 의미가 없는 부분의 텍스트, 노이즈를 제거하는 작업

# 자연어처리의 다양한 응용시스템

## 자연어이해 기반 하위분야

- 형태소 분석
   > 어떠한 문자열이 주어졌을 때, 그 문자열을 이루고 있는 형태소를 비롯한 어근, 접두사, 접미사, 품사 등 다양한 언어적 속성의 구조를 파악하는 것
- 품사 태깅
   > 형태소 분석을 한 결과의 각 형태소에 품사 태그를 할당하는 과정

- 형태소 분석기
1. HMM : Hidden Markov Model
   - 통계적 마르코프 모델의 하나, 어떠한 결과를 야기하는 원인은 은닉 상태인 이전의 여러 연속된 사건들이라고 보는 모델
   - 바로 직전의 단계에서만 직접적인 영향을 받고, 이전의 상태들은 연속적이며 내재적으로 담겨있음
2. CRF : Conditional Random Field
   - 시퀀스 라벨링(어떠한 배열을 입력으로 받으면 그와 같은 길이의 결과 반환)에 많이 사용
   - 특징 함수(Feature function)을 정의
3. Charater-Lavel Bidirectional LSTM-CRF
   - 띄어쓰기 오류 등의 문제로 한국어 형태소를 처리할 때는 음절 단위를 입력으로 받아 형태소를 분석하는 모델이 좋은 성능을 보임

- 개체명 인식 - 의학분야 개체명 인식 시스템, 태깅 시스템, 한국어 NER 데이터셋
- 정보추출 : 비구조적인 triple를 추출하는 태스크
   > triple이란? 두 개체 간의 관계를 <주어, 관계, 목적어>으로 나타낸 구조  
   - 구조
     1. 입력된 문서를 문장단위로 **분할**
     2. 각 문장을 **토큰화**
     3. 품사 태깅을 통해 각 단어의 **품사를 파악**
     4. 품사를 기준으로 **엔티티를 추출**
     5. 술어, 주어, 객체에 대한 관계파악을 위해 텍스트에서 서로 가까이 있는 엔티티쌍의 **특정 패턴을 추출**
- 규칙 기반 접근 : 문장에서 문법적 속성에 대한 규칙 세트를 정의한 다음 규칙을 사용하여 정보를 추출  
- 기계학습 기반 접근 : 다량의 데이터로부터 기계학습 알고리즘이 직접 패턴을 발견해 학습

# 자연어생성 기반 하위분야

- 기계번역
   1. 규칙 기반 기계 번역
   2. 통계 기반 기계 번역
   3. 신경망 기반 기계 번역(NMT : Neural Machine Translation) : Sequence to Sequence

- 질의응답
   1. 질문처리 : 질문유형 분류 및 정답 유형 분류
   2. 문서처리 : 정답을 포함, 관련성이 높은 문서 혹은 문장을 검색
   3. 정답처리 : 검색된 문서 혹은 문장에서 정답 후보에 해당하는 개체, 어휘, 구 등을 추출
   - IR + QA [ 정보검색 , 질의응답 ]
   - 대화형 질의응답
   - Visual Question Answering
   - Large Vision-Language Model
   - New VQA Task

- 대화 시스템
   1. 목적 지향 대화 시스템 : 특정한 목적 또는 작업을 수행하는 것이 목표
     - 파이프라인 방식
     - 자연어 이해 : 도메인 확인, 의도 파악, 슬롯 채우기
     - 대화 상태 추적(DST, Dialog State Tracking) : 발화자 의도, 목표와 요청을 정확하게 추적 하는 것
     - 자연어 생성 : 발화정보로부터 자연어 문장 생성
     - 음성 합성 : 자연어 문장의 음성 생성
     - 종단 간 학습
   2. 일상 대화 시스템
     - 검색 기반 방식
     - 생성 기반 방식
     - 검색-생성 혼합 방식

- 문서 요약
   1. 추출 요약
   2. 추상적 요약
   3. Multi documents summarization : 복수개의 문서를 요약하는 작업
   4. Long documents summarization : 길이가 매우 긴 문서를 요약하는 작업으로 다양한 접근 방식
   5. Unsupervised summarization : 상대적 중요도를 측정하는 중요도 점수를 기반으로 주어진 문장에서 중요한 부분을 추출

# 자연어처리의 특이한 분야

- Hate Speech Detection : 인터넷 상에서 발생하는 혐오 발언 및 공격적 표현을 자동으로 탐지하고 분류하는 기술
   - 대표 데이터셋 : HateXplain
- Counter Speech Generation
   - 혐오 및 허위정보가 내제, 외재된 대화 또는 문장들에 대해 모델이 신뢰성 있는 근거가 내포된 문장을 생성함으로써
   - 적절하게 대응할 수 있도록 하는 Task
   - 대표 방법론 : Author-Reviewer framework, Generate, Prune, Select
   - 대표 데이터셋 : CONAN, ProsocialDialog
- Sarcasm Detection : 텍스트 또는 음성 데이터에서 풍자적 의미나 반어법적 말을 감지하고 인식하는 Task
   - 대표 데이터셋 : iSarcasm
- Fake News Detection
   - 인터넷 상에서 유표되는 정보 중에서, 사실과 다른 정보, 혹은 과장된 정보를 식별하고 분류하는 Task
   - 대표 데이터셋 : LIAR
- Fact Checking
   - 미디어나 인터넷 상에서 유포되는 정보의 진실성을 확인하는 Task
   - 대표 데이터셋 : FEVER
- Machine Translation
   - WMT(Workshop on Machine Translation)
   - Quality Estimation : 기계 번역된 문장이 얼마나 잘 번역을 하고있는지의 품질을 예측하는 Task
     - 대표 데이터셋 : QUAK
   - Automatic Post Editing : 기계 번역의 출력물에서 번역 오류, 문법적 오류 등을 자동으로 수정하는 Task
     - 대표 데이터셋 : SubEdits
   - Word-Level AutoCompletion : 소스 문장, 번역 컨텍스트 및 사람이 입력한 문자 시퀀스가 주어지면 대상 단어를 예측하는 Task
   - Chat Translation : 채팅, 일상대화 분야의 구어체에 대해 기계번역을 수행하는 Task

- Dialogue
   - Persona-grounded Dialogue : 개별 사용자가 갖는 여러 개인적 특성을 고려해 personalized 된 대화를 생성하는 Task
     - 대표 데이터셋 : PersonaChat, BSBT, FoCus
   - Persuasive Dialogue : 상대방을 설득하기 위한 목적의 대화, 모델이 상대방을 설득하고 자신의 주장을 전달하기 위해 응답 발화를 생성하는 Task
     - 대표 데이터셋 : Persuasion for Good
   - Dialogue Summarization : 대화 기록이나 대화 데이터를 기반으로 중심 정보들을 재구성하여 요약하는 Task
     - 대표 데이터셋 : DialogSum & SAMSum
   - Knowledge-grounded Dialogue
     - 대화 시 외부정보가 필요한 경우, Pre-train model 외에 외부 지식을 별도로 활용하여
     - 자연스럽고 전문적인 정보를 제공할 수 있는 대화를 생성하는 Task
     - 대표 데이터셋 : Wizard Of Wikipedia & Wizard Of Internet

- 기타
   1. Question Generation : 주어진 지문으로 부터 도출될 수 있는 질문들을 생성하는 Task
     - 대표 데이터셋 : FairytaleQA
   2. Document-level Relation Extraction : 문서 전체에서 개체에 대한 속성과 관계를 예측하는 Task
     - 대표 데이터셋 : DocRED
   3. Instruction Tuning : 사람이 원하는 방식의 대답을 이끌어내기 위한 instruction을 통해 대규모 언어 모델(LLM)을 미세 조정하는 데 사용되는 방법
     - 대표 데이터셋 : Super Natural Instructions
     - 대표 방법론 : InstructGPT, Alpaca
   4. LLM Evaluation : LLM의 유창성, 일관성, 관련성, 정확성 등 모델 성능의 다양한 측면을 평가해 동작에 대한 인사이트를 얻고 개선점을 파악하고자하는 분야
   5. Huggingface Open LLM : 사용자가 다양한 작업에서 다양한 대규모 언어 모델의 성능을 평가하고 비교할 수 있도록 해주는 Huggingface Platform
     - 대표 데이터셋 : AI2 Reasoning Challenge, HellaSwag, MMLU, TruthfulQA

- 한국어 관련 Task
   1. 고전어 데이터셋
   2. 케어콜 데이터셋
   3. 혐오 발언 탐지 데이터셋
   4. 쓰기 평가 데이터셋
   5. 문법 교정 데이터셋
