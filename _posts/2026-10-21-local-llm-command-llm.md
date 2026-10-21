---
layout: markdown
title: 로컬 LLM 구축 명령어 치트시트 - llm
tags: [local-llm]
toc: true
---

{% include markdown.html %}

## Ollama 설정 변경 후 적용하기

1. `docker-compose.yml`을 수정한다. (`nano docker-compose.yml`)
2. `docker compose up -d ollama`: 설정이 바뀐 `ollama` 컨테이너를 새로 만들어 실행한다.
    - `docker-compose.yml`이 있는 폴더에서 실행한다.
    - 설정은 그대로 두고 재시작만 하려면 `docker compose restart ollama`를 쓴다.
3. `docker exec ollama ollama run 모델이름 "테스트" > /dev/null`: 모델에게 질문을 하나 보내 모델을 GPU에 올린다.
    - Ollama는 첫 요청이 와야 모델을 GPU에 올린다. 그래서 의미 없는 질문으로 모델을 미리 올려 둔다.
4. `docker exec ollama ollama ps`: 새 설정대로 올라갔는지 확인한다.
    - `PROCESSOR`가 `100% GPU`이면 GPU에 전부 올라간 것이다.
    - `CPU/GPU`가 섞여 나오면 VRAM이 부족해 일부가 CPU로 밀린 것이다.
    - `UNTIL`: 모델이 메모리에 머무는 시간. 이 시간이 지나면 모델이 내려간다. (기본 5분, 요청이 올 때마다 갱신)