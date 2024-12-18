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

// Load saved state
var savedState = JSON.parse(sessionStorage.getItem('musicPlayerState')) || {};
if (savedState.currentTrack !== undefined) {
  currentTrack = savedState.currentTrack;
}
var savedTime = savedState.currentTime || 0;
var savedVolume = savedState.volume !== undefined ? savedState.volume : 1;

audio.currentTime = savedTime;
audio.volume = savedVolume; // Set saved volume

// Add event listeners
audio.addEventListener('ended', nextMusic);

// Save state function
function saveState() {
  sessionStorage.setItem('musicPlayerState', JSON.stringify({
    currentTrack: currentTrack,
    currentTime: audio.currentTime,
    volume: audio.volume
  }));
}

// Play music function
function playMusic() {
  if (audio.src !== mp3Urls[currentTrack]) {
    audio.src = mp3Urls[currentTrack];
    audio.currentTime = savedTime;
  }
  audio.play().then(() => {
    updateButtons();
    saveState();
  }).catch((error) => {
    console.error("Autoplay failed:", error);
  });
}

// Pause music function
function pauseMusic() {
  audio.pause();
  updateButtons();
  saveState();
}

// Next music function
function nextMusic() {
  currentTrack = (currentTrack + 1) % mp3Urls.length;
  playMusic();
}

// Update button states
function updateButtons() {
  var playButton = document.getElementById('playButton');
  var pauseButton = document.getElementById('pauseButton');
  playButton.disabled = !audio.paused;
  pauseButton.disabled = audio.paused;
}

// Initialize on page load
window.onload = function() {
 var volumeSlider = document.getElementById('volumeSlider');
 if (volumeSlider) {
   volumeSlider.value = savedVolume;
   volumeSlider.addEventListener('input', function() {
     audio.volume = parseFloat(volumeSlider.value);
     saveState();
   });
 }
 updateButtons();
};

// Save state on page unload
window.addEventListener('beforeunload', saveState);
