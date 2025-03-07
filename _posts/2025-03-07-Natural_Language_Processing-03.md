---
layout: markdown
title: Natural Language Processing - 03
tags: [DL, NLP]
toc: true
---

{% include markdown.html %}

# 자연어처리의 역사

## 규칙기반 및 통계기반 자연어처리

- 규칙 기반 NLP
1. Rule에 맞게 처리하는 시스템
2. Rule 생성을 위해서는 Task에 대한 전문 지식 필요
3. 적은 양의 데이터로 일반화 기능
4. 결론 도출의 논리적 추론 가능
5. 학습에 필요한 데이터가 비교적 적게 필요
6. 이를 제작한 전문가의 실력을 넘어서기 매우 어려움
7. 해당 전문가의 오류를 동일하게 반복
8. 규칙 구축에 많은 시간과 비용 소요
9. Toy task에 주로 적용되었음

- 통계 기반 NLP
1. 대량의 텍스트 데이터로 통계를 내어 단어를 표현
2. "모두 (군중, 여러분)"가 "무의식적"으로 생산한 대량의 데이터(=빅데이터)를 활용
3. **통계적 언어모델(SLM)**
   > 이전 단어들로부터 다음 단어에 대한 확률을 구함 (확률기반)

- 비교

| Rule Based NLP | Statistical NLP |
| --- | --- |
| Flexible | Easy to scale |
| Easy to debug | Learn by itself |
| Doesn't require much training | Fast development |
| High precision | High coverage |

## 기계학습 및 딥러닝기반 자연어처리

- ML & DL in NLP
   1. "전문가" + "모두(군중, 여러분)" 공존의 시대
   2. 학습에 사용할 데이터의 질이 좋고 양이 많으면 인간의 실력을 넘어설 수 있음
   3. 인간이 생각하지 못한 새로운 방법을 사용할 수 있음
   4. Data hungry
   5. 결과에 대한 해석의 어려움
   6. 논리적 추론이 아닌 귀납적 근사에 의한 결론 생성
   7. 모델 : Neural Machine Translation

## 뉴럴심볼릭기반 자연어처리

전문가의 데이터를 전면 활용  
사전에 구축된 상식 정보를 지식 그래프 형태로 구축하여 딥러닝 모델에 주입

| Symbolic Approaches | Neural Models |
| --- | --- |
| 기호를 통해 개념을 정의하고 일정한 논리적 규칙에 따라 추론 기능 | 대량의 데이터를 이용해 다층 구조로 이루어진 인공신경망을 통해 귀납적 추론 가능 |
| 일반화 능력이 우수하며, 결론에 대한 설명이 가능한 방법 | 미분 가능한 방식으로 학습이 가능하며 높은 정확도를 나타냄 |
| 불안전한 KB에 의존하며 논리적 규칙에 의해 정의된 지식과 새롬게 생성되는 지식 간의 연결이 어려움 | 학습을 위해 대량의 데이터가 요구됨 |
| 미분 가능한 방식으로 학습이 어려움 | 학습 도메인에 귀속되어 전이 능력 부족 현상 |
| Toy Task 위주의 적용이 불가피함 | 결론 도출에 대한 설명력 부족 & 외부지식을 활용하기 어려움 |

- KB : Knowledge Base
- KGBERT
- Common Sense Knowledge Graph
   - 인간의 상식이나 지식에 기초해 작은 학습데이터로 많은 추론을 이끔
   - 상식을 entity, relation을 활용한 지식 베이스 그래프 형태로 표현
- Multi-hop Question Answering
   - 질문과 함께 거대한 지식 코퍼스가 주어졌을 때 답을 찾기 위해 말뭉치에 다중추론 점프(홈)를 수행하여 질문에 답하는 것
   - Entity 중심의 relation graph를 활용해 Multi-hop reasoning이 필요한 Question에 대한 응답을 추출

## Pretrain-Finetuning 기반 자연어처리

- Language Model : 대중이 만든 데이터(pre-train) + 전문가가 만든 데이터(Fine-tune)
- Pretraining : 내가 원하는 task 이외의 다른 task의 데이터를 이용하여 주어진 모델을 먼저 학습하는 과정
- Finetuning : 사전학습된 모델을 원하는 task에 해당하는 데이터, 학습 방식으로 다시한번 재학습 시키는 과정
- Language Model
   - Seq2Seq -> Attention + Seq2Seq -> Transformer -> GPT-1 -> BERT -> GPT-2
   - XLNet -> RoBERTa -> MASS -> BART -> MT - DNN -> T5

## LLM기반 자연어처리

데이터 양보다 모델 사이즈가 성능에 일관적으로 더 큰 영향을 미치며, 큰 모델이 좋음을 증명

- Foundation Models
- In-Context Few-Shot Learning & Prompt Learning
- 예시
   1. OpenAI의 GPT3
   2. Google의 PaLM(Scaling Language Modeling with Pathways)
   3. Meta의 LLaMA & LLaMA2
   4. Open AI의 DALL-e
   5. Kakao Brain 의 KoGPT
   6. Kakao Brain 의 Min DALL-E
   7. Naver AI Lab 의 HyperCLOVA
   8. LG AI Research 의 EXAONE
- ChatGPT
   - Supervised Fine-tuning 과 Reinforce Learning with Human Feedback 으로 학습
   - 사람의 지시에 잘 따르며 수많은 task들을 잘 수행하는, 사람이 원하는 방향의 응답을 생성하는 AI
