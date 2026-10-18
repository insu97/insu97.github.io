(function () {
  var dataEl = document.getElementById('post-data');
  var grid = document.getElementById('activity-grid');
  if (!dataEl || !grid) return;

  var posts = JSON.parse(dataEl.textContent);
  // 독서 기록: {"YYYY-MM-DD": [{"title": 책 제목, "blog": 블로그 글 파일명(있을 때만)}, ...]}.
  // 노트의 파일명·내용은 들어 있지 않다.
  var readingEl = document.getElementById('reading-data');
  var reading = {};
  try { reading = (readingEl && JSON.parse(readingEl.textContent)) || {}; } catch (e) { reading = {}; }
  var yearsEl = document.getElementById('activity-years');
  var monthsEl = document.getElementById('activity-months');
  var summaryEl = document.getElementById('activity-summary');
  var detailEl = document.getElementById('activity-detail');
  var tip = document.getElementById('activity-tip');
  var CELL = 14; // 칸 11px + 간격 3px
  var DAY_MS = 86400000;

  var byDate = {};
  posts.forEach(function (p) {
    (byDate[p.d] = byDate[p.d] || []).push(p);
  });

  // 예전 형식(제목 문자열 배열, 개수 숫자)도 받아 준다.
  function readingOf(v) {
    if (Array.isArray(v)) {
      return {
        n: v.length,
        notes: v.map(function (x) { return typeof x === 'string' ? { title: x } : x; })
      };
    }
    return { n: Number(v) || 0, notes: [] };
  }

  // 노트의 blog 키("2026-10-12-book-mood-and-attitude")로 블로그 글을 찾는다.
  function resolvePost(blog) {
    var m = /^(\d{4})-(\d{2})-(\d{2})-(.+)$/.exec(blog || '');
    if (!m) return null;
    var tail = '/' + m[1] + '/' + m[2] + '/' + m[3] + '/' + m[4] + '.html';
    for (var i = 0; i < posts.length; i++) {
      if (posts[i].u.slice(-tail.length) === tail) return posts[i];
    }
    return null;
  }

  // 그날 칸을 눌렀을 때 보여 줄 목록: 그날 쓴 글 + 그날 수정한 독서 노트에 해당하는 블로그 글.
  function entriesOf(k) {
    var entries = [];
    function add(title, url, badge) {
      var found = entries.filter(function (e) { return url ? e.url === url : !e.url && e.title === title; })[0];
      if (found) {
        if (found.badges.indexOf(badge) < 0) found.badges.push(badge);
      } else {
        entries.push({ title: title, url: url, badges: [badge] });
      }
    }
    (byDate[k] || []).forEach(function (p) { add(p.t, p.u, '작성'); });
    readingOf(reading[k]).notes.forEach(function (note) {
      var post = resolvePost(note.blog);
      if (post) add(post.t, post.u, '독서 노트 수정');
      else add(note.title, '', '독서 노트 수정');
    });
    return entries;
  }

  var selected = null;

  function hideDetail() {
    if (selected) selected.classList.remove('sel');
    selected = null;
    detailEl.hidden = true;
    detailEl.replaceChildren();
  }

  function showDetail(cell) {
    var k = cell.dataset.date;
    if (selected === cell) { hideDetail(); return; }
    hideDetail();
    var entries = entriesOf(k);
    var head = document.createElement('div');
    head.className = 'hm-detail-head';
    var title = document.createElement('b');
    title.textContent = k;
    var count = document.createElement('span');
    count.textContent = entries.length + '건';
    var close = document.createElement('button');
    close.type = 'button';
    close.textContent = '닫기';
    close.addEventListener('click', hideDetail);
    head.append(title, count, close);

    var list = document.createElement('ul');
    entries.forEach(function (e) {
      var li = document.createElement('li');
      var name;
      if (e.url) {
        name = document.createElement('a');
        name.href = e.url;
      } else {
        name = document.createElement('span');
      }
      name.textContent = e.title;
      li.appendChild(name);
      e.badges.forEach(function (b) {
        var badge = document.createElement('small');
        badge.textContent = b;
        li.appendChild(badge);
      });
      list.appendChild(li);
    });

    detailEl.replaceChildren(head, list);
    detailEl.hidden = false;
    cell.classList.add('sel');
    selected = cell;
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
      var active = items.length + rd.n > 0;
      var el = document.createElement(active ? 'a' : 'i');
      var cls = level(items.length + rd.n);
      if (k > todayKey) cls += ' future';
      el.className = cls.trim();
      var names = items.map(function (p) { return p.t; });
      rd.notes.forEach(function (note) { if (note.title && names.indexOf(note.title) < 0) names.push(note.title); });
      var text = names.join(', ');
      if (rd.n && !rd.notes.length) text = (text ? text + ' · ' : '') + '독서 기록 ' + rd.n + '건';
      el.dataset.tip = k + ' · ' + (text || '글 없음');
      count += items.length;
      notes += rd.n;
      if (active) {
        el.href = '#activity-detail';
        el.dataset.date = k;
        el.setAttribute('aria-label', el.dataset.tip);
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
    summaryEl.textContent = year + '년 · ' + count + '개의 글' + (notes ? ' · 독서 기록 ' + notes + '건' : '');
  }

  function selectYear(year) {
    Array.prototype.forEach.call(yearsEl.children, function (b) {
      b.setAttribute('aria-pressed', String(Number(b.dataset.year) === year));
    });
    hideDetail();
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

  grid.addEventListener('click', function (e) {
    var cell = e.target.closest ? e.target.closest('a[data-date]') : null;
    if (!cell) return;
    e.preventDefault();
    showDetail(cell);
  });

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
