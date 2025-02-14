---
layout : markdown
title : Computer Vision - 02
tags : [DL, COMPUTER_VISION]
toc : true
---

{% include markdown.html %}

# Computer Vision

## CV metrics

- Classification 을 위한 평가 지표
1. Accuracy
2. Precision / Recall
3. Sensitivity / Specificity
4. F1 Score
5. AUC - ROC

- Object Detection 을 위한 평가 지표
1. IoU : Bounding Box의 겹치는 영역의 크기를 통해 정확도를 평가하는 방법
2. Precision / Recall
3. AP
4. mAP

- Semantic Segmentation 을 위한 평가 지표
1. PA
2. MPA
3. IoU
4. Dice coefficient

## Backbone

### Multi Layer Perceptron

- MLP는 input layer -> hidden layer -> output Layer
- 이미지를 MLP의 input layer에 입력하려면 이미지를 flatten 해야함

- 이미지의 Locality 특성
1. Spatial Locality : 같은 물체라도 이미지마다 크기가 다름
2. Positional invariance : 같은 물체라도 다른 위치에 있을 수 있음

- Convolution filter
> 이미지를 flatten 하지 않고 사용할 수 있음

## Convolution Neural Network

> 이미지의 Locality 특성을 고려하여 학습할 수 있도록 설계된 neural network

- 한계점
1. 이미지 안에서 멀리 떨어진 객체끼리 관련성을 파악하기가 어려움
2. 이미지의 각 파트가 이미지 이해에서 얼마나 중요한지, 얼마나 서로 관련이 있는지 평가할 수 없음

### ImageNet Large Scale Visual Recognition Challenge (IKSVRC)

### AlexNet

> CNN을 사용한 최초의 모델이자 GPU 사용을 고려한 딥러닝 모델

### VGG

> 구도가 단순하지만, 깊은 네트쿼그의 중요성을 알림

### ResNet

> 네트워크를 깊게 쌓을 경우 생기는 문제점을 해결, 기존보다 더 깊은 네트워크를 제안(최대 152 Layer)

### EfficientNet

> 기존 네트워크들이 가진 trade-off를 분석

## Transformer

> Natural Language Processing (NLP) task 를 위해 고안

### VIT & Swin

> Transformer 구조를 computer vision 에 적용하여 해결한 VIT(Vision Transformer)  
> CNN 특성을 ViT 에 다시 적용한 Swin Transformer

### VGG

### ResNet

- Residual block(skip connection)
> 각 block의 input을 x, Convolution 연산을 F라고 가정  
> F(x) + x 를 output으로 사용

### EfficientNet

#### Width Scaling

#### Depth Scaling

#### Resolution Scaling

#### Compound Scaling

## Transformer
