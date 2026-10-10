/* ブロック風アバター・ペット・おへやのSVG（すべてオリジナル） */
'use strict';
(window.FILE_BUILD = window.FILE_BUILD || {})['avatar'] = '2026-10-12.66'; // ファイルの新旧チェック用

const SKIN = '#FFDFC9';
const INK = '#4a3340';

function getDef(v) {
  if (!v) return null;
  if (typeof v === 'object') return v;
  const it = ITEM_BY_ID[v];
  return it ? it.def : null;
}

function starPts(cx, cy, R, r) {
  let p = [];
  for (let i = 0; i < 10; i++) {
    const ang = -Math.PI / 2 + (i * Math.PI) / 5;
    const rad = i % 2 ? r : R;
    p.push((cx + Math.cos(ang) * rad).toFixed(1) + ',' + (cy + Math.sin(ang) * rad).toFixed(1));
  }
  return p.join(' ');
}
const HEART = (x, y, s, fill) =>
  `<path transform="translate(${x} ${y}) scale(${s})" d="M0 10 C-12 0 -12 -10 -5 -11 C-2 -11.5 0 -9 0 -7 C0 -9 2 -11.5 5 -11 C12 -10 12 0 0 10Z" fill="${fill}"/>`;

/* ---------- かみ ---------- */
function hairParts(style, c) {
  const hl = '<rect x="48" y="14" width="28" height="6" rx="3" fill="#fff" opacity=".28"/>';
  const cap = `<path d="M38 10 h84 v30 l-14 -10 l-14 10 l-14 -10 l-14 10 l-14 -10 l-12 10 z" fill="${c}" stroke="${c}" stroke-width="4" stroke-linejoin="round"/>` + hl;
  const side = `<rect x="36" y="26" width="10" height="34" rx="5" fill="${c}"/><rect x="114" y="26" width="10" height="34" rx="5" fill="${c}"/>`;
  const tie = (x, y) => `<rect x="${x}" y="${y}" width="16" height="12" rx="4" fill="#ff5d8f"/>`;
  switch (style) {
    case 'short': return { back: '', front: cap + side };
    case 'pony':
      return {
        back: `<rect x="110" y="18" width="28" height="78" rx="13" fill="${c}"/>`,
        front: cap + side + tie(112, 22),
      };
    case 'twin':
      return {
        back: `<rect x="14" y="30" width="28" height="78" rx="13" fill="${c}"/><rect x="118" y="30" width="28" height="78" rx="13" fill="${c}"/>`,
        front: cap + tie(26 - 2, 26) + tie(118, 26),
      };
    case 'long':
      return {
        back: `<rect x="30" y="12" width="100" height="122" rx="18" fill="${c}"/>`,
        front: cap + `<rect x="36" y="26" width="12" height="74" rx="6" fill="${c}"/><rect x="112" y="26" width="12" height="74" rx="6" fill="${c}"/>`,
      };
    case 'bun':
      return {
        back: `<circle cx="50" cy="8" r="15" fill="${c}"/><circle cx="110" cy="8" r="15" fill="${c}"/><rect x="36" y="16" width="88" height="44" rx="14" fill="${c}"/>`,
        front: cap + tie(42, 0).replace('#ff5d8f', '#ffffff') + '<rect x="102" y="0" width="16" height="12" rx="4" fill="#fff"/>',
      };
    case 'braid': {
      let br = '';
      [26, 118].forEach(x => {
        br += `<rect x="${x}" y="36" width="18" height="24" rx="8" fill="${c}"/><rect x="${x + 2}" y="58" width="15" height="24" rx="7" fill="${c}"/><rect x="${x + 3}" y="80" width="13" height="22" rx="6" fill="${c}"/><rect x="${x + 1}" y="98" width="17" height="9" rx="4" fill="#ff5d8f"/>`;
      });
      return { back: br, front: cap + side };
    }
    case 'wave':
      return {
        back: `<rect x="26" y="8" width="108" height="104" rx="40" fill="${c}"/>`,
        front: cap + [50, 66, 82, 98, 112].map((x, i) => `<circle cx="${x}" cy="${36 + (i % 2) * 2}" r="9" fill="${c}"/>`).join(''),
      };
    case 'bob':
    default:
      return {
        back: `<rect x="32" y="16" width="96" height="72" rx="18" fill="${c}"/>`,
        front: cap,
      };
  }
}

/* ---------- かお ---------- */
function faceSVG(face) {
  const eyeN = x => `<rect x="${x}" y="47" width="13" height="18" rx="5" fill="${INK}"/><circle cx="${x + 4.5}" cy="52.5" r="3.4" fill="#fff"/><circle cx="${x + 9}" cy="60" r="1.7" fill="#fff"/>`;
  const eyeH = x => `<path d="M${x} 62 Q${x + 6.5} 46 ${x + 13} 62" fill="none" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>`;
  const cheeks = `<ellipse cx="53" cy="72" rx="7" ry="5" fill="#ff8fa8" opacity=".55"/><ellipse cx="107" cy="72" rx="7" ry="5" fill="#ff8fa8" opacity=".55"/>`;
  let eyes, mouth;
  if (face === 'happy' || face === 'cheer') {
    eyes = eyeH(57) + eyeH(90);
    mouth = face === 'cheer'
      ? `<path d="M68 72 Q80 94 92 72 Z" fill="#c0506b" stroke="#c0506b" stroke-width="2" stroke-linejoin="round"/><path d="M73 83 Q80 89 87 83 Q80 79 73 83Z" fill="#ff9bb0"/>`
      : `<path d="M70 72 Q80 88 90 72 Z" fill="#c0506b" stroke="#c0506b" stroke-width="2" stroke-linejoin="round"/>`;
  } else if (face === 'sad') {
    eyes = eyeN(57) + eyeN(90) +
      `<path d="M55 43 L70 39 M105 43 L90 39" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M101 66 q3 6 0 9 q-3 -3 0 -9z" fill="#8fd0ff"/>`;
    mouth = `<path d="M72 80 Q80 72 88 80" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`;
  } else {
    eyes = eyeN(57) + eyeN(90);
    mouth = `<path d="M72 74 Q80 81 88 74" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`;
  }
  return cheeks + eyes + mouth;
}

/* ---------- ふく ---------- */
function decoSVG(kind, o) {
  const acc = o.acc || '#ffffff';
  switch (kind) {
    case 'heart': return HEART(80, 122, 1.2, '#fff');
    case 'star': return `<polygon points="${starPts(80, 122, 15, 7)}" fill="${acc}"/>`;
    case 'stripes': return [104, 118, 132].map(y => `<rect x="54" y="${y}" width="52" height="6" fill="${acc}" opacity=".85"/>`).join('');
    case 'dots': return [[66, 104], [94, 106], [80, 120], [64, 134], [96, 136]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="4.5" fill="${acc}" opacity=".9"/>`).join('');
    case 'overall':
      return `<rect x="64" y="114" width="32" height="36" rx="4" fill="${o.bottom}"/><rect x="64" y="94" width="6" height="22" fill="${o.bottom}"/><rect x="90" y="94" width="6" height="22" fill="${o.bottom}"/><circle cx="67" cy="119" r="3" fill="#ffe27a"/><circle cx="93" cy="119" r="3" fill="#ffe27a"/>`;
    case 'ribbon':
      return `<path d="M80 101 L65 92 L65 110 Z M80 101 L95 92 L95 110 Z" fill="${acc}"/><circle cx="80" cy="101" r="4.5" fill="${acc}"/><rect x="54" y="136" width="52" height="8" fill="${acc}"/>`;
    case 'sailor':
      return `<path d="M54 92 L80 124 L106 92 L106 102 L80 134 L54 102 Z" fill="${o.bottom}"/><path d="M80 122 L70 132 L90 132 Z" fill="#ff5d7f"/><circle cx="80" cy="122" r="4" fill="#ff5d7f"/>`;
    case 'strawberry':
      return [[66, 104], [94, 108], [78, 122], [64, 136], [96, 136]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="6" fill="${acc}"/><path d="M${p[0] - 4} ${p[1] - 5} l4 -3 l4 3z" fill="#5cc27a"/>`).join('');
    case 'rainbow':
      return ['#ff6b7a', '#ffa45c', '#ffe27a', '#8fe3c8', '#8fd0ff', '#c9b6ff'].map((c, i) => `<rect x="54" y="${92 + i * 9.7}" width="52" height="10" fill="${c}"/>`).join('');
    case 'crownline':
      return `<rect x="54" y="134" width="52" height="9" fill="${acc}"/><circle cx="80" cy="138.5" r="5" fill="#ff5d8f"/><polygon points="${starPts(66, 112, 6, 3)}" fill="${acc}"/><polygon points="${starPts(94, 116, 6, 3)}" fill="${acc}"/>`;
    case 'flower':
      return [[68, 108], [92, 120], [70, 134]].map(p => {
        let s = '';
        for (let i = 0; i < 5; i++) { const a = (i * 72 * Math.PI) / 180; s += `<circle cx="${(p[0] + Math.cos(a) * 5).toFixed(1)}" cy="${(p[1] + Math.sin(a) * 5).toFixed(1)}" r="3.6" fill="#fff"/>`; }
        return s + `<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="${acc}"/>`;
      }).join('');
    case 'galaxy':
      return `<polygon points="${starPts(68, 108, 6, 3)}" fill="${acc}"/><polygon points="${starPts(92, 126, 8, 4)}" fill="${acc}"/><circle cx="72" cy="136" r="2" fill="#fff"/><circle cx="96" cy="104" r="2" fill="#fff"/><circle cx="62" cy="124" r="1.6" fill="#fff"/>`;
    default: return '';
  }
}

function armSVG(side, o, cheer, acc) {
  const left = side === 'L';
  const x = left ? 34 : 108;
  const px = left ? 43 : 117;
  const tr = cheer ? `transform="rotate(${left ? 150 : -150} ${px} 98)"` : '';
  const sleeve = o.sleeve ? `<rect x="${x}" y="94" width="18" height="${o.sleeve}" rx="8" fill="${o.top}"/>` : '';
  let extra = '';
  if (!left && acc && acc.kind === 'wand') {
    extra = `<rect x="115" y="100" width="4" height="52" rx="2" fill="#e8b4c8" transform="rotate(20 117 146)"/><polygon points="${starPts(130, 92, 13, 6)}" fill="#ffd84a" stroke="#f0a800" stroke-width="1.5" stroke-linejoin="round"/>`;
  }
  return `<g ${tr}><rect x="${x}" y="94" width="18" height="52" rx="9" fill="${SKIN}"/>${sleeve}${extra}</g>`;
}

function shoeSVG(s) {
  s = s || { color: '#ff8fb8' };
  const c = s.color;
  let out = '';
  [[51, 30], [79, 30]].forEach(([x, w]) => {
    if (s.tall) out += `<rect x="${x + 2}" y="186" width="${w - 6}" height="34" rx="8" fill="${c}"/>`;
    out += `<rect x="${x}" y="204" width="${w}" height="18" rx="8" fill="${c}"/><rect x="${x}" y="216" width="${w}" height="6" rx="3" fill="#000" opacity=".12"/>`;
    if (s.stripe) out += `<rect x="${x + 4}" y="208" width="${w - 8}" height="4" rx="2" fill="${s.stripe}"/>`;
    if (s.spark) out += `<polygon points="${starPts(x + 15, 196, 5, 2)}" fill="#fff"/>`;
  });
  return out;
}

/* ---------- ぼうし ---------- */
function hatSVG(h) {
  if (!h) return '';
  const c = h.c1;
  switch (h.kind) {
    case 'ribbon':
      return `<path d="M104 14 L128 0 L128 28 Z M104 14 L82 0 L82 28 Z" fill="${c}" transform="translate(2 -4)"/><circle cx="106" cy="10" r="7" fill="#ff3f86"/>`;
    case 'cat':
      return `<path d="M44 16 L48 -8 L68 12 Z" fill="${c}" stroke="${c}" stroke-width="3" stroke-linejoin="round"/><path d="M116 16 L112 -8 L92 12 Z" fill="${c}" stroke="${c}" stroke-width="3" stroke-linejoin="round"/><path d="M50 10 L52 -1 L61 10Z M110 10 L108 -1 L99 10Z" fill="#ffb6c9"/>`;
    case 'cap':
      return `<path d="M36 26 Q36 -4 80 -4 Q124 -4 124 26 Z" fill="${c}"/><rect x="70" y="20" width="62" height="9" rx="4.5" fill="#4a9de0"/><circle cx="80" cy="-5" r="4" fill="#fff"/>`;
    case 'beret':
      return `<ellipse cx="78" cy="8" rx="48" ry="15" fill="${c}"/><rect x="76" y="-12" width="7" height="10" rx="3" fill="#e0709c"/>`;
    case 'flower': {
      let s = '<rect x="38" y="10" width="84" height="8" rx="4" fill="#5cc27a"/>';
      [46, 63, 80, 97, 114].forEach((x, i) => {
        const col = ['#ff8fb8', '#ffe27a', '#fff', '#ff8fb8', '#ffe27a'][i];
        s += `<circle cx="${x}" cy="12" r="8" fill="${col}"/><circle cx="${x}" cy="12" r="3" fill="${i % 2 ? '#ff8fb8' : '#ffb347'}"/>`;
      });
      return s;
    }
    case 'crown': {
      const k = h.big ? 1.12 : 1;
      return `<g transform="translate(80 18) scale(${k}) translate(-80 -18)"><path d="M46 14 L46 -10 L62 2 L80 -16 L98 2 L114 -10 L114 14 Z" fill="${c}" stroke="#e59a00" stroke-width="3" stroke-linejoin="round"/><circle cx="80" cy="4" r="5" fill="${h.big ? '#ff3f5f' : '#ff5d8f'}"/><circle cx="58" cy="6" r="3.5" fill="#8fd0ff"/><circle cx="102" cy="6" r="3.5" fill="#8fe3c8"/></g>${h.big ? `<polygon points="${starPts(38, -14, 6, 2.5)}" fill="#fff"/><polygon points="${starPts(124, -8, 5, 2)}" fill="#fff"/>` : ''}`;
    }
    case 'tiara':
      return `<path d="M44 16 Q80 -14 116 16" fill="none" stroke="#d8d8ff" stroke-width="6" stroke-linecap="round"/><polygon points="${starPts(80, -2, 11, 5)}" fill="#ffd0e6" stroke="#ff8fb8" stroke-width="2" stroke-linejoin="round"/><circle cx="56" cy="8" r="4" fill="#8fd0ff"/><circle cx="104" cy="8" r="4" fill="#c9b6ff"/>`;
    case 'witch':
      return `<rect x="26" y="10" width="108" height="11" rx="5.5" fill="${c}"/><path d="M50 12 L78 -28 L108 12 Z" fill="${c}" stroke="${c}" stroke-width="3" stroke-linejoin="round"/><rect x="52" y="2" width="54" height="8" fill="#ffd84a"/><polygon points="${starPts(84, -8, 6, 3)}" fill="#ffd84a"/>`;
    default: return '';
  }
}

/* ---------- アクセサリー ---------- */
function accBackSVG(a) {
  if (!a) return '';
  if (a.kind === 'wings') {
    const c = a.c1;
    const w = (mx, rot) => `<g transform="${mx}"><ellipse cx="20" cy="96" rx="22" ry="44" fill="${c}" stroke="#bfe4ff" stroke-width="3" transform="rotate(${rot} 20 96)"/><ellipse cx="22" cy="126" rx="14" ry="26" fill="${c}" stroke="#bfe4ff" stroke-width="3" transform="rotate(${rot * 1.6} 22 126)"/></g>`;
    return w('', 18) + w('translate(160 0) scale(-1 1)', 18);
  }
  if (a.kind === 'cape') return `<path d="M46 92 L114 92 L132 196 L28 196 Z" fill="${a.c1}" stroke="${a.c1}" stroke-width="3" stroke-linejoin="round"/><path d="M46 92 L114 92 L132 196 L28 196 Z" fill="#000" opacity=".06"/>`;
  return '';
}
function accFrontSVG(a) {
  if (!a) return '';
  switch (a.kind) {
    case 'necklace': return `<path d="M64 94 Q80 118 96 94" fill="none" stroke="#ffd84a" stroke-width="3.5" stroke-linecap="round"/>${HEART(80, 112, .8, '#ff5d8f')}`;
    case 'scarf': return `<rect x="52" y="88" width="56" height="14" rx="7" fill="${a.c1}"/><rect x="90" y="96" width="14" height="32" rx="6" fill="${a.c1}"/><rect x="90" y="108" width="14" height="5" fill="#fff" opacity=".5"/>`;
    case 'glasses': return `<circle cx="63.5" cy="57" r="14" fill="#cfeaff" fill-opacity=".35" stroke="${a.c1}" stroke-width="3.5"/><circle cx="96.5" cy="57" r="14" fill="#cfeaff" fill-opacity=".35" stroke="${a.c1}" stroke-width="3.5"/><path d="M77 55 L83 55" stroke="${a.c1}" stroke-width="3.5"/>`;
    default: return '';
  }
}

/* ---------- アバター本体 ---------- */
function avatarInner(cfg, face) {
  face = face || cfg.face || 'normal';
  const hairD = getDef(cfg.hair) || getDef('h_bob');
  const colD = getDef(cfg.hairColor) || { color: '#6b4433' };
  const o = getDef(cfg.outfit) || getDef('o_pink');
  const sh = getDef(cfg.shoes);
  const hat = getDef(cfg.hat);
  const acc = getDef(cfg.accessory);
  const hair = hairParts(hairD.style, colD.color);
  const cheer = face === 'cheer';
  let s = '';
  s += hair.back + accBackSVG(acc);
  // あし
  s += `<rect x="56" y="148" width="22" height="60" rx="8" fill="${SKIN}"/><rect x="82" y="148" width="22" height="60" rx="8" fill="${SKIN}"/>`;
  if (o.type === 'pants') s += `<rect x="55" y="148" width="24" height="48" rx="8" fill="${o.bottom}"/><rect x="81" y="148" width="24" height="48" rx="8" fill="${o.bottom}"/>`;
  s += shoeSVG(sh);
  if (o.type === 'skirt') s += `<path d="M50 138 h60 l8 38 h-76 z" fill="${o.bottom}" stroke="${o.bottom}" stroke-width="3" stroke-linejoin="round"/><rect x="42" y="170" width="76" height="6" fill="#000" opacity=".08"/>`;
  if (o.type === 'dress') s += `<path d="M52 138 h56 l10 40 h-76 z" fill="${o.top}" stroke="${o.top}" stroke-width="3" stroke-linejoin="round"/><rect x="42" y="170" width="76" height="8" rx="3" fill="${o.acc || '#fff'}" opacity=".6"/>`;
  // どうたい
  s += `<rect x="54" y="92" width="52" height="58" rx="10" fill="${o.top}"/>` + decoSVG(o.deco, o);
  if (o.type === 'dress' && o.deco !== 'crownline') s += `<rect x="54" y="138" width="52" height="3" fill="#000" opacity=".06"/>`;
  s += armSVG('L', o, cheer, acc) + armSVG('R', o, cheer, acc);
  s += accFrontSVG(acc && acc.kind !== 'glasses' ? acc : null);
  // あたま
  s += `<rect x="40" y="12" width="80" height="76" rx="16" fill="${SKIN}"/>`;
  s += faceSVG(face);
  s += accFrontSVG(acc && acc.kind === 'glasses' ? acc : null);
  s += hair.front + hatSVG(hat);
  return s;
}
function avatarSVG(cfg, opt) {
  opt = opt || {};
  const vb = opt.view || '0 -30 160 262';
  return `<svg class="avatar ${opt.cls || ''}" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${avatarInner(cfg, opt.face)}</svg>`;
}

/* ---------- ペット ---------- */
function petSVG(kind) {
  const eye = (x, y) => `<circle cx="${x}" cy="${y}" r="3" fill="${INK}"/>`;
  const legs = c => `<rect x="14" y="50" width="10" height="13" rx="4" fill="${c}"/><rect x="36" y="50" width="10" height="13" rx="4" fill="${c}"/>`;
  switch (kind) {
    case 'cat':
      return `<rect x="42" y="26" width="10" height="30" rx="5" fill="#f2a45e" transform="rotate(18 47 56)"/>${legs('#f2a45e')}<rect x="10" y="34" width="38" height="22" rx="8" fill="#ffb870"/><rect x="8" y="10" width="40" height="30" rx="9" fill="#ffb870"/><path d="M8 14 L12 -2 L26 10Z M48 14 L44 -2 L30 10Z" fill="#ffb870"/><path d="M13 9 L14 2 L21 9Z M43 9 L42 2 L35 9Z" fill="#ffb6c9"/>${eye(20, 26)}${eye(36, 26)}<path d="M26 32 L30 32 L28 35Z" fill="#ff7a9c"/><path d="M8 30 h-6 M8 34 h-6 M48 30 h6 M48 34 h6" stroke="#b07840" stroke-width="1.5"/><rect x="14" y="12" width="6" height="8" rx="2" fill="#e08a3c"/><rect x="30" y="12" width="6" height="8" rx="2" fill="#e08a3c"/>`;
    case 'dog':
      return `<rect x="44" y="34" width="9" height="18" rx="4.5" fill="#c98a4f" transform="rotate(-25 48 48)"/>${legs('#d9a066')}<rect x="10" y="34" width="38" height="22" rx="8" fill="#d9a066"/><rect x="9" y="10" width="40" height="30" rx="9" fill="#d9a066"/><rect x="2" y="12" width="12" height="24" rx="6" fill="#a9703c"/><rect x="44" y="12" width="12" height="24" rx="6" fill="#a9703c"/>${eye(21, 24)}${eye(37, 24)}<rect x="20" y="28" width="18" height="10" rx="5" fill="#fff3e6"/><rect x="26" y="28" width="6" height="4" rx="2" fill="${INK}"/><path d="M27 37 q2 5 4 0z" fill="#ff7a9c"/>`;
    case 'bunny':
      return `<circle cx="50" cy="48" r="6" fill="#fff"/>${legs('#fff')}<rect x="10" y="34" width="38" height="22" rx="8" fill="#fff" stroke="#f0dde6" stroke-width="2"/><rect x="18" y="-16" width="9" height="32" rx="4.5" fill="#fff" stroke="#f0dde6" stroke-width="2"/><rect x="33" y="-16" width="9" height="32" rx="4.5" fill="#fff" stroke="#f0dde6" stroke-width="2"/><rect x="20" y="-10" width="5" height="20" rx="2.5" fill="#ffc2d6"/><rect x="35" y="-10" width="5" height="20" rx="2.5" fill="#ffc2d6"/><rect x="9" y="10" width="42" height="30" rx="10" fill="#fff" stroke="#f0dde6" stroke-width="2"/>${eye(21, 26)}${eye(39, 26)}<path d="M27 31 L33 31 L30 35Z" fill="#ff7a9c"/><circle cx="15" cy="33" r="4" fill="#ff9bb5" opacity=".5"/><circle cx="45" cy="33" r="4" fill="#ff9bb5" opacity=".5"/>`;
    case 'penguin':
      return `<rect x="14" y="56" width="12" height="7" rx="3" fill="#ffab40"/><rect x="34" y="56" width="12" height="7" rx="3" fill="#ffab40"/><rect x="10" y="14" width="40" height="44" rx="14" fill="#4a4a6a"/><rect x="17" y="30" width="26" height="26" rx="10" fill="#fff"/><rect x="4" y="30" width="9" height="20" rx="4" fill="#4a4a6a"/><rect x="47" y="30" width="9" height="20" rx="4" fill="#4a4a6a"/>${eye(23, 26)}${eye(37, 26)}<path d="M25 30 L35 30 L30 37Z" fill="#ffab40"/><circle cx="17" cy="32" r="3" fill="#ff9bb5" opacity=".6"/><circle cx="43" cy="32" r="3" fill="#ff9bb5" opacity=".6"/>`;
    case 'unicorn':
      return `<path d="M50 38 q14 4 8 22 q-10 -6 -8 -22z" fill="#c9b6ff"/><path d="M50 40 q10 4 6 16" fill="none" stroke="#ff8fb8" stroke-width="3"/>${legs('#fff')}<rect x="10" y="34" width="38" height="22" rx="8" fill="#fff" stroke="#eee7ff" stroke-width="2"/><rect x="8" y="10" width="40" height="30" rx="9" fill="#fff" stroke="#eee7ff" stroke-width="2"/><rect x="10" y="6" width="8" height="26" rx="4" fill="#ff8fb8"/><rect x="18" y="8" width="7" height="22" rx="3.5" fill="#ffe27a"/><rect x="25" y="10" width="6" height="14" rx="3" fill="#8fd0ff" transform="translate(0 -1)"/><path d="M34 12 L38 -10 L42 12Z" fill="#ffd84a" stroke="#f0a800" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 12 L10 2 L20 10Z" fill="#fff" stroke="#eee7ff" stroke-width="1.5"/>${eye(34, 26)}<circle cx="42" cy="32" r="3.5" fill="#ff9bb5" opacity=".6"/>`;
    case 'chick':
      return `<rect x="18" y="52" width="6" height="11" rx="3" fill="#ffab40"/><rect x="34" y="52" width="6" height="11" rx="3" fill="#ffab40"/><rect x="8" y="14" width="44" height="42" rx="18" fill="#ffe27a"/><rect x="2" y="30" width="10" height="16" rx="5" fill="#ffd040"/><rect x="48" y="30" width="10" height="16" rx="5" fill="#ffd040"/>${eye(21, 30)}${eye(39, 30)}<path d="M25 36 L35 36 L30 42Z" fill="#ffab40"/><circle cx="15" cy="38" r="3.5" fill="#ff9bb5" opacity=".6"/><circle cx="45" cy="38" r="3.5" fill="#ff9bb5" opacity=".6"/><path d="M26 14 q4 -10 8 0" fill="none" stroke="#ffd040" stroke-width="3" stroke-linecap="round"/>`;
    default: return '';
  }
}

/* ---------- おへや ---------- */
function roomDecor(r) {
  if (!r) return '';
  switch (r.kind) {
    case 'window':
      return `<rect x="16" y="26" width="76" height="86" rx="8" fill="#cdeaff" stroke="#fff" stroke-width="6"/><path d="M54 26 V112 M16 69 H92" stroke="#fff" stroke-width="4"/><ellipse cx="38" cy="50" rx="14" ry="7" fill="#fff" opacity=".9"/><path d="M6 18 H30 V122 Q18 110 6 122Z" fill="#ff9fc4"/><path d="M102 18 H78 V122 Q90 110 102 122Z" fill="#ff9fc4"/>`;
    case 'garland': {
      let s = '<path d="M0 22 Q80 50 160 22 T320 22" fill="none" stroke="#e8b4c8" stroke-width="3"/>';
      const cols = ['#ff8fb8', '#ffe27a', '#8fe3c8', '#8fd0ff', '#c9b6ff'];
      [24, 62, 100, 140, 180, 220, 260, 298].forEach((x, i) => { const y = 24 + (Math.sin((x / 320) * Math.PI * 2) * 8 + 10); s += `<polygon points="${starPts(x, y + 8, 12, 5.5)}" fill="${cols[i % 5]}"/>`; });
      return s;
    }
    case 'plant':
      return `<rect x="20" y="150" width="34" height="34" rx="6" fill="#ff9f7a"/><rect x="24" y="110" width="8" height="42" rx="4" fill="#5cc27a"/><rect x="40" y="120" width="8" height="32" rx="4" fill="#5cc27a"/><circle cx="28" cy="104" r="11" fill="#ff8fb8"/><circle cx="28" cy="104" r="4" fill="#ffe27a"/><circle cx="44" cy="114" r="10" fill="#ffe27a"/><circle cx="44" cy="114" r="4" fill="#ff8fb8"/>`;
    case 'rainbow':
      return `<rect x="232" y="26" width="72" height="62" rx="8" fill="#fff" stroke="#ffd6e4" stroke-width="4"/>` +
        ['#ff6b7a', '#ffa45c', '#ffe27a', '#8fe3c8', '#8fd0ff'].map((c, i) => `<path d="M${240 + i * 4} 76 a${28 - i * 4} ${28 - i * 4} 0 0 1 ${(28 - i * 4) * 2} 0" fill="none" stroke="${c}" stroke-width="4"/>`).join('');
    default: return '';
  }
}
function sceneSVG(av, opt) {
  opt = opt || {};
  const room = getDef(av.room);
  const night = room && room.kind === 'night';
  let s = `<svg class="scene" viewBox="0 0 320 250" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">`;
  s += `<rect width="320" height="250" fill="${night ? '#5b4b8a' : '#ffe3ee'}"/>`;
  if (night) {
    for (let i = 0; i < 18; i++) s += `<polygon points="${starPts((i * 53) % 310 + 6, (i * 37) % 120 + 10, 4 + (i % 3), 2)}" fill="#ffe27a" opacity=".9"/>`;
    s += `<circle cx="270" cy="40" r="18" fill="#fff7d0"/><circle cx="278" cy="36" r="16" fill="#5b4b8a"/>`;
  } else {
    s += `<g opacity=".5">${[[30, 160], [110, 130], [200, 175], [290, 140]].map(p => `<polygon points="${starPts(p[0], p[1], 7, 3)}" fill="#fff"/>`).join('')}</g>`;
  }
  s += `<rect y="196" width="320" height="54" fill="${night ? '#7d6bb0' : '#f7cfb0'}"/><rect y="196" width="320" height="6" fill="#000" opacity=".06"/>`;
  s += roomDecor(room);
  if (!opt.noAvatar) {
    s += `<ellipse cx="160" cy="232" rx="48" ry="8" fill="#000" opacity=".1"/>`;
    s += `<g transform="translate(90 38) scale(.875)" class="sc-av">${avatarInner(av, opt.face)}</g>`;
    const pet = getDef(av.pet);
    if (pet) s += `<g transform="translate(236 174)">${petSVG(pet.kind)}</g>`;
  }
  return s + '</svg>';
}

/* ---------- サムネイル ---------- */
const THUMB_BASE = { hair: 'h_bob', hairColor: 'c_choco', outfit: 'o_pink', shoes: 's_pink', hat: null, accessory: null, pet: null, room: null };
const THUMB_VIEW = {
  hair: '10 -6 140 150', hairColor: '26 -6 108 100', outfit: '20 82 120 132',
  shoes: '36 172 90 60', hat: '20 -34 120 100', accessory: '0 -30 160 262',
};
function thumb(it) {
  const d = Object.assign({}, THUMB_BASE);
  if (it.cat === 'pet') return `<svg class="thumb" viewBox="-4 -20 68 88" aria-hidden="true">${petSVG(it.def.kind)}</svg>`;
  if (it.cat === 'room') return sceneSVG({ room: it.id }, { noAvatar: true }).replace('class="scene"', 'class="thumb scene"');
  d[it.cat] = it.id;
  if (it.cat === 'hair') d.hairColor = { color: '#ff8fb8' };
  return avatarSVG(d, { view: THUMB_VIEW[it.cat], cls: 'thumb', face: 'happy' });
}

/* ---------- ガチャのカプセル ---------- */
function capsuleSVG(c1, c2) {
  return `<svg class="capsule" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="42" fill="${c2}"/><path d="M8 50 A42 42 0 0 1 92 50 Z" fill="${c1}"/><rect x="8" y="47" width="84" height="6" fill="#fff" opacity=".7"/><ellipse cx="34" cy="30" rx="10" ry="6" fill="#fff" opacity=".6" transform="rotate(-30 34 30)"/></svg>`;
}
