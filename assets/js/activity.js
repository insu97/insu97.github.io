(function () {
  var dataEl = document.getElementById('post-data');
  var grid = document.getElementById('activity-grid');
  if (!dataEl || !grid) return;

  var posts = JSON.parse(dataEl.textContent);
  // 독서 기록: {"YYYY-MM-DD": [그날 수정한 노트의 책 제목, ...]}. 파일명·내용은 없다.
  var readingEl = document.getElementById('reading-data');
  var reading = {};
  try { reading = (readingEl && JSON.parse(readingEl.textContent)) || {}; } catch (e) { reading = {}; }
  var yearsEl = document.getElementById('activity-years');
  var monthsEl = document.getElementById('activity-months');
  var summaryEl = document.getElementById('activity-summary');
  var tip = document.getElementById('activity-tip');
  var CELL = 14; // 칸 11px + 간격 3px
  var DAY_MS = 86400000;

  var byDate = {};
  posts.forEach(function (p) {
    (byDate[p.d] = byDate[p.d] || []).push(p);
  });

  // 예전 형식(그날 수정한 개수)도 받아 준다.
  function readingOf(v) {
    if (Array.isArray(v)) return { n: v.length, titles: v };
    return { n: Number(v) || 0, titles: [] };
  }

  var pad = function (n) { return String(n).padStart(2, '0'); };
  var key = function (d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
  var level = function (n) { return n ? 'l' + Math.min(4, n + 1) : ''; };

  var today = new Date();
  var thisYear = today.getFullYear();
  var firstYear = posts.reduce(function (min, p) {
    return Math.min(min, Number(p.d.slice(0, 4)));
  }, thisYear);
  firstYear = Object.keys(reading).reduce(function (min, d) {
    return Math.min(min, Number(d.slice(0, 4)));
  }, firstYear);

  function renderYear(year) {
    var jan1 = new Date(year, 0, 1);
    var daysInYear = (new Date(year + 1, 0, 1) - jan1) / DAY_MS;
    var offset = jan1.getDay();
    var todayKey = key(today);
    var count = 0;
    var notes = 0;
    var frag = document.createDocumentFragment();

    for (var i = 0; i < daysInYear; i++) {
      var day = new Date(year, 0, 1 + i);
      var k = key(day);
      var items = byDate[k] || [];
      var rd = readingOf(reading[k]);
      var readCount = rd.n;
      var el = document.createElement(items.length ? 'a' : 'i');
      var cls = level(items.length + readCount);
      if (k > todayKey) cls += ' future';
      el.className = cls.trim();
      var names = items.map(function (p) { return p.t; });
      rd.titles.forEach(function (t) { if (names.indexOf(t) < 0) names.push(t); });
      var tip = names.join(', ');
      if (readCount && !rd.titles.length) tip = (tip ? tip + ' · ' : '') + '독서 기록 ' + readCount + '건';
      el.dataset.tip = k + ' · ' + (tip || '글 없음');
      notes += readCount;
      if (items.length) {
        el.href = items[0].u;
        count += items.length;
      }
      if (items.length || readCount) el.setAttribute('aria-label', el.dataset.tip);
      if (i === 0) el.style.gridRow = String(offset + 1);
      frag.appendChild(el);
    }

    grid.replaceChildren(frag);
    monthsEl.replaceChildren();
    monthsEl.style.width = Math.ceil((offset + daysInYear) / 7) * CELL + 'px';
    for (var m = 0; m < 12; m++) {
      var first = new Date(year, m, 1);
      var col = Math.floor(((first - jan1) / DAY_MS + offset) / 7);
      var label = document.createElement('span');
      label.textContent = (m + 1) + '월';
      label.style.left = col * CELL + 'px';
      monthsEl.appendChild(label);
    }
    summaryEl.textContent = year + '년 · ' + count + '개의 글' + (notes ? ' · 독서 기록 ' + notes + '건' : '');
  }

  function selectYear(year) {
    Array.prototype.forEach.call(yearsEl.children, function (b) {
      b.setAttribute('aria-pressed', String(Number(b.dataset.year) === year));
    });
    renderYear(year);
  }

  for (var y = thisYear; y >= firstYear; y--) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = y;
    btn.dataset.year = y;
    btn.addEventListener('click', (function (yr) { return function () { selectYear(yr); }; })(y));
    yearsEl.appendChild(btn);
  }

  grid.addEventListener('mousemove', function (e) {
    if (!e.target.dataset || !e.target.dataset.tip) { tip.style.display = 'none'; return; }
    tip.textContent = e.target.dataset.tip;
    tip.style.display = 'block';
    tip.style.left = e.clientX + 12 + 'px';
    tip.style.top = e.clientY - 34 + 'px';
  });
  grid.addEventListener('mouseleave', function () { tip.style.display = 'none'; });

  // 최장 연속 작성일 / 마지막 작성일 요약
  var streakEl = document.getElementById('stat-streak');
  if (streakEl) {
    var days = Object.keys(byDate).sort();
    var best = 0, run = 0, prev = null;
    days.forEach(function (d) {
      var t = new Date(d + 'T00:00:00').getTime();
      run = prev !== null && Math.round((t - prev) / DAY_MS) === 1 ? run + 1 : 1;
      best = Math.max(best, run);
      prev = t;
    });
    streakEl.textContent = best;
  }

  selectYear(thisYear);
  var hm = document.querySelector('.hm');
  var todayCol = Math.floor(((today - new Date(thisYear, 0, 1)) / DAY_MS + new Date(thisYear, 0, 1).getDay()) / 7);
  hm.scrollLeft = Math.max(0, todayCol * CELL - hm.clientWidth / 2);
})();
