(function () {
  var root = document.getElementById('alog');
  var dataEl = document.getElementById('post-data');
  if (!root || !dataEl) return;

  var posts = JSON.parse(dataEl.textContent);
  // 독서 기록: {"YYYY-MM-DD": [{"title": 책 제목, "blog": 블로그 글 파일명(있을 때만)}, ...]}.
  var readingEl = document.getElementById('reading-data');
  var reading = {};
  try { reading = (readingEl && JSON.parse(readingEl.textContent)) || {}; } catch (e) { reading = {}; }

  var DAY_MS = 86400000;
  var WEEKDAYS = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  var BADGE_POST = '작성';
  var BADGE_NOTE = '독서 노트 수정';

  var byDate = {};
  posts.forEach(function (p) {
    (byDate[p.d] = byDate[p.d] || []).push(p);
  });

  // 예전 형식(제목 문자열 배열)도 받아 준다. 개수만 있는 형식은 제목을 모르니 건너뛴다.
  function notesOf(v) {
    if (!Array.isArray(v)) return [];
    return v.map(function (x) { return typeof x === 'string' ? { title: x } : x; });
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

  // 그날의 목록: 그날 쓴 글 + 그날 수정한 독서 노트(블로그 글이 있으면 그 글로 연결).
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
    (byDate[k] || []).forEach(function (p) { add(p.t, p.u, BADGE_POST); });
    notesOf(reading[k]).forEach(function (note) {
      if (!note.title) return;
      var post = resolvePost(note.blog);
      if (post) add(post.t, post.u, BADGE_NOTE);
      else add(note.title, '', BADGE_NOTE);
    });
    return entries;
  }

  // 기록이 있는 날만 모은다. 빈 날은 어디에서도 선택할 수 없다.
  var active = {};
  Object.keys(byDate).concat(Object.keys(reading)).forEach(function (k) {
    if (active[k]) return;
    var entries = entriesOf(k);
    if (entries.length) active[k] = entries;
  });
  var days = Object.keys(active).sort();
  if (!days.length) {
    root.textContent = '아직 기록이 없어요.';
    return;
  }
  var months = days.reduce(function (acc, d) {
    var m = d.slice(0, 7);
    if (acc[acc.length - 1] !== m) acc.push(m);
    return acc;
  }, []);

  function daysOfMonth(month) {
    return days.filter(function (d) { return d.slice(0, 7) === month; });
  }

  // ?d= 값이 기록 있는 날이면 그 날, 아니면 같은 달의 가장 최근 기록일, 그것도 없으면 전체에서 가장 최근 기록일.
  function resolveSelected(raw) {
    if (active[raw]) return raw;
    var sameMonth = /^\d{4}-\d{2}/.test(raw || '') ? daysOfMonth(raw.slice(0, 7)) : [];
    return sameMonth.length ? sameMonth[sameMonth.length - 1] : days[days.length - 1];
  }

  function fromUrl() {
    var m = /[?&]d=([^&#]*)/.exec(location.search);
    return resolveSelected(m ? decodeURIComponent(m[1]) : '');
  }

  function href(d) { return location.pathname + '?d=' + d; }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function dayLink(d, cls, label) {
    var a = el('a', cls);
    a.href = href(d);
    a.dataset.d = d;
    if (label) a.setAttribute('aria-label', label);
    return a;
  }

  function monthLabel(m) { return m.slice(0, 4) + '년 ' + Number(m.slice(5)) + '월'; }

  function monthNav(month) {
    var i = months.indexOf(month);
    var nav = el('div', 'alog-mon');
    function step(target, sign, name) {
      if (!target) {
        var off = el('span', 'off', sign);
        off.setAttribute('aria-hidden', 'true');
        return off;
      }
      var latest = daysOfMonth(target).pop();
      var a = dayLink(latest, '', name);
      a.textContent = sign;
      return a;
    }
    nav.append(step(months[i - 1], '‹', '이전 기록이 있는 달'), el('span', 'cur', monthLabel(month)), step(months[i + 1], '›', '다음 기록이 있는 달'));
    return nav;
  }

  function strip(month, selected) {
    var y = Number(month.slice(0, 4)), mo = Number(month.slice(5));
    var count = new Date(y, mo, 0).getDate();
    var wrap = el('div', 'alog-strip');
    wrap.style.setProperty('--n', count);
    for (var d = 1; d <= count; d++) {
      var k = month + '-' + String(d).padStart(2, '0');
      var entries = active[k];
      var node;
      if (entries) {
        node = dayLink(k, 'l' + Math.min(4, entries.length + 1), d + '일 · ' + entries.length + '건');
        if (k === selected) { node.classList.add('sel'); node.setAttribute('aria-current', 'date'); }
      } else {
        node = el('i'); // 기록 없는 날: 링크가 아니다
      }
      wrap.appendChild(node);
    }
    var scale = el('div', 'alog-scale');
    scale.append(el('span', '', '1일'), el('span', '', count + '일'));
    var box = el('div', 'alog-stripbox');
    box.append(wrap, scale);
    return box;
  }

  function entryList(entries) {
    var ul = el('ul', 'alog-items');
    entries.forEach(function (e) {
      var li = el('li');
      e.badges.forEach(function (b) { li.appendChild(el('span', 'alog-k ' + (b === BADGE_POST ? 'post' : 'note'), b)); });
      if (e.url) {
        var a = el('a', '', e.title);
        a.href = e.url;
        li.appendChild(a);
      } else {
        li.appendChild(el('span', 'alog-t', e.title));
      }
      ul.appendChild(li);
    });
    return ul;
  }

  function summary(d, entries) {
    var first = entries[0];
    var a = dayLink(d, 'alog-sum');
    first.badges.forEach(function (b) { a.appendChild(el('span', 'alog-k ' + (b === BADGE_POST ? 'post' : 'note'), b)); });
    a.appendChild(el('span', '', first.title + (entries.length > 1 ? ' 외 ' + (entries.length - 1) + '건' : '')));
    return a;
  }

  function log(month, selected) {
    var ol = el('ol', 'alog-log');
    var list = daysOfMonth(month).reverse(); // 최신순
    list.forEach(function (d, i) {
      if (i > 0) {
        var skipped = Math.round((new Date(list[i - 1] + 'T00:00:00') - new Date(d + 'T00:00:00')) / DAY_MS) - 1;
        if (skipped > 0) ol.appendChild(el('li', 'alog-gap', skipped + '일 쉼'));
      }
      var open = d === selected;
      var li = el('li', 'alog-ent' + (open ? ' open' : ''));
      var date = new Date(d + 'T00:00:00');
      var dt = el('div', 'alog-dt');
      dt.append(el('b', '', String(Number(d.slice(8)))), document.createTextNode(WEEKDAYS[date.getDay()]));
      var box = el('div', 'alog-box');
      box.appendChild(open ? entryList(active[d]) : summary(d, active[d]));
      li.append(dt, box);
      ol.appendChild(li);
    });
    return ol;
  }

  var baseTitle = document.title;

  function render(selected) {
    var month = selected.slice(0, 7);
    root.replaceChildren(monthNav(month), strip(month, selected), log(month, selected));
    document.title = selected + ' · ' + baseTitle;
  }

  var selected = fromUrl();
  render(selected);

  root.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[data-d]') : null;
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    e.preventDefault();
    selected = a.dataset.d;
    history.pushState(null, '', href(selected));
    render(selected);
  });
  window.addEventListener('popstate', function () {
    selected = fromUrl();
    render(selected);
  });
})();
