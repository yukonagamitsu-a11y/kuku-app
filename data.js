/* データ：九九の読み方・アイテム・文言 */
'use strict';

// 九九の読み方（数式から自動生成せず、手で持つ）kukuReading[段][かける数]
const KUKU_TEXT = {
  1: 'いん いち が いち／いん に が に／いん さん が さん／いん し が し／いん ご が ご／いん ろく が ろく／いん しち が しち／いん はち が はち／いん く が く',
  2: 'に いち が に／に に が し／に さん が ろく／に し が はち／に ご じゅう／に ろく じゅうに／に しち じゅうし／に はち じゅうろく／に く じゅうはち',
  3: 'さん いち が さん／さん に が ろく／さざん が く／さん し じゅうに／さん ご じゅうご／さぶ ろく じゅうはち／さん しち にじゅういち／さん ぱ にじゅうし／さん く にじゅうしち',
  4: 'し いち が し／し に が はち／し さん じゅうに／し し じゅうろく／し ご にじゅう／し ろく にじゅうし／し しち にじゅうはち／し は さんじゅうに／し く さんじゅうろく',
  5: 'ご いち が ご／ご に じゅう／ご さん じゅうご／ご し にじゅう／ご ご にじゅうご／ご ろく さんじゅう／ご しち さんじゅうご／ご は しじゅう／ご く しじゅうご',
  6: 'ろく いち が ろく／ろく に じゅうに／ろく さん じゅうはち／ろく し にじゅうし／ろく ご さんじゅう／ろく ろく さんじゅうろく／ろく しち しじゅうに／ろく は しじゅうはち／ろく く ごじゅうし',
  7: 'しち いち が しち／しち に じゅうし／しち さん にじゅういち／しち し にじゅうはち／しち ご さんじゅうご／しち ろく しじゅうに／しち しち しじゅうく／しち は ごじゅうろく／しち く ろくじゅうさん',
  8: 'はち いち が はち／はち に じゅうろく／はち さん にじゅうし／はち し さんじゅうに／はち ご しじゅう／はっ ろく しじゅうはち／はち しち ごじゅうろく／はち は ろくじゅうし／はち く しちじゅうに',
  9: 'く いち が く／く に じゅうはち／く さん にじゅうしち／く し さんじゅうろく／く ご しじゅうご／く ろく ごじゅうし／く しち ろくじゅうさん／く は しちじゅうに／く く はちじゅういち',
};
const kukuReading = {};
for (const d in KUKU_TEXT) kukuReading[d] = [null, ...KUKU_TEXT[d].split('／')];

// 段ごとのおかし・くだもの（ドット絵の代わり）
const DAN_EMOJI = ['', '🍓', '🍎', '🍊', '🍋', '🍒', '🍇', '🍑', '🍬', '🍪'];

// おかしやさんの商品
const SHOP_GOODS = [
  { name: 'クッキー', e: '🍪' }, { name: 'あめ', e: '🍬' }, { name: 'いちご', e: '🍓' },
  { name: 'ケーキ', e: '🧁' }, { name: 'りんご', e: '🍎' }, { name: 'みかん', e: '🍊' },
  { name: 'さくらんぼ', e: '🍒' }, { name: 'ドーナツ', e: '🍩' },
];

const OK_MSG = ['すごい！', 'やったね！', 'てんさい！', 'かんぺき！', 'いいね！', 'きらきら！', 'さすが！', 'ばっちり！'];
const NG_MSG = ['おしい！ つぎは できるよ', 'ちょっとだけ ちがったね。いっしょに みてみよう', 'だいじょうぶ！ もういちど やってみよう', 'おしい！ もうすこし！'];
const HELLO_MSG = ['きょうも いっしょに がんばろう！', 'ようこそ！ なにして あそぶ？', 'いっしょに くくを おぼえよう！'];

// ---- アイテム ----
// def は avatar.js の描画パラメータ。rar = レア度(★の数)。lim = 段マスターの限定、sp = 100点の特別
const ITEMS = [
  // かみがた
  { id: 'h_bob', cat: 'hair', name: 'おかっぱ', rar: 1, def: { style: 'bob' } },
  { id: 'h_short', cat: 'hair', name: 'ショート', rar: 1, def: { style: 'short' } },
  { id: 'h_pony', cat: 'hair', name: 'ポニーテール', rar: 1, def: { style: 'pony' } },
  { id: 'h_twin', cat: 'hair', name: 'ツインテール', rar: 2, def: { style: 'twin' } },
  { id: 'h_long', cat: 'hair', name: 'ロングヘア', rar: 2, def: { style: 'long' } },
  { id: 'h_bun', cat: 'hair', name: 'おだんご', rar: 2, def: { style: 'bun' } },
  { id: 'h_braid', cat: 'hair', name: 'みつあみ', rar: 3, def: { style: 'braid' } },
  { id: 'h_wave', cat: 'hair', name: 'ふわふわ', rar: 3, def: { style: 'wave' } },
  // かみの色
  { id: 'c_choco', cat: 'hairColor', name: 'チョコ', rar: 1, def: { color: '#6b4433' } },
  { id: 'c_black', cat: 'hairColor', name: 'くろかみ', rar: 1, def: { color: '#3d2c35' } },
  { id: 'c_kinako', cat: 'hairColor', name: 'きなこ', rar: 1, def: { color: '#b98259' } },
  { id: 'c_pink', cat: 'hairColor', name: 'さくら', rar: 2, def: { color: '#ff8fb8' } },
  { id: 'c_lemon', cat: 'hairColor', name: 'レモン', rar: 2, def: { color: '#ffd45e' } },
  { id: 'c_mint', cat: 'hairColor', name: 'ミント', rar: 2, def: { color: '#63d3b2' } },
  { id: 'c_sky', cat: 'hairColor', name: 'そらいろ', rar: 2, def: { color: '#6fbfff' } },
  { id: 'c_lav', cat: 'hairColor', name: 'ラベンダー', rar: 2, def: { color: '#b59cff' } },
  { id: 'lim1', cat: 'hairColor', name: 'にじいろ', rar: 3, lim: 1, def: { color: 'url(#gRainbow)' } },
  // ふく
  { id: 'o_pink', cat: 'outfit', name: 'ハートのスカート', rar: 1, def: { top: '#ff8fb8', bottom: '#c9b6ff', type: 'skirt', sleeve: 22, deco: 'heart' } },
  { id: 'o_sky', cat: 'outfit', name: 'しましまパンツ', rar: 1, def: { top: '#8fd0ff', bottom: '#7da7e8', type: 'pants', sleeve: 22, deco: 'stripes' } },
  { id: 'o_mint', cat: 'outfit', name: 'ミントのワンピ', rar: 1, def: { top: '#8fe3c8', bottom: '#8fe3c8', type: 'dress', sleeve: 0, deco: 'dots', acc: '#fff' } },
  { id: 'o_lemon', cat: 'outfit', name: 'おほしさまT', rar: 1, def: { top: '#ffe27a', bottom: '#ff8fb8', type: 'skirt', sleeve: 22, deco: 'star', acc: '#fff' } },
  { id: 'o_overall', cat: 'outfit', name: 'オーバーオール', rar: 2, def: { top: '#ffffff', bottom: '#6fa8ff', type: 'pants', sleeve: 50, deco: 'overall' } },
  { id: 'o_lav', cat: 'outfit', name: 'リボンのワンピ', rar: 2, def: { top: '#c9b6ff', bottom: '#c9b6ff', type: 'dress', sleeve: 22, deco: 'ribbon', acc: '#ff8fb8' } },
  { id: 'o_sailor', cat: 'outfit', name: 'セーラーふく', rar: 2, def: { top: '#ffffff', bottom: '#5a6fb0', type: 'skirt', sleeve: 22, deco: 'sailor' } },
  { id: 'o_berry', cat: 'outfit', name: 'いちごのワンピ', rar: 3, def: { top: '#ffb3c9', bottom: '#ffb3c9', type: 'dress', sleeve: 0, deco: 'strawberry', acc: '#ff5d7f' } },
  { id: 'o_rainbow', cat: 'outfit', name: 'にじいろシャツ', rar: 3, def: { top: '#ffffff', bottom: '#8fd0ff', type: 'skirt', sleeve: 22, deco: 'rainbow' } },
  { id: 'o_princess', cat: 'outfit', name: 'プリンセスドレス', rar: 3, def: { top: '#ff9fc4', bottom: '#ff9fc4', type: 'dress', sleeve: 0, deco: 'crownline', acc: '#ffd84a' } },
  { id: 'lim2', cat: 'outfit', name: 'ひまわりワンピ', rar: 3, lim: 2, def: { top: '#ffd84a', bottom: '#ffd84a', type: 'dress', sleeve: 22, deco: 'flower', acc: '#ff9f43' } },
  { id: 'lim5', cat: 'outfit', name: 'ほしぞらローブ', rar: 3, lim: 5, def: { top: '#5b4b8a', bottom: '#5b4b8a', type: 'dress', sleeve: 50, deco: 'galaxy', acc: '#ffe27a' } },
  // くつ
  { id: 's_pink', cat: 'shoes', name: 'ピンクのくつ', rar: 1, def: { color: '#ff8fb8' } },
  { id: 's_white', cat: 'shoes', name: 'スニーカー', rar: 1, def: { color: '#ffffff', stripe: '#8fd0ff' } },
  { id: 's_red', cat: 'shoes', name: 'あかいくつ', rar: 1, def: { color: '#ff6b7a' } },
  { id: 's_boots', cat: 'shoes', name: 'ブーツ', rar: 2, def: { color: '#b07a5a', tall: true } },
  { id: 'lim7', cat: 'shoes', name: 'クリスタルのくつ', rar: 3, lim: 7, def: { color: '#a8e6ff', stripe: '#fff', spark: true } },
  // ぼうし
  { id: 't_ribbon', cat: 'hat', name: 'おおきなリボン', rar: 1, def: { kind: 'ribbon', c1: '#ff6fa5' } },
  { id: 't_cat', cat: 'hat', name: 'ねこみみ', rar: 1, def: { kind: 'cat', c1: '#f0d9c4' } },
  { id: 't_cap', cat: 'hat', name: 'キャップ', rar: 1, def: { kind: 'cap', c1: '#6fbfff' } },
  { id: 't_beret', cat: 'hat', name: 'ベレーぼう', rar: 2, def: { kind: 'beret', c1: '#ff8fb8' } },
  { id: 't_flower', cat: 'hat', name: 'おはなのかんむり', rar: 2, def: { kind: 'flower' } },
  { id: 't_crown', cat: 'hat', name: 'おうかん', rar: 3, def: { kind: 'crown', c1: '#ffd84a' } },
  { id: 'lim3', cat: 'hat', name: 'キラキラティアラ', rar: 3, lim: 3, def: { kind: 'tiara', c1: '#e8e8ff' } },
  { id: 'lim8', cat: 'hat', name: 'まほうのぼうし', rar: 3, lim: 8, def: { kind: 'witch', c1: '#7a5ccc' } },
  { id: 'sp_gold', cat: 'hat', name: 'ゴールドクラウン', rar: 3, sp: true, def: { kind: 'crown', c1: '#ffc400', big: true } },
  // アクセサリー
  { id: 'a_neck', cat: 'accessory', name: 'ネックレス', rar: 1, def: { kind: 'necklace' } },
  { id: 'a_scarf', cat: 'accessory', name: 'スカーフ', rar: 1, def: { kind: 'scarf', c1: '#ff8fb8' } },
  { id: 'a_glasses', cat: 'accessory', name: 'まるめがね', rar: 2, def: { kind: 'glasses', c1: '#ff6fa5' } },
  { id: 'a_wand', cat: 'accessory', name: 'ほしのステッキ', rar: 2, def: { kind: 'wand' } },
  { id: 'a_cape', cat: 'accessory', name: 'マント', rar: 2, def: { kind: 'cape', c1: '#ff6fa5' } },
  { id: 'a_wings', cat: 'accessory', name: 'てんしのはね', rar: 3, def: { kind: 'wings', c1: '#ffffff' } },
  { id: 'lim4', cat: 'accessory', name: 'ハートのはね', rar: 3, lim: 4, def: { kind: 'wings', c1: '#ffb6d5' } },
  // ペット
  { id: 'p_cat', cat: 'pet', name: 'ねこ', rar: 1, def: { kind: 'cat' } },
  { id: 'p_dog', cat: 'pet', name: 'いぬ', rar: 1, def: { kind: 'dog' } },
  { id: 'p_bunny', cat: 'pet', name: 'うさぎ', rar: 2, def: { kind: 'bunny' } },
  { id: 'p_penguin', cat: 'pet', name: 'ペンギン', rar: 2, def: { kind: 'penguin' } },
  { id: 'p_unicorn', cat: 'pet', name: 'ユニコーン', rar: 3, def: { kind: 'unicorn' } },
  { id: 'lim9', cat: 'pet', name: 'ひよこ', rar: 3, lim: 9, def: { kind: 'chick' } },
  // おへやのかざり
  { id: 'r_window', cat: 'room', name: 'まどとカーテン', rar: 1, def: { kind: 'window' } },
  { id: 'r_garland', cat: 'room', name: 'ほしのガーランド', rar: 1, def: { kind: 'garland' } },
  { id: 'r_plant', cat: 'room', name: 'おはなのうえき', rar: 2, def: { kind: 'plant' } },
  { id: 'r_rainbow', cat: 'room', name: 'にじのポスター', rar: 2, def: { kind: 'rainbow' } },
  { id: 'lim6', cat: 'room', name: 'ほしぞらのおへや', rar: 3, lim: 6, def: { kind: 'night' } },
];
const ITEM_BY_ID = {};
ITEMS.forEach(i => { ITEM_BY_ID[i.id] = i; });
const LIMITED_BY_DAN = {};
ITEMS.forEach(i => { if (i.lim) LIMITED_BY_DAN[i.lim] = i.id; });

const CATS = [
  { id: 'hair', name: 'かみがた', icon: '💇' },
  { id: 'hairColor', name: 'かみのいろ', icon: '🎨' },
  { id: 'outfit', name: 'ふく', icon: '👗' },
  { id: 'shoes', name: 'くつ', icon: '👟' },
  { id: 'hat', name: 'ぼうし', icon: '👑' },
  { id: 'accessory', name: 'アクセ', icon: '🎀' },
  { id: 'pet', name: 'ペット', icon: '🐾' },
  { id: 'room', name: 'おへや', icon: '🏠' },
];
const REQUIRED_CATS = ['hair', 'hairColor', 'outfit', 'shoes'];
const PRICE = { 1: 5, 2: 15, 3: 30 };
const GACHA_COST = 10;
const GACHA_REFUND = 3;

// ---- ナビ・友だちキャラ ----
const NPC = {
  coco: { name: 'ここちゃん', hair: 'h_twin', hairColor: { color: '#ff8fb8' }, outfit: { top: '#ff8fb8', bottom: '#ff8fb8', type: 'dress', sleeve: 22, deco: 'heart', acc: '#fff' }, shoes: 's_white', hat: 't_ribbon' },
  mint: { name: 'みんと', hair: 'h_bob', hairColor: { color: '#63d3b2' }, outfit: 'o_sky', shoes: 's_red', hat: null },
  yuzu: { name: 'ゆず', hair: 'h_pony', hairColor: { color: '#ffd45e' }, outfit: 'o_lemon', shoes: 's_pink', hat: null },
  lala: { name: 'らら', hair: 'h_long', hairColor: { color: '#b59cff' }, outfit: 'o_lav', shoes: 's_white', hat: null },
  sora: { name: 'そら', hair: 'h_bun', hairColor: { color: '#6fbfff' }, outfit: 'o_sailor', shoes: 's_boots', hat: null },
};
const FRIENDS = ['mint', 'yuzu', 'lala', 'sora'];

const BALLOON_COLORS = ['#ff8fb8', '#8fe3c8', '#ffe27a', '#8fd0ff', '#c9b6ff', '#ffb27a'];
