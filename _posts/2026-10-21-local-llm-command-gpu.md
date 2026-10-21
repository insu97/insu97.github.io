---
layout: markdown
title: 로컬 LLM 구축 명령어 치트시트 - GPU
tags: [local-llm]
toc: true
---

{% include markdown.html %}

## GPU·모델 상태 확인 명령어

| 명령어 | 동작 | 위치 | 셸 |
|---|---|---|---|
| `nvidia-smi --query-gpu=temperature.gpu,power.draw,fan.speed,utilization.gpu,memory.used --format=csv -l 2` | GPU 온도·전력·팬·사용률·메모리를 2초마다 확인 | 서버 | bash |
| `nvidia-smi --query-gpu=memory.used,memory.total --format=csv` | GPU 메모리 사용량과 전체 용량 확인 | 서버 | bash |
| `docker exec ollama ollama ps` | 지금 메모리에 올라가 있는 Ollama 모델 확인 | 서버 | bash |

- `-l 2`는 2초마다 반복 출력한다. `Ctrl+C`로 멈춘다. 한 번만 보려면 `-l 2`를 뺀다.
- `memory.used,memory.total`로 모델이 VRAM을 얼마나 쓰는지 확인할 수 있다.
- `ollama ps` 출력의 `PROCESSOR` 열에서 모델이 GPU(`100% GPU`)에 올라갔는지 CPU로 밀렸는지 볼 수 있다. VRAM이 부족하면 일부가 CPU로 내려가 느려진다.
- `docker exec ollama ...`의 `ollama`(첫 번째)는 컨테이너 이름이다. 컨테이너 이름이 다르면 `docker ps`로 확인해서 바꾼다.