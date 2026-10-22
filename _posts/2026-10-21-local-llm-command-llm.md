---
layout: markdown
title: 로컬 LLM 구축 명령어 치트시트 - llm
tags: [local-llm]
toc: true
---

{% include markdown.html %}

## 새 모델 반입 절차

### 로컬 PC

- 기존 모델 정리
    - 이전에 받은 모델이 남아 있다면 서버로 같이 넘어가므로 먼저 비운다.
    - 작업 표시줄에 Ollama 아이콘 우클릭 -> **Quit** 후 실행
    - 삭제 후 시작 메뉴에서 Ollama를 다시 실행한다.

```powershell
Remove-Item -Recurse -Force $env:USERPROFILE\.ollama\models\*
```

- 모델 받기

```powershell
ollama pull <모델이름>
```

- 서버로 복사

```powershell
scp -r $env:USERPROFILE\.ollama\models <접속계정>@<서버IP>:~/
```

### 서버 PC

- 서버 접속

```powershell
ssh <접속계정>@<서버IP>
```

- Ollama 폴더로 복사

> <계정 ID>: model 을 설치한 계정

```bash
sudo cp -r ~models/. /home/<계정 ID>/ollama/models/
sudo chown -R <계정 ID>:<계정 ID> /home/<계정 ID>/ollama/models
```

- model 확인

> 새로 받은 모델이 보이면 성공

```bash
docker exec ollama ollama list
```

- 모델 전용 설정 파일 만들기

> <모델 별칭>: Ex. deepseek, qwen ...

```bash
sudo -u <계정 ID> nano /home/<계정 ID>/llm/Modelfile.<모델 별칭>
```

> 권장 설정 값 입력 후 `Ctrl+O` → Enter → `Ctrl+X`

```
FROM deepseek-r1:32b
PARAMETER num_ctx 81920
PARAMETER temperature 0.5
PARAMETER top_p 0.95
```

- docker-compose.yml 수정

```bash
sudo -u <계정 ID> nano /home/<계정 ID>/llm/docker-compose.yml
```

- docker-compose 변경 반영

> 컨테이너가 다시 만들어지면서 GPU에 있던 모델은 자동으로 내려감
> 출력에 `Recreated`가 나와야 반영된 것. `Running`만 나오면 끝에 `--force-recreate ollama` 추가

```bash
sudo docker compose -f /home/<소유 계정>/llm/docker-compose.yml up -d
docker exec ollama env | grep OLLAMA
```

- 모델 설정 적용

> 같은 이름으로 다시 create 하면 덮어씀. 모델 파일은 복사되지 않고 설정만 추가됨

```bash
sudo docker cp /home/<소유 계정>/llm/Modelfile.<모델 별칭> ollama:/tmp/Modelfile
docker exec ollama ollama create <모델 별칭> -f /tmp/Modelfile
docker exec ollama ollama show <모델 별칭> --parameters
```

- 기존 모델 내리고 테스트

> 확인 기준: PROCESSOR `100% GPU`, CONTEXT가 Modelfile의 `num_ctx` 값과 같음
> `CPU/GPU`로 나뉘면 VRAM 초과 → `num_ctx`를 줄이고 "모델 설정 적용"부터 다시

```bash
docker exec ollama ollama stop coder
docker exec -it ollama ollama run <모델 별칭> "안녕"
docker exec ollama ollama ps
```

- 서버 홈의 사본 삭제

```bash
rm -rf ~/models
```


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