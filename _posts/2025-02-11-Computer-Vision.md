---
layout : markdown
title : Computer Vision
tags : [DL, COMPUTER_VISION]
toc : true
---

{% include markdown.html %}


# Computer Vision

> AI의 한 종류로, vision 데이터들에서 의미 있는 정보를 추출하고 이를 이해한 것을 바탕으로 여러가지 작업을 수행하는 것

## 고전 컴퓨터 비전

> 규칙 기반의 이미지 처리 알고리즘 ( Ex. OpenCV )

### Morphological Transform

> 이미지에 기반한 연산이며, 흑백 이미지에서 일반적으로 수행

### 종류

1. Erosion
  - 물체의 경계를 침식
  - 이미지의 특징을 축소할 때도 사용 가능
2. Dilation
  - Erosion과는 정반대로 동작
  - 사물의 크기를 팽창할 때도 사용 가능
3. Opening
  - Erosion 커널과 Dilation 커널 순서대로 동작되는 연산
4. Closing
  - Dilation -> Erosion 동작하는 연산
5. Morphological gradient
6. Top hat

### Contour Detection

> Contour : 같은 색깔 및 intensity를 가지는 연속적인 경계점들로 이루어진 curve  
> 고전 컴퓨터 비전을 활용하여 raw image에서 객체의 contour를 추출

#### 중요성

> 딥러닝 모델 사용 X -> 딥러닝 모델 학습을 위한 데이터 가공 시 활용 가능

#### 과정

1. Edge Detection
  - Canny Edge Detector : 정확도 높음, 실행 시간 느림, 구현 복잡함
    - 과정 : 노이즈 제거 -> 이미지 내의 높은 미분값 찾기 -> 최대값이 아닌 픽셀 값 0으로 치환 -> 하이퍼파라미터 조정을 통한 세밀한 엣지 검출
2. Dilation(optional)
3. Contour detection
  - Raw image를 binary image로 변환 -> OpenCV 의 findContours() 함수 이용

## 컴퓨터 비전 모델 구조

### Vision Feature

> 컴퓨터 비전의 태스크를 해결할 때 필요한 이미지의 특성을 담고 있는 정보들을 지칭함.

### Backbone

> 이미지에서 중요한 Feature를 추출(extract)할 수 있도록 훈련됨  
> 역할 : 주어진 비전 태스크를 잘 수행할 수 있는 압축된 Visual Feature를 산출하는 것  
> 구조 : low-level -> mid-level -> high-level

### Decoder

> 압축된 Feature를 목표하는 태스크의 출력 형태로 만드는 과정을 수행


## CNN

- Convolution Layer : 네트워크가 비전 테스크를 수행하는 데에 유용한 Feature들을 학습할 수 있도록 함
- Activation Function : 네트워크에 비선형성을 가해주는 역할을 함
- Pooling Layer : Feature Map에 Spatial Aggregation을 시켜줌

## AlexNet

- 구조 : Convolution - Pooling - Batch Normalization
- Lateral Inhibition : 강하게 활성화된 뉴런이 다른 뉴런의 값을 억제하는 현상

### Overfitting

- 방지
1. Data Augmentation : 학습 데이터에 변형(Augmentation)을 가해서 좀 더 다양성을 지닌 데이터로 학습될 수 있도록 하는 방법
2. Dropout : 뉴런 중 일부를 일정 비율로 생략하면서 학습을 진행하는 방법, 학습 시에만 행해지고, 테스트를 할 때는 모든 뉴런을 사용함

## ResNet

## EfficientNet

## Class Activation Mapping ( CAM )

> 모델이 어디를 보고 있는지 시각화 할 수 있는 방법을 제시

### Gradient-weighted Class Activation Map ( Glad-CAM )
