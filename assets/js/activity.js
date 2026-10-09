(function () {
  var dataEl = document.getElementById('post-data');
  var grid = document.getElementById('activity-grid');
  if (!dataEl || !grid) return;

  var posts = JSON.parse(dataEl.textContent);
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

  var pad = function (n) { return String(n).padStart(2, '0'); };
  var key = function (d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
  var level = function (n) { return n ? 'l' + Math.min(4, n + 1) : ''; };

  var today = new Date();
  var thisYear = today.getFullYear();
  var firstYear = posts.reduce(function (min, p) {
    return Math.min(min, Number(p.d.slice(0, 4)));
  }, thisYear);

  function renderYear(year) {
    var jan1 = new Date(year, 0, 1);
    var daysInYear = (new Date(year + 1, 0, 1) - jan1) / DAY_MS;
    var offset = jan1.getDay();
    var todayKey = key(today);
    var count = 0;
    var frag = document.createDocumentFragment();

    for (var i = 0; i < daysInYear; i++) {
      var day = new Date(year, 0, 1 + i);
      var k = key(day);
      var items = byDate[k] || [];
      var el = document.createElement(items.length ? 'a' : 'i');
      var cls = level(items.length);
      if (k > todayKey) cls += ' future';
      el.className = cls.trim();
      el.dataset.tip = k + ' · ' + (items.length ? items.map(function (p) { return p.t; }).join(', ') : '글 없음');
      if (items.length) {
        el.href = items[0].u;
        el.setAttribute('aria-label', el.dataset.tip);
        count += items.length;
      }
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
    summaryEl.textContent = year + '년 · ' + count + '개의 글';
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
