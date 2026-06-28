// 다크/라이트 테마 토글
// FOUC 방지 인라인 스크립트(default.html <head>)가 이미 <html> 에 data-theme 를 설정한다.
// 이 스크립트는 토글 버튼 클릭 처리와 아이콘 동기화만 담당한다.
(function () {
  var STORAGE_KEY = 'theme';
  // 라이트일 때는 "다크로 전환" 의미의 달 아이콘, 다크일 때는 해 아이콘을 보여준다.
  var ICONS = { light: '☽', dark: '☀' }; // ☽ / ☀

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function syncIcon(button) {
    if (!button) { return; }
    var theme = currentTheme();
    button.textContent = ICONS[theme];
    button.setAttribute('aria-label', theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환');
    button.setAttribute('title', theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환');
  }

  function init() {
    var button = document.getElementById('theme-toggle');
    if (!button) { return; }
    syncIcon(button);
    button.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { }
      syncIcon(button);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
