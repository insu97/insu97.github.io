---
layout: markdown
title: Natural Language Processing - 04
tags: [DL, NLP]
toc: true
---

{% include markdown.html %}

# 딥러닝 기반 자연어처리

- Sequence-to-sequence : 입력된 시퀀스(문장)을 다른 시퀀스로 변환하는 모델로, 인코더 RNN과 디코더 RNN로 구성
- Encoder : 입력 시퀀스를 받아들여 고정된 길이의 벡터로 변환함.
- Decoder : 문맥 벡털를 받아들여 출력 시퀀스를 생성

## RNN ( Recurrent Neural Networks )

- 장점
1. 모든 길이의 시퀀스를 입력으로 처리 가능
2. 시간에 따라 가중치를 공유하여, 입력 시퀀스가 길어져도 모델 크기가 증가하지 않음
3. 과거 정보를 고려하여 다음 시간의 출력을 계산함

- 단점
1. 매번 시간에 따라 출력을 계산하므로, 병렬 처리가 불가능하여 계산 속도가 느림
2. 입력 혹은 출력 시퀀스가 길어지면 오래전 정보를 반영하기 어려움(Long-term dependecy)
3. 현재 상태에 대한 미래 입력을 고려할 수 없음

- Gradient vanishing / exploding
> 기존 RNN의 역전파 과정에서 그래디언트가 너무 작아져서(Gradient vanishing) 가중치 업데이트가 잘 안 되거나,  
> 그래디언트가 너무 커져서(Gradient exploding) 가중치 값이 엄청나게 커지는 문제가 발생

## LSTM (Long Short-Term Memory)

RNN에서 발생하는 Long-term dependecy problem 완화 방법으로 LSTM은 cell state와 gate라는 메커니즘을 도입

- Forget gate
- Input gate
- Cell state
- Output gate

## GRU (Gated Recurrent Unit)

LSTM의 변형으로, 더 간단한 구조를 가짐


## Attention

문맥에 따라 집중할 단어를 결정하는 방식으로 문맥을 최대한 고려할 수 있는 핵심 방식

## Transformer

- Encoder의 구성요소
1. Self-Attention
2. Layer Normalization : 각 layer의 출력을 정규화하는 방법
3. Skip Connection
4. Feed-Forward Networks : 각 위치에서 독립적으로 동일하게 적용되는 두 개의 선형 변환으로 구성
   - 이는 모델이 각 단어를 독립적으로 처리하면서도, 전체 문장의 문맥을 고려할 수 있게 함
5. Multi-Head Attention

> Input Embeddings : 입력 데이터를 고차원 벡터로 변환하는 과정을 의미  
> Positional Encoding : 단어의 위치 정보를 포함할 수 있음

- Decoder의 구성요소
1. Auto-regressive
2. Teacher Forcing
3. Masked Self-Attention
4. Encoder-Decoder Attention : Decoder가 출력 시퀀스의 각 요소를 생성할 때, 입력 시퀀스의 모든 요소를 고려할 수 있게 함

> Causal Attention : 입력된 토큰까지의 정보만 Attention에 반영하고, 미래의 입력은 반영하지 않는 것
