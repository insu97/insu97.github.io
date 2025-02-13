---
layout : markdown
title : Computer Vision - 01
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

## Object Detection

> 사물 각각의 Bounding Box 위치와 Category를 예측

### 2-stage Detector

> Region Proposals 및 Feature Extractor를 거치며 object detection 수행

- Region Proposals : 다양한 크기와 모양의 Bounding Box 로 물체의 위치를 제안
- Feature Extractor : 제안한 Region (Bounding Box)에 대하여 물체의 특성 추출

### 1-stage Detector

> Region Proposals 없이, Feature Extractor만을 이용한 object detection 수행

### 성능 평가 방법

#### Intersection of Union ( IOU )

> 우리가 예측한 Bounding Box 와 실제 Bounding Box 값의 차이를 계산  
> IOU = Area of intersection / Area of Union

#### Average Precision ( AP )

## R-CNN

### Region Proposals

> Selective Search 기법으로 2000개의 Roi(Region of Interests)를 추출

- Selective Search : 인접한 영역끼리 유사성을 측정해 큰 영역으로 차례대로 통합

### Warped Region

> 각 Roi 에 대하여 동일한 크기의 이미지로 변환

### Backbone

> Region Proposals 마다 각각의 Backbone (CNN)에 넣어서 결과를 계산

### Output

> SVM : 각 Region Proposals 마다 SVM으로 Class 분류 결과 예측

- Bbox Regression : Backbone의 Feature를 Regression으로 Bounding Box 위치 예측

### Limitation

1. CPU 기반의 Selective Search 기법으로 인해 많은 시간이 필요
2. 2000개의 Roi로 인하여, 2000번의 CNN연산이 필요하며 많은 시간이 필요

## Fast R-CNN

### Roi Pooling

> 각 Roi 영역에 대하여 Max Pooling을 이용  
> 고정된 크기의 Vector 생성

### Limitation

1. CPU기반의 Selective Search 기법으로 인해 처리 속도 느림
2. Roi Pooling 정확도 떨어짐

## Faster R-CNN

### Region Proposal Network (RPN)

> Feature Map을 기반으로 물체의 위치 예측  
> K개의 Anchor Box를 이용  
> Sliding Window 방식으로 Feature Map에 적용

### Non-Maximum-Suppression (NMS)

> 중복된 경계 Bbox 를 제거하여 최종 객체 감지 결과를 정리하고 정확도를 높이는 기술

### Limitation

1. 2-stage Detector로 연산량이 많아, 실시간 사용에 부적합
2. 1-stage Detector인 YOLO는 실시간 사용 가능

## 1-stage Detector

### YOLO

```
- Single Shot Architecture : YOLO는 객체 감지를 위한 단일 신경망 아키텍처를 사용  
- 이미지를 그리드로 나누고, 그리드 셀 별로 Bounding Box 와 해당 객체의 클래스 확률 예측
```

## Semantic Segmentation

> Pixel-wise 로 각각의 class 를 예측하여 물체 Category 별로 분할

### 성능 평가 방법 - Intersection-over-Union ( IoU )

> IoU = Area of Intersection / Area of Union  
> IoU = TP / ( TP + FP + FN )

### Sliding Window

- 문제점
1. 픽셀 주변의 정보밖에 고려하지 못함
2. 많은 패치가 중복되는 영역을 처리하기 때문에 계산 비용 증가

### Size Preserving Convolutional Layers

- 문제점
1. Receptive field 가 여전히 제한적

### Downsampling + Upsampling

- 장점
1. 큰 Receptive field를 가짐

### Fully Convolutional Networks ( FCN )

- Convolution(Downsampling)
> Backbone를 통해 Features 추출

- Deconvolution(Upsampling)
> Feature Map 을 확장하여 입력 이미지와 동일한 크기의 Segmentation Map 생성

- Skip Connection
> Upsampling 의 결과와 Backbone의 중간 Layer에서 나오는 Feature Map과 결합

## U-Net

### Encoder

> 입력 이미지를 Downsampling  
> 이미지의 공간 정보를 계층적으로 추상화 및 중요한 Feature 추출

### Decoder

> Encoder 가 추출한 Feature를 Upsampling  
> Upsampling하여 Segmentation Map 생성

### Skip Connection

> Encoder와 Decoder 간의 정보 전달  
> Decoder에서 Upsampling된 Feature와 동일한 해상도의 Encoder Feature를 결합
