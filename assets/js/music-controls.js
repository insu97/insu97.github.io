
var audio = new Audio();
var mp3Urls = [
  "/assets/music/cafe/going-forward-226430.mp3",
  "/assets/music/cafe/underneath-the-moonx27s-glow-lofi-254607.mp3",
  "/assets/music/cafe/nhac-jazz-thu-gian-265063.mp3",
  "/assets/music/cafe/bossa-nova-chillwave-cafe-233024.mp3",
  "/assets/music/cafe/cafe-of-love-230761.mp3",
  "/assets/music/cafe/tea-time-on-a-rainy-day-everyday-natural-piano-205092.mp3",
  "/assets/music/cafe/cafe-music-163375.mp3",
  "/assets/music/cafe/크리스마스 카페-221167.mp3"
];
var currentTrack = 0;

// 이전에 저장된 상태를 sessionStorage에서 불러오기
var savedState = JSON.parse(sessionStorage.getItem('musicPlayerState')) || {};
if (savedState.currentTrack !== undefined) {
  currentTrack = savedState.currentTrack;
}

var savedTime = savedState.currentTime || 0; // 이전에 저장된 시간 불러오기
audio.currentTime = savedTime;

// 음악이 끝나면 다음 트랙으로 자동 재생
audio.addEventListener('ended', function() {
  nextMusic();
});

// 상태 저장 함수
function saveState() {
  // 현재 상태를 sessionStorage에 저장 (현재 트랙과 현재 시간)
  sessionStorage.setItem('musicPlayerState', JSON.stringify({
    currentTrack: currentTrack,
    currentTime: audio.currentTime // 현재 시간을 저장
  }));
}

// 음악 재생 함수
function playMusic() {
  // 사용자 상호작용이 이루어졌을 때만 음악을 재생
  if (audio.src !== mp3Urls[currentTrack]) {
    audio.src = mp3Urls[currentTrack];
    audio.currentTime = savedTime; // 이전 시간부터 재생
  }

  // play()는 사용자가 버튼을 클릭한 후에만 호출
  audio.play().then(() => {
    updateButtons();
    saveState();
  }).catch((error) => {
    console.error("Autoplay failed:", error); // 에러 메시지 출력
  });
}

// 음악 일시 정지 함수
function pauseMusic() {
  audio.pause();
  updateButtons();
  saveState();
}

// 다음 트랙 재생 함수
function nextMusic() {
  currentTrack = (currentTrack + 1) % mp3Urls.length;  // 마지막 트랙에서 첫 번째 트랙으로 돌아가기
  playMusic(); // 다음 트랙을 재생
}

// 버튼 상태 업데이트
function updateButtons() {
  var playButton = document.getElementById('playButton');
  var pauseButton = document.getElementById('pauseButton');
  playButton.disabled = !audio.paused;
  pauseButton.disabled = audio.paused;
}

// 페이지 로드 시 자동으로 음악을 재생하지 않도록 설정
window.onload = function() {
  updateButtons(); // 버튼 상태 업데이트
};

// 페이지를 떠날 때 상태를 저장
window.addEventListener('beforeunload', function() {
  saveState();
});
