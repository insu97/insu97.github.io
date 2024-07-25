---
title : ImageNet Classification with Deep Convolutional Neural Networks
layout : markdown
tags: [paper, paper-cnn]
toc : true
---

{% include markdown.html %}

# 요약

1. ImageNet LSVRC-2010 콘테스트에서 120만 개의 고해상도 이미지를 1000개의 다른 클래스로 분류
2. 6천만 개의 파라미터와 65만 개의 뉴런을 가진 신경망은 5개의 컨볼루션 레이어로 구성 그 중 일부는 최대 풀링 레이어, 최종 1000 방향 소프트맥스를 가진 3개의 완전 연결 레이어로 구성
3. 과적합을 줄이기 위해서 ‘드롭아웃’ 사용
4. CNN은 표준 feedforward nn 보다 더 적은 연결과 파라미터, 쉽게 훈련시킬 수 있으며 이론적으로 최고 성능 모델은 feedforward nn 보다 약간 나쁘다.
5. ImageNet에서 두 가지 오류율을 보고하는것이 일반적 [ Top-1, Top-5 : 모델이 가장 가능성이 높다고 생각하는 다섯 개의 레이블 중 올바른 레이블이 아닌 테스트 이미지의 비율]
6. ImageNet은 가변 해상도의 이미지들로 구성되어 있지만 모델은 일정한 입력 차원을 필요로 하므로 256*256의 고정 해상도로 다운샘플링 실행
7. 직사각형 이미지가 주어지면 짧은 길이를 256으로 이미지 스케일링 후 이미지 중앙에서 256*256 패치를 잘라내고 → 각 픽셀에서 훈련 세트에 대한 평균을 뺸 것을 제외하고는 전처리 X
    1. 픽셀의 중심 원시 RGB 값에 대해 네트워크 훈련
8. ReLU가 있는 네트워크는 포화 뉴런이 있는 네트워크보다 몇 배 더 빠르게 지속적으로 학습한다.
9. GPU는 특정 계층에서만 통신한다.
10. Lateral inhibition 을 사용하는 이유 : ReLU을 사용 → 큰 값의 양수가 들어오면 주변의 픽셀에 영향을 크게 미침 → 같은 픽셀 위치에 있는 것 끼리 정규화하기 위해 사용
11. 일반적으로 훈련 중에 Pooling 이 겹치는 모델이 과적합되기가 약간 더 어려움
12. 완전 연결 계층들의 뉴런들은 이전 계층의 모든 뉴런들에 연결된다.
13. 제1 convolutional layer는 224 * 224 * 3 입력이미지를 크기 11*11*3의 96개의 커널을 4 stride 를 사용하여 필터링한다.
14. 제2 convolutional layer는 5 * 5 * 48의 256커널로 필터링한다.
15. 제3 convolutional layer는 3 * 3 * 256의 384커널들을 갖는다.
16. 제4 convolutional layer는 3 * 3 * 192의 384커널들을 갖는다.
17. 제5 convolutional layer는 3 * 3 * 192의 256커널들을 갖는다.
18. 완전 연결된 계층들은 각각 4096개의 뉴런들을 갖는다.
19. 데이터 증강을 사용해서 만든 데이터들은 디스크에 저장할 필요가 없다.
20. 첫 번째 증강은 이미지 변환(256 * 256 → 224 * 224)과 수평 반사를 생성하는 것으로 구성
21. 두 번째 증강은 훈련 이미지에서 RGB 채널의 강도를 변경하는 것으로 구성
22. Dropout : 확률이 0.5인 각각의 히든 뉴런 출력값을 0으로 만드는 기술
23. Dropout이 적용된 뉴런은 순전파, 역전파에 관여하지 않는다.
24. Dropout은 뉴런이 특정 다른 뉴런에 의존할 수 없기 때문에, 뉴런의 복잡한 공동 적응을 줄인다.
25. 처음 두 완전 연결 계층에서 Dropout 계층 사용
26. Dropout은 반복 횟수를 대략 2배로 증가시킴
27. 확률적 경사 하강법을 이용해 훈련 ( batch_size : 128, momentum : 0.9, weight decay : 0.0005 )
28. 상수 1로 완젼 연결된 은닉층, 제2,4,5 Convolution층의 뉴런 변수를 초기화, 나머지는 상수 0으로 초기화
29. 학습률은 0.01로 초기화 하고 종료하기 전에 3배를 줄였다.
30. ILSVRC2010 대회

    ![Untitled](\assets\images\paper\ImageNet Classification with Deep Convolutional Neural Networks\2010.png)

31. ILSVRC2012 대회

    ![Untitled](\assets\images\paper\ImageNet Classification with Deep Convolutional Neural Networks\2012.png)

---
# 개념

### non-saturation

### 선형성

- 가산성과 동차성을 만족시키면 선형
    - 가산성 : f(x+y) = f(x) + f(y)
    - 동차성 : f(ax) = a * f(x)
- 참고 : [선형성 - 위키백과, 우리 모두의 백과사전 (wikipedia.org)](https://ko.wikipedia.org/wiki/%EC%84%A0%ED%98%95%EC%84%B1)
- saturation : 활성화 함수로 특정 비선형 함수(ex. sigmoid, tanh)를 적용한 신경망에서 반복해 학습시키다 보면 가중치(W)가 업데이트 되지 않는 지점(업데이트 량 = 접선의 기울기 = 0)이 발생
    - saturation 현상으로 인해 Vanishing Gradient Problem 이 발생
        - Vanishing Gradient Problem(기울기 소멸 문제) : 기울기가 거의 0으로 소멸되어 버리면 네트워크의 학습은 매우 느려지고, 학습이 다 이루어지지 않은 상태에서 멈춘다.[= 지역 최솟값에 도달했다]
    - sigmoid 함수 : 포화 비선형 함수, $$s(z) = \frac {1}{(1+e^{-z})}$$
        - 단점
            1. saturation  : 0 < n < 1 값을 다루므로 순전파와 역전파를 반복하다 보면 결과 값이 결국 0으로 수렴할 수 밖에 없다.(ex. 0.99.. 를 무한히 곱하면 결국 0으로 가까워짐)
            2. Not zero-centered : 활성화 함수를 사용하면 항상 양수 → 역전파 : $$\frac {aL}{aw_i} = \frac {aL}{af} * \frac {af}{aw_i}$$ →  $$\frac {af}{aw_i} = x_i$$ 이므로 $$\frac {aL}{aw_i}, \frac {aL}{af}$$ 는 같은 부호를 가져야 한다.
                1. EX ) W1, W2 = [0.5, 0.5] → 최적의 값 : [0.4, 0.6] 일 때 제약이 없다면 W1 -= 0.1, W2 += 0.1 바로 학습 가능
                2. 하지만, 같은 부호를 가져야 하므로, W1 += 0.1, W2 += 0.2 → W1 -= 0.2, W2 -= 0.1 비효율적인 방법으로 학습
            3. exp 연산 : 해당 연산은 비용이 많이 든다.
    - tanh함수 : -1 < x < 1, $$tanh(x) = \frac {e^x-e^{-x}} {e^x+e^{-x}}$$
        - 단점
            1. 여전히 saturation  문제 존재
            2. exp 연산
- ReLU : f(x) = max(0, x)
    - 특징
        1. 수렴 속도가 매우 빠르다. [ tanh 보다 6배 정도 ]
        2. exp 연산이 없다.
    - 단점
        1. Not zero-centered
        2. 음수 영역에서 saturation  → 더 이상 기울기 갱신 x
        3. Dead-ReLU
            1. 처음 초기화를 잘못한 경우, 가중치 평면이 Data Cloud 에서 멀리 떨어진 형태가 된다 → 어떤 입력 데이터도 활성화가 x
            2. Learning rate 가 높은 경우 Data Cloud 를 벗어나게 되면서 업데이트가 x → 학습이 잘 진행되다가 어느 순간 죽어버림(= 수렴되지 않고 이상한 값을 출력 )

### label-preserving transformation

- Data augmentation 기법을 사용할 때 의미가 바뀌지 않게 원본데이터(label)의 특성을 그대로 보존하면서 데이터를 사용할 때 쓰는 말

---
# 구현해보기

1. Dropout 층 구현
2. Top-1, Top-5 오류율 적용
3. image_size = 224*224
4. ReLU 사용
5. Lateral inhibition 사용
6. kernel_size = 3, stride : 1,2,3 사용해서 비교해보기 [ 과적합 확인 ]
7. 증강 → 좌우반전
8. 모멘텀 사용
9. seed = 42
10. train, valid, test : [5:3:2] or [ 6:2:2 ]

---

논문 원본 : [site](https://proceedings.neurips.cc/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf) |
코드 구현 : [site](https://github.com/insu97/PAPER/blob/main/ImageNet_Classification_with_Deep_Convolutional_Neural_Networks.ipynb)
