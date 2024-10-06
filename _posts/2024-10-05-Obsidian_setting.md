---
layout : markdown
title : Obsidian_setting
tags : [Obsidian]
toc : true
---
{% include markdown.html %}

# Obsidian Setting

1. Google Play Store 에서 Termux 설치 후 다음 명령어 입력

```Linux
pkg install git # git 설치
git clone <repo 주소>
```

-> git clone <repo 주소> 입력 후 ID, PASSWD 입력<br>
--> PASSWD : 깃허브 토큰 생성 후 입력해야 함 [ 비밀번호 X ]

```Linux
pkg install rsync
termux-setup-storage # 앱 권한 부여
chmod -R u+rwX <obsidian 설치 로컬 주소 입력>
rsync -avz <termux에서 clone 한 주소> <로컬 주소> # 클론한 데이터를 로컬로 복사
pkg install vim
```

```Linux
nano sync_to_obsidian.sh # 자동화 파일 생성
```

-> sync_to_obsidian.sh 파일에 아래 입력

```Linux
rm -rf <clone 주소>
rm -rf <로컬 주소>
git clone <repo 주소>
rsync -avz <clone 주소> <로컬 주소>
```

-> esc 누르고 :wq 입력후 나오기 # 저장 후 나오기

```Linux
chmod +x sync_to_obsidian.sh # 실행할 수 있도록 권한 부여
./sync_to_obsidian.sh # 입력 후 작동하는지 확인하기
```
