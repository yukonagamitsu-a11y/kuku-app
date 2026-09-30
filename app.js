/* くくの ひみつのまち — アプリ本体 */
'use strict';

const KEY = 'kuku-app-v1';
const $ = (s, r = document) => r.querySelector(s);
const app = document.getElementById('app');
const rnd = n => Math.floor(Math.random() * n);
const pick = a => a[rnd(a.length)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const qkey = (a, b) => a + 'x' + b;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const dateStr = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const yesterdayStr = () => dateStr(new Date(Date.now() - 864e5));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* =============== 保存データ =============== */
const defaultState = () => ({
  coins: 0,
  items: ['h_bob', 'c_choco', 'o_pink', 's_pink'],
  avatar: { hair: 'h_bob', hairColor: 'c_choco', outfit: 'o_pink', hat: null, shoes: 's_pink', accessory: null, pet: null, room: null },
  streak: { days: 0, lastPlayed: null },
  mastery: {}, mistakes: {}, attempts: {}, correct: {},
  masteredDans: [], stamps: [],
  today: { date: null, seconds: 0 },
  settings: { sound: true, voice: true, dailyLimitMinutes: 20 },
  seenHello: false,
});
function loadState() {
  const d = defaultState();
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (raw && typeof raw === 'object') {
      const s = Object.assign(d, raw);
      s.avatar = Object.assign(defaultState().avatar, raw.avatar || {});
      s.streak = Object.assign(defaultState().streak, raw.streak || {});
      s.settings = Object.assign(defaultState().settings, raw.settings || {});
      s.today = Object.assign(defaultState().today, raw.today || {});
      return s;
    }
  } catch (e) { /* 読めなくても はじめから */ }
  return d;
}
let S = loadState();
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* 保存できなくても あそべる */ } }

/* =============== 音 =============== */
const Snd = {
  ctx: null,
  init() {
    try {
      if (!this.ctx) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return; this.ctx = new C(); }
      if (this.ctx.state === 'suspended') this.ctx.resume();
    } catch (e) { /* 音が出なくても OK */ }
  },
  tone(f, t0, d, type = 'sine', v = .16, f2) {
    const c = this.ctx, t = c.currentTime + t0;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d);
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(v, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + d + .05);
  },
  play(n) {
    if (!S.settings.sound || !this.ctx) return;
    try {
      switch (n) {
        case 'ok': [523, 659, 784].forEach((f, i) => this.tone(f, i * .08, .22, 'triangle')); break;
        case 'ng': this.tone(330, 0, .22, 'triangle', .12); this.tone(262, .16, .3, 'triangle', .1); break;
        case 'pop': this.tone(700, 0, .12, 'sine', .2, 180); this.tone(1100, 0, .05, 'square', .04); break;
        case 'coin': this.tone(988, 0, .1, 'square', .07); this.tone(1319, .09, .28, 'square', .07); break;
        case 'fan': [523, 659, 784, 1047, 784, 1047].forEach((f, i) => this.tone(f, i * .12, .3, 'triangle', .14)); break;
        case 'shake': for (let i = 0; i < 6; i++) this.tone(220 + (i % 2) * 60, i * .2, .12, 'sawtooth', .05); break;
        case 'reveal': [880, 1175, 1568, 2093].forEach((f, i) => this.tone(f, i * .07, .3, 'sine', .1)); break;
        case 'tap': this.tone(600, 0, .05, 'sine', .06); break;
      }
    } catch (e) { /* 無視 */ }
  },
};

/* =============== よみあげ =============== */
const Voice = {
  missing: false, timer: null, token: 0,
  ok() { return 'speechSynthesis' in window && S.settings.voice && !this.missing; },
  refresh() {
    let miss = false;
    if (!('speechSynthesis' in window)) miss = true;
    else { const v = speechSynthesis.getVoices(); if (v.length && !v.some(x => /^ja/i.test(x.lang))) miss = true; }
    this.missing = miss;
    document.body.classList.toggle('no-voice', !this.ok());
  },
  speak(text, done) {
    const my = ++this.token; clearTimeout(this.timer);
    if (!this.ok()) { if (done) this.timer = setTimeout(() => { if (my === this.token) done(); }, 1900); return; }
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ja-JP'; u.rate = .85; u.pitch = 1.15;
      const v = speechSynthesis.getVoices().find(x => /^ja/i.test(x.lang)); if (v) u.voice = v;
      let fired = false;
      const fin = () => { if (fired || my !== this.token) return; fired = true; clearTimeout(this.timer); if (done) done(); };
      u.onend = fin; u.onerror = fin;
      speechSynthesis.speak(u);
      this.timer = setTimeout(fin, 1800 + text.length * 450);
    } catch (e) { if (done) setTimeout(done, 1500); }
  },
  cancel() { this.token++; clearTimeout(this.timer); try { speechSynthesis.cancel(); } catch (e) { /* 無視 */ } },
};

/* =============== 画面のスリープ防止 =============== */
let wake = null, wantWake = false;
async function lockScreen() {
  try {
    if ('wakeLock' in navigator && !wake) {
      wake = await navigator.wakeLock.request('screen');
      wake.addEventListener('release', () => { wake = null; });
    }
  } catch (e) { /* 非対応なら無視 */ }
}
function setWake(on) {
  wantWake = on;
  if (on) lockScreen(); else { try { if (wake) wake.release(); } catch (e) { /* 無視 */ } wake = null; }
}
document.addEventListener('visibilitychange', () => { if (!document.hidden && wantWake) lockScreen(); });

/* =============== 演出・ダイアログ =============== */
function burst(x, y, list = ['⭐', '💖', '✨', '🌟']) {
  if (reduced) return;
  const fx = document.getElementById('fx');
  for (let i = 0; i < 9; i++) {
    const d = document.createElement('div');
    d.className = 'fx'; d.textContent = pick(list);
    const ang = Math.random() * Math.PI * 2, dist = 50 + Math.random() * 90;
    d.style.left = x + 'px'; d.style.top = y + 'px';
    d.style.setProperty('--dx', Math.cos(ang) * dist + 'px');
    d.style.setProperty('--dy', Math.sin(ang) * dist - 30 + 'px');
    d.style.setProperty('--rot', (Math.random() * 120 - 60) + 'deg');
    fx.appendChild(d);
    setTimeout(() => d.remove(), 950);
  }
}
function burstEl(el) { if (!el) return; const r = el.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2); }
function confetti() { for (let i = 0; i < 5; i++) setTimeout(() => burst(innerWidth * (.15 + Math.random() * .7), innerHeight * (.2 + Math.random() * .4), ['🎉', '⭐', '💖', '🌈', '✨']), i * 160); }

let toastTimer = null;
function toast(msg) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t);
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.remove(), 2400);
}
function modal({ title, html = '', buttons }) {
  return new Promise(res => {
    const o = document.createElement('div'); o.className = 'overlay';
    o.innerHTML = `<div class="modal" role="dialog" aria-modal="true"><h2>${title}</h2>${html}<div class="row-btns">${buttons.map((b, i) => `<button class="btn ${b.cls || ''}" data-i="${i}">${b.label}</button>`).join('')}</div></div>`;
    o.addEventListener('click', e => { const b = e.target.closest('button[data-i]'); if (!b) return; Snd.play('tap'); o.remove(); res(+b.dataset.i); });
    document.body.appendChild(o);
  });
}
const confirmDialog = (title, html, yes = 'うん', no = 'やめる') => modal({ title, html, buttons: [{ label: no, cls: 'lemon' }, { label: yes, cls: 'pink' }] }).then(i => i === 1);

/* =============== 進み具合・れんぞく・あそぶ時間 =============== */
function touchStreak() {
  const t = dateStr(), st = S.streak;
  if (st.lastPlayed === t) return;
  st.days = st.lastPlayed === yesterdayStr() ? st.days + 1 : 1;
  st.lastPlayed = t;
}
function curStreak() { const l = S.streak.lastPlayed; return l === dateStr() || l === yesterdayStr() ? S.streak.days : 0; }

function record(a, b, ok) {
  const k = qkey(a, b), m = S.mastery[k] || 0;
  S.attempts[k] = (S.attempts[k] || 0) + 1;
  if (ok) { S.correct[k] = (S.correct[k] || 0) + 1; S.mastery[k] = Math.min(3, m + 1); }
  else { S.mistakes[k] = (S.mistakes[k] || 0) + 1; S.mastery[k] = Math.max(0, m - 1); }
  touchStreak(); save();
}
function grantItem(id) { if (!S.items.includes(id)) { S.items.push(id); return true; } return false; }
function checkMasters() {
  const out = [];
  for (let d = 1; d <= 9; d++) {
    if (S.masteredDans.includes(d)) continue;
    let all = true;
    for (let b = 1; b <= 9; b++) if ((S.mastery[qkey(d, b)] || 0) < 3) { all = false; break; }
    if (all) { S.masteredDans.push(d); const id = LIMITED_BY_DAN[d]; if (id) grantItem(id); out.push({ dan: d, item: id }); }
  }
  return out;
}
function tickTime() {
  const t = dateStr();
  if (S.today.date !== t) S.today = { date: t, seconds: 0 };
  if (!document.hidden && cur && cur !== 'parent') { S.today.seconds += 5; save(); }
}
setInterval(tickTime, 5000);
function overLimit() {
  const lim = S.settings.dailyLimitMinutes;
  if (S.today.date !== dateStr()) return false;
  return lim > 0 && S.today.seconds / 60 >= lim;
}
function guardPlay(fn) {
  if (!overLimit()) { fn(); return; }
  modal({ title: 'きょうは ここまで！', html: '<p>たくさん がんばったね。<br>また あした あそぼうね！</p>', buttons: [{ label: 'おしまい', cls: 'pink' }] }).then(() => go('home'));
}

/* =============== 出題 =============== */
function pickQ(dans, lastKey, exclude) {
  const c = [];
  for (const a of dans) for (let b = 1; b <= 9; b++) {
    const k = qkey(a, b);
    if (k === lastKey && dans.length * 9 > 1) continue;
    if (exclude && exclude.has(k)) continue;
    c.push({ a, b, w: 4 - (S.mastery[k] || 0) });
  }
  if (!c.length) return pickQ(dans, lastKey);
  let r = Math.random() * c.reduce((s, q) => s + q.w, 0);
  for (const q of c) { r -= q.w; if (r < 0) return { a: q.a, b: q.b }; }
  return { a: c[0].a, b: c[0].b };
}
function choices(a, b) {
  const ans = a * b, cand = new Set();
  [a * (b + 1), a * (b - 1), (a + 1) * b, (a - 1) * b, ans + 1, ans - 1, ans + 10, ans - 10, a + b, ans + a, ans - a]
    .forEach(v => { if (v >= 1 && v <= 81 && v !== ans) cand.add(v); });
  const arr = shuffle([...cand]).slice(0, 3);
  while (arr.length < 3) { const v = 1 + rnd(81); if (v !== ans && !arr.includes(v)) arr.push(v); }
  return shuffle([ans, ...arr]);
}

/* =============== 画面の骨組み =============== */
let cur = null, cleanup = null, lastRes = null;
const screens = {};
const actions = {};

function statsHTML() {
  return `<span class="chip">🔥 れんぞく <b>${curStreak()}</b>にち</span><span class="chip" id="coinChip">🪙 コイン <b>${S.coins}</b>こ</span>`;
}
function updateCoin() { const c = $('#coinChip b'); if (c) c.textContent = S.coins; }
function frame({ title, back, body, home, mainCls = '' }) {
  return `<div class="screen"><header class="top">
    ${back ? `<button class="btn round" data-act="go" data-to="${back}" aria-label="もどる">←</button>` : ''}
    <h1>${title}</h1><div class="stats">${statsHTML()}</div>
    ${home ? '<button class="btn round gear" id="gear" aria-label="ほごしゃ">⚙️</button>' : ''}
  </header><main class="main ${mainCls}">${body}</main></div>`;
}
function go(name, params) {
  if (cleanup) { try { cleanup(); } catch (e) { /* 無視 */ } cleanup = null; }
  Voice.cancel(); setWake(false);
  cur = name;
  screens[name](params || {});
  Voice.refresh();
}

/* =============== だんの選択 =============== */
let selDans = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
function danPickerHTML() {
  const all = selDans.size === 9;
  return `<button class="dan-chip ${all ? 'on' : ''}" data-act="dan-all">ぜんぶ</button>` +
    [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<button class="dan-chip ${!all && selDans.has(n) ? 'on' : ''}" data-act="dan-tog" data-n="${n}">${n}のだん</button>`).join('');
}
actions['dan-all'] = () => { selDans = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]); $('#picker').innerHTML = danPickerHTML(); };
actions['dan-tog'] = el => {
  const n = +el.dataset.n;
  if (selDans.size === 9) selDans = new Set([n]);
  else if (selDans.has(n)) selDans.delete(n); else selDans.add(n);
  if (!selDans.size) selDans = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  $('#picker').innerHTML = danPickerHTML();
};

/* =============== ホーム =============== */
screens.home = () => {
  let hello;
  const l = S.streak.lastPlayed;
  if (!S.seenHello && !l) hello = 'はじめまして！ ここちゃんだよ。いっしょに あそぼう！';
  else if (l && l !== dateStr() && l !== yesterdayStr()) hello = 'またあえたね！ あいたかったよ！';
  else hello = pick(HELLO_MSG);
  app.innerHTML = frame({
    title: 'くくの ひみつのまち', home: true,
    body: `<div class="home">
      <div class="home-chars">
        <div class="bubble">${hello}</div>
        <div class="duo">
          <div class="char mine">${avatarSVG(S.avatar, { face: 'happy' })}<span class="name">のんちゃん</span></div>
          <div class="char nav">${avatarSVG(NPC.coco, { face: 'happy', cls: 'bob' })}<span class="name">${NPC.coco.name}</span></div>
        </div>
      </div>
      <nav class="menu">
        <button class="btn pink" data-act="go" data-to="learn"><span class="ico">📖</span>おぼえよう<small>となえて おぼえる</small></button>
        <button class="btn mint" data-act="go" data-to="play"><span class="ico">🎈</span>あそぼう<small>ゲームで れんしゅう</small></button>
        <button class="btn lemon" data-act="go" data-to="testsel"><span class="ico">✏️</span>ためしてみよう<small>10もん チャレンジ</small></button>
        <button class="btn lav" data-act="go" data-to="closet"><span class="ico">👗</span>きせかえルーム<small>ごほうびで おしゃれ</small></button>
      </nav></div>`,
  });
  S.seenHello = true; save();
  // ほごしゃ用：ながおしで ひらく
  const gear = $('#gear'); let gt = null;
  const stop = () => { clearTimeout(gt); gear.classList.remove('holding'); };
  gear.addEventListener('pointerdown', e => { e.preventDefault(); gear.classList.add('holding'); gt = setTimeout(() => { stop(); go('parent'); }, 900); });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => gear.addEventListener(ev, stop));
  gear.addEventListener('click', () => toast('ほごしゃの かたは ながおしで ひらけます'));
};

/* =============== おぼえよう =============== */
const DAN_COLORS = ['pink', 'mint', 'lemon', 'sky', 'lav'];
screens.learn = () => {
  app.innerHTML = frame({
    title: 'おぼえよう', back: 'home',
    body: `<p class="section-title">どの だんを おぼえる？</p><div class="dan-grid">` +
      [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => {
        const stamp = S.stamps.includes(n), master = S.masteredDans.includes(n);
        return `<button class="btn ${DAN_COLORS[(n - 1) % 5]} dan-card" data-act="dan" data-n="${n}">${n}のだん<small>${master ? 'マスター！' : stamp ? 'スタンプ ゲット' : 'れんしゅう'}</small>${master ? '<span class="stamp">👑</span>' : stamp ? '<span class="stamp">⭐</span>' : ''}</button>`;
      }).join('') + '</div>',
  });
};
actions.dan = el => go('dan', { n: +el.dataset.n });

let L = null;
screens.dan = ({ n }) => {
  L = { n, sel: 1, playing: false };
  app.innerHTML = frame({
    title: `${n}のだん`, back: 'learn',
    body: `<div class="cols learn">
      <div class="panel kuku-list" id="klist">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(b => `
        <div class="krow ${b === 1 ? 'sel' : ''}" data-act="row" data-b="${b}" id="kr${b}">
          <span class="eq">${n}×${b}＝${n * b}</span><span class="yomi">${kukuReading[n][b]}</span>
          <button class="speak voice-btn" data-act="speak" data-b="${b}" aria-label="よむ">🔊</button>
        </div>`).join('')}</div>
      <div class="array-col"><div class="panel array-panel" id="arr"></div>
        <div class="row-btns">
          <button class="btn sky voice-btn" id="readAll" data-act="readall">🔊 ぜんぶよむ</button>
          <button class="btn pink" data-act="dq-start">✨ おぼえたかな？</button>
        </div></div></div>`,
  });
  cleanup = () => { L.playing = false; };
  showArray(1);
};
function showArray(b) {
  const n = L.n; L.sel = b;
  document.querySelectorAll('.krow').forEach(r => r.classList.toggle('sel', +r.dataset.b === b));
  const e = DAN_EMOJI[n];
  $('#arr').innerHTML = `<div class="array-title">${n} × ${b} ＝ ${n * b}</div>
    <div class="array-sub">${n}こずつ ${b}グループ → ぜんぶで ${n * b}こ</div>
    <div class="groups">${Array.from({ length: b }, (_, i) => `<div class="grp g${n <= 2 ? n : n === 4 ? 4 : 3}" style="animation-delay:${i * 50}ms">${Array.from({ length: n }, () => `<span>${e}</span>`).join('')}</div>`).join('')}</div>`;
}
actions.row = el => {
  if (L.playing) stopReadAll();
  const b = +el.dataset.b; showArray(b); Voice.speak(kukuReading[L.n][b]);
};
actions.speak = (el, ev) => { ev.stopPropagation(); actions.row(el.closest('.krow')); };
function stopReadAll() {
  L.playing = false; Voice.cancel();
  document.querySelectorAll('.krow.now').forEach(r => r.classList.remove('now'));
  const b = $('#readAll'); if (b) b.textContent = '🔊 ぜんぶよむ';
}
actions.readall = () => {
  if (L.playing) { stopReadAll(); return; }
  L.playing = true; $('#readAll').textContent = '⏹ とめる';
  const step = b => {
    if (!L.playing || cur !== 'dan') return;
    if (b > 9) { stopReadAll(); return; }
    document.querySelectorAll('.krow.now').forEach(r => r.classList.remove('now'));
    $('#kr' + b).classList.add('now'); showArray(b);
    Voice.speak(kukuReading[L.n][b], () => setTimeout(() => step(b + 1), 350));
  };
  step(1);
};

/* おぼえたかな？ ミニテスト（穴うめ） */
let DQ = null;
actions['dq-start'] = () => {
  const n = L.n;
  DQ = { n, list: shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).map(b => ({ b, blank: Math.random() < .6 ? 'ans' : 'b' })), i: 0, ok: 0, wrong: false };
  cleanup = () => { DQ.dead = true; };
  renderDQ();
};
function renderDQ() {
  const { n, list, i } = DQ, q = list[i], b = q.b;
  let opts;
  if (q.blank === 'ans') opts = choices(n, b);
  else { const o = new Set([b]); while (o.size < 4) o.add(1 + rnd(9)); opts = shuffle([...o]); }
  DQ.ans = q.blank === 'ans' ? n * b : b; DQ.wrong = false; DQ.locked = false;
  const eq = q.blank === 'ans' ? `${n}×${b}＝<span class="ans-box" id="qbox">？</span>` : `${n}×<span class="ans-box" id="qbox">？</span>＝${n * b}`;
  app.innerHTML = frame({
    title: `おぼえたかな？ ${i + 1}/9`, back: 'dan-back', mainCls: 'fl',
    body: `<div class="panel" style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:18px">
      <div class="qbanner">${eq}<span class="sub" id="qsub">こたえを えらんでね</span></div>
      <div class="choices">${opts.map(v => `<button class="btn" data-act="dq-ans" data-v="${v}">${v}</button>`).join('')}</div></div>`,
  });
}
screens['dan-back'] = () => go('dan', { n: DQ.n });
actions['dq-ans'] = el => {
  if (DQ.locked) return;
  const v = +el.dataset.v, q = DQ.list[DQ.i];
  if (v === DQ.ans) {
    DQ.locked = true;
    if (!DQ.wrong) { record(DQ.n, q.b, true); DQ.ok++; }
    $('#qbox').textContent = v; el.classList.add('right'); burstEl(el); Snd.play('ok');
    $('#qsub').textContent = `${pick(OK_MSG)}　${kukuReading[DQ.n][q.b]}`;
    setTimeout(() => {
      if (DQ.dead) return;
      DQ.i++;
      if (DQ.i >= 9) finishDQ(); else renderDQ();
    }, 1300);
  } else {
    if (!DQ.wrong) { record(DQ.n, q.b, false); DQ.wrong = true; }
    el.classList.add('wrong'); el.disabled = true; Snd.play('ng');
    $('#qsub').textContent = pick(NG_MSG);
  }
};
function finishDQ() {
  let note = '';
  if (DQ.ok >= 8) { if (!S.stamps.includes(DQ.n)) S.stamps.push(DQ.n); note = `⭐ ${DQ.n}のだん スタンプ ゲット！`; }
  else note = 'もういちど おぼえて チャレンジしよう！';
  const n = DQ.n;
  finishSession({ title: `${n}のだん おぼえたかな？`, ok: DQ.ok, total: 9, coins: DQ.ok, note, retry: () => go('dan', { n }), retryLabel: 'もういちど よむ' });
}

/* =============== あそぼう =============== */
screens.play = () => {
  app.innerHTML = frame({
    title: 'あそぼう', back: 'home',
    body: `<p class="section-title">どの だんを あそぶ？</p><div class="dan-picker" id="picker">${danPickerHTML()}</div>
      <p class="section-title">ゲームを えらんでね！</p>
      <div class="menu" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr));margin-top:8px">
        <button class="btn pink" data-act="g-balloon"><span class="ico">🎈</span>ふうせんわり<small>こたえの ふうせんを タップ</small></button>
        <button class="btn mint" data-act="g-shop"><span class="ico">🍪</span>かわいいおみせやさん<small>ちゅうもんを うけよう</small></button>
        <button class="btn lav" data-act="g-mole"><span class="ico">🔨</span>もぐらたたき<small>こたえの もぐらを タップ</small></button>
      </div>`,
  });
};
actions['g-balloon'] = () => guardPlay(() => go('balloon'));
actions['g-shop'] = () => guardPlay(() => go('shopgame'));
actions['g-mole'] = () => guardPlay(() => go('mole'));

/* ---- ふうせんわり ---- */
let G = null;
screens.balloon = () => {
  const dans = [...selDans];
  app.innerHTML = frame({
    title: 'ふうせんわり', back: 'play', mainCls: 'fl',
    body: `<div class="qbanner" id="bq"></div><div class="timebar"><i id="tb"></i></div>
      <div class="field" id="field"><div class="mascot l" id="mL"></div><div class="mascot r" id="mR"></div></div>`,
  });
  setWake(true);
  G = { dans, t: 60, ok: 0, total: 0, q: null, last: null, bal: [], over: false, wrong: false, lastSpawn: 0, mist: new Set(), fr: shuffle(FRIENDS).slice(0, 2), raf: 0 };
  const field = $('#field'); let W = 0, H = 0;
  const measure = () => { const r = field.getBoundingClientRect(); W = r.width; H = r.height; };
  measure(); window.addEventListener('resize', measure);
  const face = (id, npc, f) => { const m = document.getElementById(id); if (m) m.innerHTML = avatarSVG(NPC[npc], { face: f }); };
  const faces = f => { face('mL', G.fr[0], f); face('mR', G.fr[1], f); };
  faces('normal');
  const cheerUp = f => {
    faces(f);
    if (f === 'cheer') { ['mL', 'mR'].forEach(id => { const m = document.getElementById(id); if (m) { m.classList.remove('jump'); void m.offsetWidth; m.classList.add('jump'); } }); }
    clearTimeout(G.ft); G.ft = setTimeout(() => { if (!G.over) faces('normal'); }, 1100);
  };
  const say = (txt, cls) => {
    field.querySelectorAll('.msg').forEach(m => m.remove());
    const m = document.createElement('div'); m.className = 'msg ' + cls; m.textContent = txt; field.appendChild(m);
    setTimeout(() => m.remove(), 1600);
  };
  const nextQ = () => {
    G.q = pickQ(G.dans, G.last); G.last = qkey(G.q.a, G.q.b); G.wrong = false;
    $('#bq').innerHTML = `${G.q.a}×${G.q.b}＝？`;
  };
  const randVal = () => {
    const { a, b } = G.q;
    if (Math.random() < .7) return pick(choices(a, b).filter(v => v !== a * b));
    return (1 + rnd(9)) * (1 + rnd(9));
  };
  const spawn = v => {
    const el = document.createElement('div'); el.className = 'balloon';
    el.style.setProperty('--c', pick(BALLOON_COLORS));
    el.innerHTML = `<div class="b-in"><div class="b-body">${v}</div><div class="b-knot"></div><div class="b-str"></div></div>`;
    field.appendChild(el);
    const bs = el.offsetWidth || 90, lanes = Math.max(2, Math.floor(W / (bs + 8))), laneW = W / lanes;
    let lane = rnd(lanes);
    for (let t = 0; t < 8; t++) { const l = rnd(lanes); if (!G.bal.some(b => b.lane === l && b.y > H - bs * 1.8)) { lane = l; break; } }
    const b = { el, v, y: H + 10, vy: (55 + rnd(30)) * (reduced ? .6 : 1), lane, bs };
    el.style.left = (lane * laneW + (laneW - bs) / 2) + 'px';
    el.style.transform = `translate3d(0,${b.y}px,0)`;
    G.bal.push(b);
  };
  const removeB = b => { b.el.remove(); G.bal = G.bal.filter(x => x !== b); };
  let prev = performance.now();
  const tick = now => {
    if (G.over) return;
    const dt = Math.min(.05, (now - prev) / 1000); prev = now;
    G.t -= dt; $('#tb').style.width = Math.max(0, G.t / 60 * 100) + '%';
    if (G.t <= 0) { end(); return; }
    for (const b of G.bal.slice()) {
      if (b.popped) continue;
      b.y -= b.vy * dt; b.el.style.transform = `translate3d(0,${b.y}px,0)`;
      if (b.y < -b.bs * 1.5) removeB(b);
    }
    const ans = G.q.a * G.q.b, bsz = G.bal[0] ? G.bal[0].bs : 100;
    const target = Math.max(4, Math.min(8, Math.floor(W / (bsz + 24)) + 2));
    if (!G.bal.some(b => b.v === ans && !b.popped)) spawn(ans);
    else if (G.bal.length < target && now - G.lastSpawn > 650) { spawn(randVal()); G.lastSpawn = now; }
    G.raf = requestAnimationFrame(tick);
  };
  const end = () => {
    G.over = true; cancelAnimationFrame(G.raf);
    say('じかんだよ！ よくがんばったね', 'ok'); faces('cheer');
    setTimeout(() => {
      if (cur !== 'balloon') return;
      finishSession({ title: 'ふうせんわり', ok: G.ok, total: G.ok, coins: G.ok, unit: 'もん', retry: () => go('balloon') });
    }, 1400);
  };
  field.addEventListener('pointerdown', e => {
    if (G.over) return;
    if (e.pointerType === 'touch' && (e.width > 100 || e.height > 100)) return; // てのひら対策
    const el = e.target.closest('.balloon'); if (!el) return;
    const b = G.bal.find(x => x.el === el); if (!b || b.popped) return;
    const { a, b: bb } = G.q, ans = a * bb;
    if (b.v === ans) {
      b.popped = true; el.classList.add('pop'); setTimeout(() => removeB(b), 300);
      burst(e.clientX, e.clientY); Snd.play('pop'); Snd.play('ok');
      if (!G.wrong) record(a, bb, true);
      G.ok++; G.total++;
      say(`${pick(OK_MSG)} ${kukuReading[a][bb]}`, 'ok'); cheerUp('cheer');
      nextQ();
    } else {
      el.classList.remove('wob'); void el.offsetWidth; el.classList.add('wob'); setTimeout(() => el.classList.remove('wob'), 520);
      if (!G.wrong) { G.wrong = true; record(a, bb, false); G.mist.add(qkey(a, bb)); }
      Snd.play('ng'); say(pick(NG_MSG), 'ng'); cheerUp('sad');
    }
  });
  cleanup = () => { G.over = true; cancelAnimationFrame(G.raf); window.removeEventListener('resize', measure); clearTimeout(G.ft); };
  nextQ(); G.raf = requestAnimationFrame(tick);
};

/* ---- かわいいおみせやさん ---- */
let SG = null;
screens.shopgame = () => {
  SG = { dans: [...selDans], n: 0, total: 8, ok: 0, last: null };
  setWake(true);
  nextCustomer();
};
function nextCustomer() {
  const g = SG;
  if (g.n >= g.total) { finishSession({ title: 'かわいいおみせやさん', ok: g.ok, total: g.total, coins: g.ok, retry: () => go('shopgame') }); return; }
  g.q = pickQ(g.dans, g.last); g.last = qkey(g.q.a, g.q.b);
  g.wrong = false; g.locked = false; g.cust = pick(FRIENDS); g.good = pick(SHOP_GOODS);
  const { a, b } = g.q, opts = choices(a, b);
  app.innerHTML = frame({
    title: `かわいいおみせやさん ${g.n + 1}/${g.total}`, back: 'play',
    body: `<div class="cols shop-wrap">
      <div class="side"><div class="bubble" id="sbub">「${g.good.name}を ${a}こずつ、${b}ふくろ ください！」</div>
        <div class="char" id="cust" style="width:min(220px,60%)">${avatarSVG(NPC[g.cust], { face: 'normal' })}</div></div>
      <div class="panel" style="display:flex;flex-direction:column;gap:12px">
        <div class="counter" id="counter"><span style="align-self:center;color:var(--ink-soft);font-weight:700">ここに ${g.good.e} が はいるよ</span></div>
        <div class="section-title">${a}こずつ ${b}ふくろ → ぜんぶで いくつかな？</div>
        <div class="choices">${opts.map(v => `<button class="btn" data-act="shop-ans" data-v="${v}">${v}</button>`).join('')}</div>
      </div></div>`,
  });
  cleanup = () => { SG.dead = true; };
}
actions['shop-ans'] = el => {
  const g = SG; if (g.locked) return;
  const v = +el.dataset.v, { a, b } = g.q, ans = a * b;
  const cust = $('#cust'), bub = $('#sbub');
  if (v === ans) {
    g.locked = true; g.ok++; g.n++;
    if (!g.wrong) record(a, b, true);
    el.classList.add('right'); Snd.play('ok'); Snd.play('coin'); burstEl(el);
    $('#counter').innerHTML = Array.from({ length: b }, (_, i) =>
      `<div class="bag" style="animation-delay:${i * 130}ms;grid-template-columns:repeat(${Math.min(a, 3)},auto)">${Array.from({ length: a }, () => `<span>${g.good.e}</span>`).join('')}</div>`).join('');
    cust.innerHTML = avatarSVG(NPC[g.cust], { face: 'cheer', cls: 'jump' });
    bub.textContent = `ありがとう！ ぜんぶで ${ans}こ！ ${kukuReading[a][b]}`;
    setTimeout(() => { if (cur === 'shopgame' && !g.dead) nextCustomer(); }, 1700 + b * 130);
  } else {
    if (!g.wrong) { g.wrong = true; record(a, b, false); }
    el.classList.add('wrong'); el.disabled = true; Snd.play('ng');
    cust.innerHTML = avatarSVG(NPC[g.cust], { face: 'sad' });
    bub.textContent = pick(NG_MSG);
    setTimeout(() => { const c = $('#cust'); if (c && !g.locked) c.innerHTML = avatarSVG(NPC[g.cust], { face: 'normal' }); }, 1200);
  }
};

/* ---- もぐらたたき ---- */
let MO = null;
const moleSVG = v => `<svg class="moleimg" viewBox="0 0 100 120" aria-hidden="true">
  <rect x="14" y="30" width="72" height="80" rx="26" fill="#a9734a"/>
  <rect x="26" y="62" width="48" height="36" rx="16" fill="#e8c7a4"/>
  <rect x="26" y="40" width="10" height="14" rx="5" fill="#4a3340"/><rect x="64" y="40" width="10" height="14" rx="5" fill="#4a3340"/>
  <circle cx="29" cy="44" r="2.6" fill="#fff"/><circle cx="67" cy="44" r="2.6" fill="#fff"/>
  <rect x="40" y="52" width="20" height="13" rx="6" fill="#ff8fb8"/>
  <circle cx="20" cy="58" r="6" fill="#ff9bb5" opacity=".6"/><circle cx="80" cy="58" r="6" fill="#ff9bb5" opacity=".6"/>
  <rect x="18" y="72" width="64" height="44" rx="10" fill="#fff" stroke="#ff8fb8" stroke-width="5"/>
  <text x="50" y="106" text-anchor="middle" font-size="34" font-weight="900" fill="#5A3E48" font-family="inherit">${v}</text></svg>`;
screens.mole = () => {
  app.innerHTML = frame({
    title: 'もぐらたたき', back: 'play', mainCls: 'fl',
    body: `<div class="qbanner" id="mq"></div><div class="timebar"><i id="mtb"></i></div>
      <div class="moles" id="moles">${Array.from({ length: 6 }, (_, i) => `<div class="hole" data-i="${i}"><div class="mole"></div><div class="dirt"></div></div>`).join('')}</div>`,
  });
  setWake(true);
  const holes = [...document.querySelectorAll('.hole')];
  MO = { dans: [...selDans], t: 60, ok: 0, q: null, last: null, wrong: false, over: false, last_spawn: 0, slots: holes.map(() => ({ v: null, hide: 0 })) };
  const field = $('#moles');
  const say = (txt, cls) => {
    field.querySelectorAll('.msg').forEach(m => m.remove());
    const m = document.createElement('div'); m.className = 'msg ' + cls; m.textContent = txt; field.appendChild(m);
    setTimeout(() => m.remove(), 1500);
  };
  const nextQ = () => {
    MO.q = pickQ(MO.dans, MO.last); MO.last = qkey(MO.q.a, MO.q.b); MO.wrong = false;
    $('#mq').textContent = `${MO.q.a}×${MO.q.b}＝？`;
  };
  const show = (i, v) => {
    const h = holes[i]; h.querySelector('.mole').innerHTML = moleSVG(v);
    MO.slots[i] = { v, hide: Date.now() + 2600 + rnd(900) };
    requestAnimationFrame(() => h.classList.add('up'));
    setTimeout(() => h.classList.add('up'), 30);
  };
  const hide = i => { holes[i].classList.remove('up'); MO.slots[i] = { v: null, hide: 0 }; };
  const spawn = v => {
    const free = MO.slots.map((s, i) => s.v === null ? i : -1).filter(i => i >= 0);
    if (!free.length) return false;
    show(pick(free), v); return true;
  };
  const tick = () => {
    if (MO.over) return;
    MO.t -= .1; $('#mtb').style.width = Math.max(0, MO.t / 60 * 100) + '%';
    if (MO.t <= 0) { end(); return; }
    const now = Date.now(), ans = MO.q.a * MO.q.b;
    MO.slots.forEach((s, i) => { if (s.v !== null && now > s.hide) hide(i); });
    const active = MO.slots.filter(s => s.v !== null).length;
    if (!MO.slots.some(s => s.v === ans)) {
      if (active >= 4) { const w = MO.slots.findIndex(s => s.v !== null && s.v !== ans); if (w >= 0) hide(w); }
      spawn(ans); MO.last_spawn = now;
    } else if (active < 3 && now - MO.last_spawn > 600) {
      const { a, b } = MO.q;
      spawn(Math.random() < .7 ? pick(choices(a, b).filter(v => v !== ans)) : (1 + rnd(9)) * (1 + rnd(9)));
      MO.last_spawn = now;
    }
  };
  const end = () => {
    MO.over = true; clearInterval(MO.iv);
    say('じかんだよ！ よくがんばったね', 'ok');
    setTimeout(() => { if (cur === 'mole') finishSession({ title: 'もぐらたたき', ok: MO.ok, total: MO.ok, coins: MO.ok, unit: 'もん', retry: () => go('mole') }); }, 1400);
  };
  field.addEventListener('pointerdown', e => {
    if (MO.over) return;
    if (e.pointerType === 'touch' && (e.width > 100 || e.height > 100)) return;
    const h = e.target.closest('.hole'); if (!h) return;
    const i = +h.dataset.i, s = MO.slots[i]; if (s.v === null) return;
    const { a, b } = MO.q, ans = a * b;
    if (s.v === ans) {
      hide(i); burst(e.clientX, e.clientY); Snd.play('pop'); Snd.play('ok');
      if (!MO.wrong) record(a, b, true);
      MO.ok++; say(`${pick(OK_MSG)} ${kukuReading[a][b]}`, 'ok'); nextQ();
    } else {
      h.classList.remove('wob'); void h.offsetWidth; h.classList.add('wob'); setTimeout(() => h.classList.remove('wob'), 520);
      if (!MO.wrong) { MO.wrong = true; record(a, b, false); }
      Snd.play('ng'); say(pick(NG_MSG), 'ng');
    }
  });
  cleanup = () => { MO.over = true; clearInterval(MO.iv); };
  nextQ(); MO.iv = setInterval(tick, 100);
};

/* =============== ためしてみよう =============== */
screens.testsel = () => {
  app.innerHTML = frame({
    title: 'ためしてみよう', back: 'home',
    body: `<p class="section-title">どの だんを ためす？</p><div class="dan-picker" id="picker">${danPickerHTML()}</div>
      <div class="row-btns"><button class="btn lemon" style="min-width:min(420px,90%);min-height:84px;font-size:32px" data-act="test-go">✏️ スタート！</button></div>
      <p class="section-title" style="color:var(--ink-soft)">10もん。ぜんぶ せいかいで とくべつな プレゼント！</p>`,
  });
};
actions['test-go'] = () => startTest([...selDans]);
let T = null;
function startTest(dans, list) {
  guardPlay(() => {
    let qs = list;
    if (!qs) {
      qs = []; const used = new Set(); let last = null;
      for (let i = 0; i < 10; i++) {
        let q;
        for (let t = 0; t < 15; t++) { q = pickQ(dans, last); if (!used.has(qkey(q.a, q.b))) break; }
        used.add(qkey(q.a, q.b)); last = qkey(q.a, q.b); qs.push(q);
      }
    }
    T = { qs, dans, i: 0, input: '', ok: 0, mist: [], phase: 'ask', isRetry: !!list };
    go('test');
  });
}
screens.test = () => { setWake(true); renderTest(); };
function renderTest() {
  const q = T.qs[T.i];
  const keys = [7, 8, 9, 4, 5, 6, 1, 2, 3].map(n => `<button class="btn" data-act="key" data-k="${n}">${n}</button>`).join('') +
    `<button class="btn lemon wide" data-act="key" data-k="back">⌫ もどす</button><button class="btn" data-act="key" data-k="0">0</button><button class="btn pink wide" data-act="key" data-k="ok">きめる</button>`;
  let lower;
  if (T.phase === 'ask') lower = `<div class="keypad">${keys}</div>`;
  else if (T.fb) lower = `<div class="fb ok">⭕ せいかい！ ${pick(OK_MSG)}</div><div class="row-btns"><button class="btn pink" data-act="test-next">つぎへ ▶</button></div>`;
  else lower = `<div class="fb ng">💡 こたえは ${q.a * q.b} だよ<small>${kukuReading[q.a][q.b]}</small><small>${pick(NG_MSG)}</small></div><div class="row-btns"><button class="btn pink" data-act="test-next">つぎへ ▶</button></div>`;
  app.innerHTML = frame({
    title: `ためしてみよう ${T.i + 1}/${T.qs.length}`, back: 'testsel', mainCls: 'fl',
    body: `<div class="qbanner" style="margin:6px 0">${q.a}×${q.b}＝<span class="ans-box" id="ansbox">${T.phase === 'ask' ? (T.input || '　') : (T.fb ? q.a * q.b : T.input)}</span></div>${lower}`,
  });
}
actions.key = el => {
  if (T.phase !== 'ask') return;
  const k = el.dataset.k;
  if (k === 'back') T.input = T.input.slice(0, -1);
  else if (k === 'ok') {
    if (!T.input) return;
    const q = T.qs[T.i], ok = +T.input === q.a * q.b;
    record(q.a, q.b, ok); T.phase = 'fb'; T.fb = ok;
    if (ok) { T.ok++; Snd.play('ok'); } else { T.mist.push(q); Snd.play('ng'); }
    renderTest(); if (ok) burstEl($('#ansbox'));
    return;
  } else if (T.input.length < 2) T.input += k;
  $('#ansbox').textContent = T.input || '　';
};
actions['test-next'] = () => {
  T.i++; T.input = ''; T.phase = 'ask';
  if (T.i >= T.qs.length) finishTest(); else renderTest();
};
function finishTest() {
  const total = T.qs.length, ok = T.ok, gained = [];
  const perfect = ok === total && total === 10 && !T.isRetry;
  if (perfect && grantItem('sp_gold')) gained.push('sp_gold');
  const mist = T.mist.slice(), dans = T.dans;
  finishSession({
    title: 'ためしてみよう', ok, total, coins: ok, score: Math.round(ok / total * 100), gained, mist,
    note: perfect ? '🌟 100てん！ とくべつな プレゼント！' : '',
    retry: mist.length ? () => startTest(dans, mist) : () => startTest(dans),
    retryLabel: mist.length ? 'まちがえた もんだいを もういちど' : 'もういちど ためす',
  });
}

/* =============== けっか =============== */
function finishSession(r) {
  S.coins += r.coins;
  const masters = checkMasters();
  const gained = (r.gained || []).slice();
  masters.forEach(m => m.item && gained.push(m.item));
  touchStreak(); save();
  lastRes = Object.assign({}, r, { masters, gained });
  go('result');
}
screens.result = () => {
  const r = lastRes, ratio = r.total ? r.ok / r.total : 0;
  const face = ratio >= .8 || r.gained.length ? 'cheer' : 'happy';
  let msg;
  if (!r.total) msg = 'また いっしょに あそぼうね！';
  else if (ratio >= .9) msg = 'すごい！ かんぺき！';
  else if (ratio >= .6) msg = 'よくできたね！';
  else msg = 'がんばったね！ つぎも いっしょに やろう';
  const gainHTML = r.gained.map(id => {
    const it = ITEM_BY_ID[id], m = r.masters.find(x => x.item === id);
    return `<div class="gain-card"><div class="thumbbox">${thumb(it)}</div><div>${m ? `${m.dan}のだん マスター！<br>` : ''}<b>${it.name}</b><div class="stars-lg" style="font-size:20px">${'★'.repeat(it.rar)}</div></div></div>`;
  }).join('');
  app.innerHTML = frame({
    title: esc(r.title), back: 'home',
    body: `<div class="cols"><div class="side">${avatarSVG(S.avatar, { face, cls: face === 'cheer' ? 'jump' : '' })}</div>
      <div class="result"><div class="big">${msg}</div>
        ${r.score != null ? `<div class="big" style="color:var(--pink-d)">${r.score}てん</div>` : ''}
        ${r.total ? `<div class="coin-line">せいかい ${r.ok}${r.unit === 'もん' ? 'もん' : ` / ${r.total}`}</div>` : ''}
        <div class="coin-line">🪙 コイン +${r.coins}</div>
        ${r.note ? `<div class="coin-line" style="margin-top:6px">${r.note}</div>` : ''}
        ${r.masters.length ? `<div class="coin-line">🎉 ${r.masters.map(m => m.dan + 'のだん').join('・')} マスター！</div>` : ''}
        ${gainHTML ? `<div class="gain">${gainHTML}</div>` : ''}
        ${r.mist && r.mist.length ? `<div class="section-title">こたえを みてみよう</div><div class="mist-list">${r.mist.map(q => `<span class="mist">${q.a}×${q.b}＝${q.a * q.b}</span>`).join('')}</div>` : ''}
        <div class="row-btns">
          <button class="btn pink" data-act="retry">${r.retryLabel || 'もういちど！'}</button>
          <button class="btn mint" data-act="go" data-to="closet">👗 きせかえルーム</button>
          <button class="btn lemon" data-act="go" data-to="home">🏠 ホーム</button>
        </div></div></div>`,
  });
  Snd.play(r.total && ratio >= .6 ? 'fan' : 'ok');
  if (ratio >= .8 || r.gained.length) confetti();
};
actions.retry = () => lastRes && lastRes.retry && lastRes.retry();

/* =============== きせかえルーム =============== */
const C = { tab: 'wear', cat: 'hair', rolling: false };
const isOwned = id => S.items.includes(id);
const starsOf = n => '★'.repeat(n);
function closetGrid() {
  const cat = C.cat;
  const list = ITEMS.filter(i => i.cat === cat);
  if (C.tab === 'wear') {
    const own = list.filter(i => isOwned(i.id));
    let h = '';
    if (!REQUIRED_CATS.includes(cat)) h += `<button class="cell ${!S.avatar[cat] ? 'eq' : ''}" data-act="unequip" data-cat="${cat}"><div class="tb" style="font-size:40px">🚫</div>なし</button>`;
    h += own.map(i => `<button class="cell ${S.avatar[cat] === i.id ? 'eq' : ''}" data-act="equip" data-id="${i.id}"><div class="tb">${thumb(i)}</div>${i.name}<span class="stars">${starsOf(i.rar)}</span>${S.avatar[cat] === i.id ? '<span class="tag">✅</span>' : ''}</button>`).join('');
    if (!own.length) h += `<p style="grid-column:1/-1;text-align:center">まだ ないよ。ショップや ガチャで てにいれよう！</p>`;
    return `<div class="grid">${h}</div>`;
  }
  // ショップ
  const shop = list.filter(i => !i.lim && !i.sp);
  return `<div class="grid">${shop.map(i => isOwned(i.id)
    ? `<div class="cell dim"><div class="tb">${thumb(i)}</div>${i.name}<span class="stars">${starsOf(i.rar)}</span><span class="tag">✅</span><span>もってる</span></div>`
    : `<button class="cell" data-act="buy" data-id="${i.id}"><div class="tb">${thumb(i)}</div>${i.name}<span class="stars">${starsOf(i.rar)}</span><span class="price">🪙 ${PRICE[i.rar]}</span></button>`).join('')}</div>`;
}
function zukanHTML() {
  const total = ITEMS.length, have = ITEMS.filter(i => isOwned(i.id)).length;
  return `<p class="section-title" style="margin-top:0">あつめた かず ${have} / ${total}</p>` + CATS.map(c => {
    const list = ITEMS.filter(i => i.cat === c.id);
    return `<div class="sect">${c.icon} ${c.name}</div><div class="grid">${list.map(i => {
      const own = isOwned(i.id);
      const hint = i.lim ? `${i.lim}のだん マスターで` : i.sp ? 'テスト 100てんで' : 'ショップ・ガチャ';
      return `<div class="cell ${own ? '' : 'sil'}"><div class="tb">${thumb(i)}</div>${own ? i.name : '？？？'}<span class="stars">${starsOf(i.rar)}</span>${own ? '' : `<span style="font-size:14px;color:var(--ink-soft)">${hint}</span>`}</div>`;
    }).join('')}</div>`;
  }).join('');
}
function gachaHTML() {
  return `<div class="gacha"><div class="capsule-wrap" id="capWrap">${capsuleSVG('#ff8fb8', '#fff3a8')}</div>
    <p style="font-weight:800;margin:4px 0">なにが でるかな？ ★が おおいほど レア！</p>
    <button class="btn pink" style="min-height:84px;font-size:32px" data-act="gacha" ${C.rolling ? 'disabled' : ''}>ガチャ 🪙 ${GACHA_COST}</button>
    <p style="color:var(--ink-soft);font-weight:700">かぶっても だいじょうぶ！ 🪙 ${GACHA_REFUND}こ もどるよ</p></div>`;
}
screens.closet = p => {
  if (p && p.tab) C.tab = p.tab;
  const tabs = [['wear', '👗 きせかえ'], ['shop', '🛍️ ショップ'], ['gacha', '🎁 ガチャ'], ['zukan', '📚 ずかん']];
  let content;
  if (C.tab === 'gacha') content = gachaHTML();
  else if (C.tab === 'zukan') content = zukanHTML();
  else content = `<div class="cats">${CATS.map(c => `<button class="cat ${C.cat === c.id ? 'on' : ''}" data-act="cat" data-c="${c.id}">${c.icon} ${c.name}</button>`).join('')}</div>${closetGrid()}`;
  const prev = $('#cpanel'), top = prev ? prev.scrollTop : 0;
  app.innerHTML = frame({
    title: 'きせかえルーム', back: 'home',
    body: `<div class="cols"><div class="side">${sceneSVG(S.avatar, { face: 'happy' })}</div>
      <div style="display:flex;flex-direction:column;min-height:0">
        <div class="tabs">${tabs.map(t => `<button class="btn tab small ${C.tab === t[0] ? 'on' : ''}" data-act="tab" data-t="${t[0]}">${t[1]}</button>`).join('')}</div>
        <div class="panel" id="cpanel" style="flex:1">${content}</div></div></div>`,
  });
  if (prev) { const np = $('#cpanel'); if (np) np.scrollTop = top; }
};
actions.tab = el => { C.tab = el.dataset.t; go('closet'); };
actions.cat = el => { C.cat = el.dataset.c; go('closet'); };
actions.equip = el => {
  const it = ITEM_BY_ID[el.dataset.id], slot = it.cat;
  if (!REQUIRED_CATS.includes(slot) && S.avatar[slot] === it.id) S.avatar[slot] = null; else S.avatar[slot] = it.id;
  save(); Snd.play('tap'); go('closet');
};
actions.unequip = el => { S.avatar[el.dataset.cat] = null; save(); go('closet'); };
actions.buy = async el => {
  const it = ITEM_BY_ID[el.dataset.id], price = PRICE[it.rar];
  if (S.coins < price) { toast('コインが たりないよ。あそんで ためよう！'); return; }
  const yes = await confirmDialog(it.name, `<div class="thumbbox">${thumb(it)}</div><p>🪙 ${price}こで かう？</p>`, 'かう！', 'やめる');
  if (!yes || S.coins < price) return;
  S.coins -= price; grantItem(it.id); save(); Snd.play('coin'); confetti();
  toast('てにいれたよ！ きせかえで つけてみよう'); go('closet');
};
actions.gacha = () => {
  if (C.rolling) return;
  if (S.coins < GACHA_COST) { toast('コインが たりないよ。あそんで ためよう！'); return; }
  C.rolling = true; S.coins -= GACHA_COST; save(); updateCoin();
  const wrap = $('#capWrap'); wrap.classList.add('shake'); Snd.play('shake');
  setTimeout(() => {
    C.rolling = false;
    const r = Math.random() * 100, rar = r < 55 ? 1 : r < 88 ? 2 : 3;
    const it = pick(ITEMS.filter(i => !i.lim && !i.sp && i.rar === rar));
    const dup = isOwned(it.id);
    if (dup) S.coins += GACHA_REFUND; else grantItem(it.id);
    save(); Snd.play('reveal'); confetti();
    modal({
      title: dup ? 'また でたよ！' : '✨ あたらしい なかま！',
      html: `<div class="thumbbox">${thumb(it)}</div><p><b>${it.name}</b></p><div class="stars-lg">${starsOf(it.rar)}</div><p>${dup ? `かぶったから 🪙 ${GACHA_REFUND}こ もどるよ` : 'きせかえルームで つけてみよう！'}</p>`,
      buttons: [{ label: 'やったね！', cls: 'pink' }],
    }).then(() => { if (cur === 'closet') go('closet'); });
  }, 1500);
};

/* =============== ほごしゃ用 =============== */
const LIMIT_OPTS = [0, 10, 20, 30, 45, 60];
screens.parent = () => {
  const rows = [], weak = Object.keys(S.mistakes).filter(k => S.mistakes[k] > 0).sort((a, b) => S.mistakes[b] - S.mistakes[a]).slice(0, 5);
  for (let d = 1; d <= 9; d++) {
    let m = 0, at = 0, co = 0;
    for (let b = 1; b <= 9; b++) { const k = qkey(d, b); m += S.mastery[k] || 0; at += S.attempts[k] || 0; co += S.correct[k] || 0; }
    rows.push(`<div class="bar-row"><span class="lbl">${d}のだん</span><div class="bar"><i style="width:${m / 27 * 100}%"></i></div><span class="val">${at ? `せいかい ${Math.round(co / at * 100)}%（${at}かい）` : 'まだ'}</span></div>`);
  }
  const mins = S.today.date === dateStr() ? Math.floor(S.today.seconds / 60) : 0;
  const lim = S.settings.dailyLimitMinutes;
  app.innerHTML = frame({
    title: 'ほごしゃの かたへ', back: 'home',
    body: `<div class="parent">
      <h2>📊 だんごとの ようす（バー＝おぼえた ぐあい）</h2>${rows.join('')}
      <h2>💪 にがてな くく トップ5</h2>
      <div class="mist-list" style="justify-content:flex-start">${weak.length ? weak.map(k => { const [a, b] = k.split('x'); return `<span class="mist">${a}×${b}＝${a * b}（まちがい ${S.mistakes[k]}かい）</span>`; }).join('') : '<span>まだ ありません</span>'}</div>
      <h2>⚙️ せってい</h2>
      <div class="set-row">おと（こうかおん）<button class="btn small toggle ${S.settings.sound ? 'on' : ''}" data-act="set-sound">${S.settings.sound ? 'ON' : 'OFF'}</button></div>
      <div class="set-row">よみあげ（こえ）<button class="btn small toggle ${S.settings.voice ? 'on' : ''}" data-act="set-voice">${S.settings.voice ? 'ON' : 'OFF'}</button></div>
      <div class="set-row">1にちの あそぶ めやす（きょう ${mins}ふん）<button class="btn small" data-act="set-limit">${lim ? lim + 'ふん' : 'なし'}</button></div>
      <h2>🗑️ データ</h2>
      <div class="set-row">すべての きろくを けす<button class="btn small danger" data-act="reset">リセット</button></div>
      <p style="color:var(--ink-soft);font-size:17px">きろくは この たんまつの なかだけに ほぞんされ、がいぶには おくられません。</p></div>`,
  });
};
actions['set-sound'] = () => { S.settings.sound = !S.settings.sound; save(); Snd.init(); Snd.play('ok'); go('parent'); };
actions['set-voice'] = () => { S.settings.voice = !S.settings.voice; save(); go('parent'); };
actions['set-limit'] = () => { const i = LIMIT_OPTS.indexOf(S.settings.dailyLimitMinutes); S.settings.dailyLimitMinutes = LIMIT_OPTS[(i + 1) % LIMIT_OPTS.length]; save(); go('parent'); };
actions.reset = async () => {
  if (!(await confirmDialog('きろくを けしますか？', '<p>コインや アイテムも ぜんぶ きえます。</p>', 'つぎへ', 'やめる'))) return;
  if (!(await confirmDialog('ほんとうに けしますか？', '<p>もとには もどせません。</p>', 'けす', 'やめる'))) return;
  S = defaultState(); save(); toast('きろくを けしました'); go('home');
};

/* =============== 共通イベント =============== */
actions.go = el => go(el.dataset.to);
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  Snd.init();
  const f = actions[el.dataset.act];
  if (f) f(el, e);
});
// タップまわりの安全対策（ダブルタップ拡大・長押し・複数指・てのひら）
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('selectstart', e => e.preventDefault());
document.addEventListener('dblclick', e => e.preventDefault());
document.addEventListener('gesturestart', e => e.preventDefault());
document.addEventListener('touchstart', e => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
document.addEventListener('touchmove', e => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
let bigTouch = false;
document.addEventListener('pointerdown', e => {
  Snd.init();
  bigTouch = e.pointerType === 'touch' && (e.width > 100 || e.height > 100);
}, true);
document.addEventListener('click', e => { if (bigTouch) { e.stopPropagation(); e.preventDefault(); bigTouch = false; } }, true);

if ('speechSynthesis' in window) {
  speechSynthesis.onvoiceschanged = () => Voice.refresh();
  setTimeout(() => Voice.refresh(), 1500);
}
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
  navigator.serviceWorker.register('sw.js').catch(() => { /* オフライン対応なしでも動く */ });
}
tickTime();
go('home');
