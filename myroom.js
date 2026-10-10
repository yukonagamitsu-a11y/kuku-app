/* マイルーム：アイテムを8割そろえると買える、自分だけのお部屋（壁紙・ゆか・家具をだんかいてきに買う） */
'use strict';
(window.FILE_BUILD = window.FILE_BUILD || {})['myroom'] = '2026-10-13.67'; // ファイルの新旧チェック用

const ROOM_UNLOCK = 0.7;      // 集めた割合（ショップ・ガチャで手に入るアイテム）
const MR_TIER_NEED = { 1: 0, 2: 6, 3: 14 }; // その段階の家具を買うために必要な「買った家具の数」
const MR_DEFAULT = ['w_cream', 'f_wood', 'm_plain'];
const MR_CATS = [
  { id: 'wall', name: 'Wallpaper', icon: '🖼️', optional: false },
  { id: 'floor', name: 'Floor', icon: '🟫', optional: false },
  { id: 'bed', name: 'Bed', icon: '🛏️', optional: true },
  { id: 'desk', name: 'Desk', icon: '🪑', optional: true },
  { id: 'shelf', name: 'Shelf', icon: '📚', optional: true },
  { id: 'window', name: 'Window', icon: '🪟', optional: true },
  { id: 'poster', name: 'Poster', icon: '🎨', optional: true },
  { id: 'rug', name: 'Rug', icon: '🟣', optional: true },
  { id: 'ceiling', name: 'Ceiling', icon: '💡', optional: true },
  { id: 'corner', name: 'Corner', icon: '🪴', optional: true },
];
// ===== おへやの レイアウト（480x280）=====
// かべ（上）： [ たな 12-116 ] [ ランプ用のあき 120-200 ] [ アバターの あたま 205-275 ] [ まど 292-384 ] [ ポスター 390-472 ]
// ゆか（下）： [ ベッド 4-112 ] [ ペット 122-182 ] [ アバター 170-310 ] [ すみっこ 314-362 ] [ つくえ 364-476 ]
// あたらしい かざりを ふやすときも、この はんいの なかで えがくこと（test: MR_ZONES で チェックできる）
const MR_ZONES = {
  shelf: [8, 118], window: [290, 386], poster: [388, 476], // かべ（たな・まど・ポスター）
  bed: [0, 114], corner: [306, 362], desk: [364, 480], // ゆか（ベッド・すみっこ・つくえ）
};
const MR_BOX = {
  wall: [0, 0, 480, 196], floor: [0, 196, 480, 84], bed: [0, 118, 116, 124], desk: [356, 134, 124, 106],
  shelf: [10, 24, 112, 94], window: [290, 24, 98, 94], poster: [386, 24, 92, 84], rug: [120, 218, 240, 58],
  ceiling: [0, 0, 480, 56], corner: [310, 140, 56, 100],
};
// tier: 1=さいしょから / 2=家具を6こ買うと / 3=14こ買うと
const MR_ITEMS = [
  { id: 'w_cream', slot: 'wall', name: 'Cream Wall', price: 0, tier: 1 },
  { id: 'w_pink', slot: 'wall', name: 'Pink Stripes', price: 30, tier: 1 },
  { id: 'w_mint', slot: 'wall', name: 'Mint Dots', price: 30, tier: 1 },
  { id: 'w_sky', slot: 'wall', name: 'Cloudy Sky', price: 70, tier: 2 },
  { id: 'w_lav', slot: 'wall', name: 'Starry Lavender', price: 80, tier: 2 },
  { id: 'w_night', slot: 'wall', name: 'Night Sky', price: 180, tier: 3 },
  { id: 'f_wood', slot: 'floor', name: 'Wood Floor', price: 0, tier: 1 },
  { id: 'f_pink', slot: 'floor', name: 'Pink Tiles', price: 30, tier: 1 },
  { id: 'f_check', slot: 'floor', name: 'Checker Floor', price: 40, tier: 1 },
  { id: 'f_grass', slot: 'floor', name: 'Grass Floor', price: 70, tier: 2 },
  { id: 'f_star', slot: 'floor', name: 'Star Floor', price: 160, tier: 3 },
  { id: 'b_single', slot: 'bed', name: 'Cozy Bed', price: 50, tier: 1 },
  { id: 'b_canopy', slot: 'bed', name: 'Princess Bed', price: 130, tier: 2 },
  { id: 'b_cloud', slot: 'bed', name: 'Cloud Bed', price: 260, tier: 3 },
  { id: 'd_basic', slot: 'desk', name: 'Study Desk', price: 50, tier: 1 },
  { id: 'd_pink', slot: 'desk', name: 'Pink Vanity', price: 110, tier: 2 },
  { id: 'd_piano', slot: 'desk', name: 'Piano', price: 300, tier: 3 },
  { id: 's_books', slot: 'shelf', name: 'Book Shelf', price: 80, tier: 2 },
  { id: 's_toys', slot: 'shelf', name: 'Toy Shelf', price: 90, tier: 2 },
  { id: 's_trophy', slot: 'shelf', name: 'Trophy Shelf', price: 200, tier: 3 },
  { id: 'm_plain', slot: 'window', name: 'Plain Window', price: 0, tier: 1 },
  { id: 'm_window', slot: 'window', name: 'Sunny Window', price: 70, tier: 2 },
  { id: 'm_star', slot: 'window', name: 'Starry Window', price: 150, tier: 3 },
  { id: 'p_rainbow', slot: 'poster', name: 'Rainbow Poster', price: 60, tier: 2 },
  { id: 'p_frame', slot: 'poster', name: 'Photo Frames', price: 70, tier: 2 },
  { id: 'p_galaxy', slot: 'poster', name: 'Galaxy Poster', price: 140, tier: 3 },
  { id: 'r_round', slot: 'rug', name: 'Round Rug', price: 40, tier: 1 },
  { id: 'r_heart', slot: 'rug', name: 'Heart Rug', price: 90, tier: 2 },
  { id: 'r_rainbow', slot: 'rug', name: 'Rainbow Rug', price: 170, tier: 3 },
  { id: 'c_garland', slot: 'ceiling', name: 'Flag Garland', price: 35, tier: 1 },
  { id: 'c_lamp', slot: 'ceiling', name: 'Pendant Lamp', price: 80, tier: 2 },
  { id: 'c_stars', slot: 'ceiling', name: 'Star Mobile', price: 160, tier: 3 },
  { id: 'x_plant', slot: 'corner', name: 'Little Plant', price: 30, tier: 1 },
  { id: 'x_toybox', slot: 'corner', name: 'Toy Box', price: 90, tier: 2 },
  { id: 'x_aquarium', slot: 'corner', name: 'Aquarium', price: 220, tier: 3 },
];
const MR_BY_ID = {};
MR_ITEMS.forEach(i => { MR_BY_ID[i.id] = i; });

const mrStar = (cx, cy, R, r, fill) => `<polygon points="${starPts(cx, cy, R, r)}" fill="${fill}"/>`;

/* ---------- 家具・壁紙・ゆかの絵（お部屋 480x280 の座標） ---------- */
// まどは みぎがわの かべ、ポスターは そのとなり（たなと かさならない ばしょ）
const MR_WINDOW_SHIFT = 176;
const MR_POSTER_TF = 'translate(432 67) scale(.86) translate(-417 -67)';
function mrDraw(id) {
  const raw = mrDrawRaw(id), it = MR_BY_ID[id];
  if (it && it.slot === 'window') return `<g transform="translate(${MR_WINDOW_SHIFT} 0)">${raw}</g>`;
  if (it && it.slot === 'poster') return `<g transform="${MR_POSTER_TF}">${raw}</g>`;
  return raw;
}
function mrDrawRaw(id) {
  switch (id) {
    // かべ
    case 'w_cream': return '<rect width="480" height="196" fill="#fff3e6"/><rect y="150" width="480" height="46" fill="#ffe7cc"/>';
    case 'w_pink': { let s = '<rect width="480" height="196" fill="#ffe3ee"/>'; for (let x = 0; x < 480; x += 40) s += `<rect x="${x + 12}" width="16" height="196" fill="#ffc9de"/>`; return s; }
    case 'w_mint': { let s = '<rect width="480" height="196" fill="#dff7ec"/>'; for (let y = 18; y < 196; y += 36) for (let x = (y / 36) % 2 ? 18 : 36; x < 480; x += 36) s += `<circle cx="${x}" cy="${y}" r="7" fill="#b3ead2"/>`; return s; }
    case 'w_sky': return '<rect width="480" height="196" fill="#d6efff"/>' + [[70, 50], [250, 90], [400, 40], [330, 140], [150, 130]].map(p => `<ellipse cx="${p[0]}" cy="${p[1]}" rx="34" ry="14" fill="#fff" opacity=".9"/><ellipse cx="${p[0] + 16}" cy="${p[1] - 8}" rx="20" ry="12" fill="#fff" opacity=".9"/>`).join('');
    case 'w_lav': return '<rect width="480" height="196" fill="#e6dcff"/>' + [[40, 40], [130, 150], [220, 60], [300, 130], [380, 50], [450, 140], [90, 90], [350, 95]].map(p => mrStar(p[0], p[1], 10, 4.5, '#fff7b8')).join('');
    case 'w_night': return '<rect width="480" height="196" fill="#4a3f7a"/>' + [[40, 30], [130, 120], [220, 50], [300, 140], [390, 70], [450, 150], [90, 80], [350, 25], [180, 160]].map(p => mrStar(p[0], p[1], 7, 3, '#ffe27a')).join('') + '<circle cx="420" cy="48" r="20" fill="#fff7d0"/><circle cx="429" cy="43" r="18" fill="#4a3f7a"/>';
    // ゆか
    case 'f_wood': { let s = '<rect y="196" width="480" height="84" fill="#f0cba0"/>'; for (let x = 0; x < 480; x += 60) s += `<rect x="${x}" y="196" width="2" height="84" fill="#d9ad7c"/>`; return s + '<rect y="226" width="480" height="2" fill="#d9ad7c"/><rect y="256" width="480" height="2" fill="#d9ad7c"/>'; }
    case 'f_pink': { let s = '<rect y="196" width="480" height="84" fill="#ffd9e6"/>'; for (let x = 0; x < 480; x += 48) s += `<rect x="${x}" y="196" width="2" height="84" fill="#ffb7d0"/>`; for (let y = 196; y < 280; y += 28) s += `<rect y="${y}" width="480" height="2" fill="#ffb7d0"/>`; return s; }
    case 'f_check': { let s = '<rect y="196" width="480" height="84" fill="#fff"/>'; for (let r = 0; r < 3; r++) for (let c = 0; c < 12; c++) if ((r + c) % 2) s += `<rect x="${c * 40}" y="${196 + r * 28}" width="40" height="28" fill="#ffd6e4"/>`; return s; }
    case 'f_grass': { let s = '<rect y="196" width="480" height="84" fill="#bfe8a8"/>'; for (let i = 0; i < 70; i++) { const x = (i * 53) % 480, y = 200 + (i * 29) % 76; s += `<path d="M${x} ${y} l2 -7 M${x + 4} ${y} l-1 -6" stroke="#8fcb74" stroke-width="2" stroke-linecap="round"/>`; } return s; }
    case 'f_star': { let s = '<rect y="196" width="480" height="84" fill="#6a5ba8"/>'; for (let i = 0; i < 14; i++) s += mrStar((i * 71 + 20) % 470 + 4, 204 + (i * 37) % 66, 7, 3, '#ffe27a'); return s; }
    // ベッド
    case 'b_single': return '<rect x="6" y="160" width="10" height="70" rx="4" fill="#c98f5b"/><rect x="10" y="206" width="98" height="22" rx="5" fill="#c98f5b"/><rect x="14" y="226" width="8" height="10" fill="#a8703c"/><rect x="94" y="226" width="8" height="10" fill="#a8703c"/><rect x="12" y="184" width="94" height="28" rx="8" fill="#fff"/><rect x="16" y="174" width="32" height="18" rx="8" fill="#ffd6e4"/><rect x="46" y="190" width="60" height="26" rx="8" fill="#ff9fc4"/>';
    case 'b_canopy': return '<rect x="4" y="124" width="6" height="112" fill="#e6b3c9"/><rect x="104" y="124" width="6" height="112" fill="#e6b3c9"/><path d="M2 124 H112 L106 156 Q58 174 8 156 Z" fill="#ffc2dc" opacity=".92"/><rect x="10" y="206" width="98" height="22" rx="5" fill="#e6b3c9"/><rect x="12" y="184" width="94" height="28" rx="8" fill="#fff"/><rect x="16" y="174" width="32" height="18" rx="8" fill="#fff0a8"/><rect x="46" y="190" width="60" height="26" rx="8" fill="#c9b6ff"/>';
    case 'b_cloud': return '<ellipse cx="58" cy="218" rx="54" ry="20" fill="#e3f3ff"/><circle cx="26" cy="204" r="18" fill="#f2faff"/><circle cx="56" cy="196" r="22" fill="#f2faff"/><circle cx="88" cy="204" r="18" fill="#f2faff"/><ellipse cx="34" cy="188" rx="18" ry="9" fill="#fff0a8"/><path d="M52 206 q24 -10 50 4 v14 h-50z" fill="#8fd0ff"/>';
    // つくえ
    case 'd_basic': return '<rect x="366" y="188" width="104" height="10" rx="3" fill="#c98f5b"/><rect x="372" y="198" width="8" height="38" fill="#a8703c"/><rect x="456" y="198" width="8" height="38" fill="#a8703c"/><rect x="384" y="170" width="24" height="18" rx="2" fill="#ff8fb8"/><rect x="388" y="164" width="24" height="6" rx="2" fill="#8fd0ff"/><path d="M438 188 L444 160 L462 160 L468 188Z" fill="#ffe27a"/><rect x="450" y="160" width="6" height="6" fill="#c98f5b"/>';
    case 'd_pink': return '<ellipse cx="418" cy="148" rx="26" ry="32" fill="#e9f7ff" stroke="#fff" stroke-width="5"/><rect x="368" y="184" width="100" height="12" rx="4" fill="#ffc2dc"/><rect x="374" y="196" width="8" height="40" fill="#f09ab8"/><rect x="454" y="196" width="8" height="40" fill="#f09ab8"/><rect x="384" y="170" width="12" height="14" rx="3" fill="#c9b6ff"/><rect x="440" y="172" width="16" height="12" rx="3" fill="#ffe27a"/><circle cx="418" cy="222" r="14" fill="#c9b6ff"/>';
    case 'd_piano': { let k = ''; for (let i = 0; i < 9; i++) k += `<rect x="${372 + i * 10.5}" y="200" width="9.5" height="22" fill="#fff"/>`; for (let i = 0; i < 8; i++) if (i !== 2 && i !== 6) k += `<rect x="${380 + i * 10.5}" y="200" width="6" height="14" fill="#2a2230"/>`; return '<rect x="364" y="150" width="108" height="14" rx="4" fill="#4a4056"/><rect x="368" y="160" width="100" height="62" rx="6" fill="#3a3040"/>' + k + '<rect x="372" y="222" width="8" height="14" fill="#2a2230"/><rect x="452" y="222" width="8" height="14" fill="#2a2230"/><rect x="388" y="234" width="60" height="4" rx="2" fill="#000" opacity=".12"/>'; }
    // たな
    case 's_books': return '<rect x="16" y="64" width="102" height="8" rx="3" fill="#c98f5b"/><rect x="16" y="104" width="102" height="8" rx="3" fill="#c98f5b"/>' + [['#ff8fb8', 22], ['#8fd0ff', 34], ['#ffe27a', 46], ['#8fe3c8', 58], ['#c9b6ff', 70]].map((b, i) => `<rect x="${b[1]}" y="${40 - (i % 2) * 6}" width="10" height="${24 + (i % 2) * 6}" rx="2" fill="${b[0]}"/>`).join('') + '<rect x="86" y="46" width="26" height="18" rx="3" fill="#ffb27a"/><rect x="24" y="82" width="20" height="22" rx="3" fill="#8fe3c8"/><rect x="48" y="86" width="14" height="18" rx="3" fill="#ff9fc4"/><circle cx="92" cy="94" r="10" fill="#ffe27a"/>';
    case 's_toys': return '<rect x="16" y="64" width="102" height="8" rx="3" fill="#c98f5b"/><rect x="16" y="104" width="102" height="8" rx="3" fill="#c98f5b"/><rect x="26" y="40" width="22" height="22" rx="6" fill="#d9a066"/><rect x="24" y="34" width="8" height="8" rx="3" fill="#d9a066"/><rect x="42" y="34" width="8" height="8" rx="3" fill="#d9a066"/><circle cx="33" cy="48" r="2" fill="#4a3340"/><circle cx="41" cy="48" r="2" fill="#4a3340"/><rect x="64" y="48" width="14" height="14" fill="#ff8fb8"/><rect x="80" y="48" width="14" height="14" fill="#8fd0ff"/><rect x="72" y="34" width="14" height="14" fill="#ffe27a"/><rect x="26" y="84" width="30" height="20" rx="4" fill="#8fe3c8"/><circle cx="34" cy="106" r="5" fill="#4a3340"/><circle cx="50" cy="106" r="5" fill="#4a3340"/><polygon points="88,104 98,82 108,104" fill="#c9b6ff"/>';
    case 's_trophy': return '<rect x="16" y="64" width="102" height="8" rx="3" fill="#c98f5b"/><rect x="16" y="104" width="102" height="8" rx="3" fill="#c98f5b"/>' + [[34, 64], [74, 64], [54, 104]].map(p => `<path d="M${p[0] - 12} ${p[1] - 30} h24 v10 q0 14 -12 16 q-12 -2 -12 -16z" fill="#ffd84a" stroke="#e59a00" stroke-width="2"/><rect x="${p[0] - 3}" y="${p[1] - 8}" width="6" height="8" fill="#e59a00"/><rect x="${p[0] - 9}" y="${p[1] - 2}" width="18" height="4" fill="#e59a00"/>`).join('') + mrStar(94, 92, 10, 4.5, '#ff8fb8');
    // まど
    case 'm_plain': return '<rect x="132" y="28" width="60" height="78" rx="6" fill="#cdeaff" stroke="#fff" stroke-width="6"/><path d="M162 28 V106 M132 67 H192" stroke="#fff" stroke-width="4"/><ellipse cx="150" cy="48" rx="12" ry="6" fill="#fff"/><ellipse cx="178" cy="88" rx="10" ry="5" fill="#fff"/>';
    case 'm_window': return '<path d="M118 24 H146 V112 Q132 100 118 112Z" fill="#ff9fc4"/><path d="M206 24 H178 V112 Q192 100 206 112Z" fill="#ff9fc4"/><rect x="132" y="28" width="60" height="78" rx="6" fill="#cdeaff" stroke="#fff" stroke-width="6"/><path d="M162 28 V106 M132 67 H192" stroke="#fff" stroke-width="4"/><circle cx="178" cy="46" r="9" fill="#ffe27a"/><ellipse cx="148" cy="84" rx="12" ry="6" fill="#fff"/>';
    case 'm_star': return '<rect x="132" y="28" width="60" height="78" rx="30" fill="#3d3470" stroke="#fff" stroke-width="6"/><path d="M162 28 V106" stroke="#fff" stroke-width="3"/>' + mrStar(150, 56, 6, 2.5, '#ffe27a') + mrStar(176, 74, 5, 2, '#ffe27a') + mrStar(152, 88, 4, 1.8, '#fff') + '<circle cx="176" cy="48" r="9" fill="#fff7d0"/><circle cx="181" cy="45" r="8" fill="#3d3470"/>';
    // ポスター
    case 'p_rainbow': return '<rect x="372" y="28" width="90" height="78" rx="8" fill="#fff" stroke="#ffd6e4" stroke-width="5"/>' + ['#ff6b7a', '#ffa45c', '#ffe27a', '#8fe3c8', '#8fd0ff'].map((c, i) => `<path d="M${382 + i * 5} 90 a${35 - i * 5} ${35 - i * 5} 0 0 1 ${(35 - i * 5) * 2} 0" fill="none" stroke="${c}" stroke-width="5"/>`).join('');
    case 'p_frame': return '<rect x="374" y="30" width="38" height="46" rx="4" fill="#fff" stroke="#c98f5b" stroke-width="4"/><circle cx="393" cy="48" r="7" fill="#ffd0b0"/><rect x="384" y="56" width="18" height="12" rx="4" fill="#ff8fb8"/><rect x="420" y="40" width="40" height="32" rx="4" fill="#fff" stroke="#c98f5b" stroke-width="4"/><polygon points="424,70 436,52 446,64 452,56 458,70" fill="#8fe3c8"/><rect x="396" y="82" width="46" height="26" rx="4" fill="#fff" stroke="#c98f5b" stroke-width="4"/>' + `<path transform="translate(419 96) scale(.9)" d="M0 8 C-10 0 -10 -8 -4 -9 C-2 -9.5 0 -7 0 -5 C0 -7 2 -9.5 4 -9 C10 -8 10 0 0 8Z" fill="#ff5d8f"/>`;
    case 'p_galaxy': return '<rect x="372" y="28" width="90" height="78" rx="8" fill="#2f2a5a" stroke="#c9b6ff" stroke-width="5"/><circle cx="420" cy="68" r="17" fill="#ff9fc4"/><ellipse cx="420" cy="68" rx="30" ry="7" fill="none" stroke="#ffe27a" stroke-width="3" transform="rotate(-20 420 68)"/>' + mrStar(388, 46, 5, 2, '#fff') + mrStar(448, 90, 5, 2, '#fff') + mrStar(444, 44, 4, 1.6, '#ffe27a');
    // ラグ
    case 'r_round': return '<ellipse cx="240" cy="246" rx="98" ry="20" fill="#ffb3cf"/><ellipse cx="240" cy="246" rx="72" ry="13" fill="#fff" opacity=".55"/><ellipse cx="240" cy="246" rx="40" ry="7" fill="#ffb3cf"/>';
    case 'r_heart': return '<path transform="translate(240 248) scale(7.6 2)" d="M0 10 C-12 0 -12 -10 -5 -11 C-2 -11.5 0 -9 0 -7 C0 -9 2 -11.5 5 -11 C12 -10 12 0 0 10Z" fill="#ff8fb8"/><path transform="translate(240 248) scale(4.6 1.2)" d="M0 10 C-12 0 -12 -10 -5 -11 C-2 -11.5 0 -9 0 -7 C0 -9 2 -11.5 5 -11 C12 -10 12 0 0 10Z" fill="#ffd0e2"/>';
    case 'r_rainbow': return ['#ff6b7a', '#ffa45c', '#ffe27a', '#8fe3c8', '#8fd0ff', '#c9b6ff'].map((c, i) => `<ellipse cx="240" cy="246" rx="${100 - i * 14}" ry="${20 - i * 2.6}" fill="${c}"/>`).join('');
    // てんじょう
    case 'c_garland': { let s = '<path d="M0 8 Q120 44 240 14 T480 8" fill="none" stroke="#e8b4c8" stroke-width="3"/>'; const cols = ['#ff8fb8', '#ffe27a', '#8fe3c8', '#8fd0ff', '#c9b6ff']; for (let i = 0; i < 11; i++) { const x = 20 + i * 44, y = 8 + Math.sin(i / 10 * Math.PI * 2 + .6) * 4 + (i % 5 === 2 ? 14 : 18); s += `<polygon points="${x - 11},${y - 6} ${x + 11},${y - 6} ${x},${y + 20}" fill="${cols[i % 5]}"/>`; } return s; }
    case 'c_lamp': return '<rect x="149" y="0" width="3" height="26" fill="#8d6f7a"/><path d="M128 52 L140 24 H162 L174 52Z" fill="#ffe27a" stroke="#f0c040" stroke-width="2" stroke-linejoin="round"/><ellipse cx="151" cy="54" rx="22" ry="4" fill="#fff7c0" opacity=".8"/>';
    case 'c_stars': return [[140, 46, 11], [188, 26, 8], [405, 16, 8]].map(p => `<rect x="${p[0] - 1}" y="0" width="2" height="${p[1] - p[2]}" fill="#c9b6ff"/>` + mrStar(p[0], p[1], p[2], p[2] / 2.2, '#ffe27a')).join('');
    // すみっこ
    case 'x_plant': return '<g transform="translate(-8 0)"><rect x="322" y="208" width="34" height="28" rx="6" fill="#ff9f7a"/><rect x="328" y="204" width="22" height="8" fill="#ff8a5c"/><ellipse cx="330" cy="188" rx="9" ry="20" fill="#5cc27a" transform="rotate(-24 330 188)"/><ellipse cx="348" cy="184" rx="9" ry="22" fill="#4aae68" transform="rotate(22 348 184)"/><ellipse cx="339" cy="178" rx="8" ry="22" fill="#6fd08c"/></g>';
    case 'x_toybox': return '<rect x="316" y="206" width="46" height="30" rx="5" fill="#8fd0ff"/><rect x="316" y="206" width="46" height="8" rx="3" fill="#6fb6ec"/><rect x="324" y="188" width="14" height="14" fill="#ff8fb8"/><rect x="340" y="192" width="12" height="12" fill="#ffe27a"/><circle cx="348" cy="184" r="8" fill="#ff6b7a"/><circle cx="339" cy="222" r="5" fill="#fff"/>';
    case 'x_aquarium': return '<g transform="translate(-8 0)"><rect x="314" y="218" width="50" height="20" rx="3" fill="#c98f5b"/><rect x="314" y="170" width="50" height="50" rx="5" fill="#bfeaff" stroke="#fff" stroke-width="3"/><rect x="316" y="196" width="46" height="22" fill="#8fd0ff" opacity=".7"/><ellipse cx="334" cy="188" rx="7" ry="4.5" fill="#ff9f43"/><polygon points="341,188 348,183 348,193" fill="#ff9f43"/><ellipse cx="350" cy="206" rx="5" ry="3" fill="#ff8fb8"/><circle cx="326" cy="178" r="2" fill="#fff"/><circle cx="330" cy="172" r="1.5" fill="#fff"/><path d="M320 218 q2 -12 6 0 M352 218 q-2 -10 -5 0" stroke="#5cc27a" stroke-width="3" fill="none"/></g>';
    default: return '';
  }
}

function myRoomSVG(av, my, face) {
  const p = (my && my.placed) || {};
  let s = '<svg class="scene myroom" viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';
  s += mrDraw(p.wall || 'w_cream') + mrDraw(p.floor || 'f_wood') + '<rect y="190" width="480" height="8" fill="#fff" opacity=".55"/>';
  ['rug', 'ceiling', 'shelf', 'window', 'poster', 'bed', 'desk', 'corner'].forEach(k => { if (p[k]) s += mrDraw(p[k]); });
  s += '<ellipse cx="240" cy="246" rx="44" ry="7" fill="#000" opacity=".1"/>';
  s += `<g transform="translate(170 50) scale(.875)">${avatarInner(av, face)}</g>`;
  const pet = getDef(av.pet);
  if (pet) s += `<g transform="translate(122 190)">${petSVG(pet.kind)}</g>`;
  return s + '</svg>';
}
function mrThumb(it) {
  const b = MR_BOX[it.slot];
  return `<svg class="thumb" viewBox="${b.join(' ')}" aria-hidden="true"><rect x="${b[0]}" y="${b[1]}" width="${b[2]}" height="${b[3]}" fill="#fff4f8"/>${mrDraw(it.id)}</svg>`;
}
