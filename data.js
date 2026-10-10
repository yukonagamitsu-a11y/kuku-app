/* データ：九九の読み方・アイテム・文言 */
'use strict';
(window.FILE_BUILD = window.FILE_BUILD || {})['data'] = '2026-10-15.73'; // ファイルの新旧チェック用

// 九九の読み方（数式から自動生成せず、手で持つ）kukuReading[段][かける数]
const KUKU_TEXT = {
  1: 'いん いち が いち／いん に が に／いん さん が さん／いん し が し／いん ご が ご／いん ろく が ろく／いん しち が しち／いん はち が はち／いん く が く',
  2: 'に いち が に／に に が し／に さん が ろく／に し が はち／に ご じゅう／に ろく じゅうに／に しち じゅうし／に はち じゅうろく／に く じゅうはち',
  3: 'さん いち が さん／さん に が ろく／さざん が く／さん し じゅうに／さん ご じゅうご／さぶ ろく じゅうはち／さん しち にじゅういち／さん ぱ にじゅうし／さん く にじゅうしち',
  4: 'し いち が し／し に が はち／し さん じゅうに／し し じゅうろく／し ご にじゅう／し ろく にじゅうし／し しち にじゅうはち／し は さんじゅうに／し く さんじゅうろく',
  5: 'ご いち が ご／ご に じゅう／ご さん じゅうご／ご し にじゅう／ご ご にじゅうご／ご ろく さんじゅう／ご しち さんじゅうご／ご は しじゅう／ご く しじゅうご',
  6: 'ろく いち が ろく／ろく に じゅうに／ろく さん じゅうはち／ろく し にじゅうし／ろく ご さんじゅう／ろく ろく さんじゅうろく／ろく しち しじゅうに／ろく は しじゅうはち／ろく く ごじゅうし',
  7: 'しち いち が しち／しち に じゅうし／しち さん にじゅういち／しち し にじゅうはち／しち ご さんじゅうご／しち ろく しじゅうに／しち しち しじゅうく／しち は ごじゅうろく／しち く ろくじゅうさん',
  8: 'はち いち が はち／はち に じゅうろく／はち さん にじゅうし／はち し さんじゅうに／はち ご しじゅう／はち ろく しじゅうはち／はち しち ごじゅうろく／はっぱ ろくじゅうし／はち く しちじゅうに',
  9: 'く いち が く／く に じゅうはち／く さん にじゅうしち／く し さんじゅうろく／く ご しじゅうご／く ろく ごじゅうし／く しち ろくじゅうさん／く は しちじゅうに／く く はちじゅういち',
};
const kukuReading = {};
for (const d in KUKU_TEXT) kukuReading[d] = [null, ...KUKU_TEXT[d].split('／')];

// 段ごとのおかし・くだもの（ドット絵の代わり）
const DAN_EMOJI = ['', '🍓', '🍎', '🍊', '🍋', '🍫', '🍩', '🍑', '🍬', '🍪']; // ふさや ペアに なる ものは さける（かぞえやすい ひとつぶ）

// おかしやさんの商品
const SHOP_GOODS = [
  { name: 'cookies', e: '🍪' }, { name: 'candies', e: '🍬' }, { name: 'strawberries', e: '🍓' },
  { name: 'cupcakes', e: '🧁' }, { name: 'apples', e: '🍎' }, { name: 'tangerines', e: '🍊' },
  { name: 'chocolates', e: '🍫' }, { name: 'donuts', e: '🍩' },
];

const OK_MSG = ['Great job!', 'You did it!', 'Genius!', 'Perfect!', 'Nice!', 'Sparkly!', 'Awesome!', 'Super!'];
const NG_MSG = ['Almost!', "It's okay!", 'Try again!', 'Keep going!']; // まちがえた ときは ひとこと
const HELLO_MSG = ["Let's do our best today!", 'Welcome! What shall we play?', "Let's learn times tables together!"];

// ---- アイテム ----
// def は avatar.js の描画パラメータ。rar = レア度(★の数)。lim = 段マスターの限定、sp = 100点の特別
const ITEMS = [
  // かみがた
  { id: 'h_bob', cat: 'hair', name: 'Bob', rar: 1, def: { style: 'bob' } },
  { id: 'h_short', cat: 'hair', name: 'Short Hair', rar: 1, def: { style: 'short' } },
  { id: 'h_pony', cat: 'hair', name: 'Ponytail', rar: 1, def: { style: 'pony' } },
  { id: 'h_twin', cat: 'hair', name: 'Pigtails', rar: 2, def: { style: 'twin' } },
  { id: 'h_long', cat: 'hair', name: 'Long Hair', rar: 2, def: { style: 'long' } },
  { id: 'h_bun', cat: 'hair', name: 'Buns', rar: 2, def: { style: 'bun' } },
  { id: 'h_braid', cat: 'hair', name: 'Braids', rar: 3, def: { style: 'braid' } },
  { id: 'h_wave', cat: 'hair', name: 'Fluffy Waves', rar: 3, def: { style: 'wave' } },
  // かみの色
  { id: 'c_choco', cat: 'hairColor', name: 'Chocolate', rar: 1, def: { color: '#6b4433' } },
  { id: 'c_black', cat: 'hairColor', name: 'Black', rar: 1, def: { color: '#3d2c35' } },
  { id: 'c_kinako', cat: 'hairColor', name: 'Toasty Brown', rar: 1, def: { color: '#b98259' } },
  { id: 'c_pink', cat: 'hairColor', name: 'Cherry Pink', rar: 2, def: { color: '#ff8fb8' } },
  { id: 'c_lemon', cat: 'hairColor', name: 'Lemon', rar: 2, def: { color: '#ffd45e' } },
  { id: 'c_mint', cat: 'hairColor', name: 'Mint', rar: 2, def: { color: '#63d3b2' } },
  { id: 'c_sky', cat: 'hairColor', name: 'Sky Blue', rar: 2, def: { color: '#6fbfff' } },
  { id: 'c_lav', cat: 'hairColor', name: 'Lavender', rar: 2, def: { color: '#b59cff' } },
  { id: 'lim1', cat: 'hairColor', name: 'Rainbow', rar: 3, lim: 1, def: { color: 'url(#gRainbow)' } },
  // ふく
  { id: 'o_pink', cat: 'outfit', name: 'Heart Skirt', rar: 1, def: { top: '#ff8fb8', bottom: '#c9b6ff', type: 'skirt', sleeve: 22, deco: 'heart' } },
  { id: 'o_sky', cat: 'outfit', name: 'Striped Pants', rar: 1, def: { top: '#8fd0ff', bottom: '#7da7e8', type: 'pants', sleeve: 22, deco: 'stripes' } },
  { id: 'o_mint', cat: 'outfit', name: 'Mint Dress', rar: 1, def: { top: '#8fe3c8', bottom: '#8fe3c8', type: 'dress', sleeve: 0, deco: 'dots', acc: '#fff' } },
  { id: 'o_lemon', cat: 'outfit', name: 'Star Tee', rar: 1, def: { top: '#ffe27a', bottom: '#ff8fb8', type: 'skirt', sleeve: 22, deco: 'star', acc: '#fff' } },
  { id: 'o_overall', cat: 'outfit', name: 'Overalls', rar: 2, def: { top: '#ffffff', bottom: '#6fa8ff', type: 'pants', sleeve: 50, deco: 'overall' } },
  { id: 'o_lav', cat: 'outfit', name: 'Ribbon Dress', rar: 2, def: { top: '#c9b6ff', bottom: '#c9b6ff', type: 'dress', sleeve: 22, deco: 'ribbon', acc: '#ff8fb8' } },
  { id: 'o_sailor', cat: 'outfit', name: 'Sailor Outfit', rar: 2, def: { top: '#ffffff', bottom: '#5a6fb0', type: 'skirt', sleeve: 22, deco: 'sailor' } },
  { id: 'o_berry', cat: 'outfit', name: 'Strawberry Dress', rar: 3, def: { top: '#ffb3c9', bottom: '#ffb3c9', type: 'dress', sleeve: 0, deco: 'strawberry', acc: '#ff5d7f' } },
  { id: 'o_rainbow', cat: 'outfit', name: 'Rainbow Shirt', rar: 3, def: { top: '#ffffff', bottom: '#8fd0ff', type: 'skirt', sleeve: 22, deco: 'rainbow' } },
  { id: 'o_princess', cat: 'outfit', name: 'Princess Dress', rar: 3, def: { top: '#ff9fc4', bottom: '#ff9fc4', type: 'dress', sleeve: 0, deco: 'crownline', acc: '#ffd84a' } },
  { id: 'lim2', cat: 'outfit', name: 'Sunflower Dress', rar: 3, lim: 2, def: { top: '#ffd84a', bottom: '#ffd84a', type: 'dress', sleeve: 22, deco: 'flower', acc: '#ff9f43' } },
  { id: 'lim5', cat: 'outfit', name: 'Starry Robe', rar: 3, lim: 5, def: { top: '#5b4b8a', bottom: '#5b4b8a', type: 'dress', sleeve: 50, deco: 'galaxy', acc: '#ffe27a' } },
  // くつ
  { id: 's_pink', cat: 'shoes', name: 'Pink Shoes', rar: 1, def: { color: '#ff8fb8' } },
  { id: 's_white', cat: 'shoes', name: 'Sneakers', rar: 1, def: { color: '#ffffff', stripe: '#8fd0ff' } },
  { id: 's_red', cat: 'shoes', name: 'Red Shoes', rar: 1, def: { color: '#ff6b7a' } },
  { id: 's_boots', cat: 'shoes', name: 'Boots', rar: 2, def: { color: '#b07a5a', tall: true } },
  { id: 'lim7', cat: 'shoes', name: 'Crystal Shoes', rar: 3, lim: 7, def: { color: '#a8e6ff', stripe: '#fff', spark: true } },
  // ぼうし
  { id: 't_ribbon', cat: 'hat', name: 'Big Ribbon', rar: 1, def: { kind: 'ribbon', c1: '#ff6fa5' } },
  { id: 't_cat', cat: 'hat', name: 'Cat Ears', rar: 1, def: { kind: 'cat', c1: '#f0d9c4' } },
  { id: 't_cap', cat: 'hat', name: 'Cap', rar: 1, def: { kind: 'cap', c1: '#6fbfff' } },
  { id: 't_beret', cat: 'hat', name: 'Beret', rar: 2, def: { kind: 'beret', c1: '#ff8fb8' } },
  { id: 't_flower', cat: 'hat', name: 'Flower Crown', rar: 2, def: { kind: 'flower' } },
  { id: 't_crown', cat: 'hat', name: 'Crown', rar: 3, def: { kind: 'crown', c1: '#ffd84a' } },
  { id: 'lim3', cat: 'hat', name: 'Sparkle Tiara', rar: 3, lim: 3, def: { kind: 'tiara', c1: '#e8e8ff' } },
  { id: 'lim8', cat: 'hat', name: 'Magic Hat', rar: 3, lim: 8, def: { kind: 'witch', c1: '#7a5ccc' } },
  { id: 'sp_gold', cat: 'hat', name: 'Gold Crown', rar: 3, sp: true, def: { kind: 'crown', c1: '#ffc400', big: true } },
  // アクセサリー
  { id: 'a_neck', cat: 'accessory', name: 'Necklace', rar: 1, def: { kind: 'necklace' } },
  { id: 'a_scarf', cat: 'accessory', name: 'Scarf', rar: 1, def: { kind: 'scarf', c1: '#ff8fb8' } },
  { id: 'a_glasses', cat: 'accessory', name: 'Round Glasses', rar: 2, def: { kind: 'glasses', c1: '#ff6fa5' } },
  { id: 'a_wand', cat: 'accessory', name: 'Star Wand', rar: 2, def: { kind: 'wand' } },
  { id: 'a_cape', cat: 'accessory', name: 'Cape', rar: 2, def: { kind: 'cape', c1: '#ff6fa5' } },
  { id: 'a_wings', cat: 'accessory', name: 'Angel Wings', rar: 3, def: { kind: 'wings', c1: '#ffffff' } },
  { id: 'lim4', cat: 'accessory', name: 'Heart Wings', rar: 3, lim: 4, def: { kind: 'wings', c1: '#ffb6d5' } },
  // ペット
  { id: 'p_cat', cat: 'pet', name: 'Kitty', rar: 1, def: { kind: 'cat' } },
  { id: 'p_dog', cat: 'pet', name: 'Puppy', rar: 1, def: { kind: 'dog' } },
  { id: 'p_bunny', cat: 'pet', name: 'Bunny', rar: 2, def: { kind: 'bunny' } },
  { id: 'p_penguin', cat: 'pet', name: 'Penguin', rar: 2, def: { kind: 'penguin' } },
  { id: 'p_unicorn', cat: 'pet', name: 'Unicorn', rar: 3, def: { kind: 'unicorn' } },
  { id: 'lim9', cat: 'pet', name: 'Chick', rar: 3, lim: 9, def: { kind: 'chick' } },
  // おへやのかざり
  { id: 'r_window', cat: 'room', name: 'Window & Curtains', rar: 1, def: { kind: 'window' } },
  { id: 'r_garland', cat: 'room', name: 'Star Garland', rar: 1, def: { kind: 'garland' } },
  { id: 'r_plant', cat: 'room', name: 'Flower Pot', rar: 2, def: { kind: 'plant' } },
  { id: 'r_rainbow', cat: 'room', name: 'Rainbow Poster', rar: 2, def: { kind: 'rainbow' } },
  { id: 'lim6', cat: 'room', name: 'Starry Night Room', rar: 3, def: { kind: 'night' } }, // むかしの ごほうび（いまは マイルームの おまけ）
  { id: 'lim6b', cat: 'hairColor', name: 'Galaxy Hair', rar: 3, lim: 6, hidden: true, def: { color: 'url(#gGalaxy)' } }, // もう くばらない（もらった人は そのまま もてる）
  { id: 'lim6c', cat: 'hair', name: 'Bunny Loops', rar: 3, lim: 6, def: { style: 'bunny' } },
];
const ITEM_BY_ID = {};
ITEMS.forEach(i => { ITEM_BY_ID[i.id] = i; });
const LIMITED_BY_DAN = {};
ITEMS.forEach(i => { if (i.lim) LIMITED_BY_DAN[i.lim] = i.id; });

const CATS = [
  { id: 'hair', name: 'Hairstyle', icon: '💇' },
  { id: 'hairColor', name: 'Hair Color', icon: '🎨' },
  { id: 'outfit', name: 'Outfit', icon: '👗' },
  { id: 'shoes', name: 'Shoes', icon: '👟' },
  { id: 'hat', name: 'Hats', icon: '👑' },
  { id: 'accessory', name: 'Extras', icon: '🎀' },
  { id: 'pet', name: 'Pets', icon: '🐾' },
  { id: 'room', name: 'Room', icon: '🏠' },
];
// 「おへや」カテゴリ（かべがみ・ガーランドなど）は マイルームを もらってから：ショップ・ガチャ・ずかんには ださない
const UI_CATS = CATS.filter(c => c.id !== 'room');
// むかしの「おへやの かざり」は、マイルームを もらったら マイルームの かざりとして ひきつぐ
const ROOM_GIFTS = { r_window: 'm_window', r_garland: 'c_garland', r_plant: 'x_plant', r_rainbow: 'p_rainbow', lim6: 'w_night' };
const REQUIRED_CATS = ['hair', 'hairColor', 'outfit', 'shoes'];
const PRICE = { 1: 8, 2: 22, 3: 45 };
const GACHA_COST = 15;
const GACHA_REFUND = 4;

// ---- ナビ・友だちキャラ ----
const NPC = {
  coco: { name: 'Coco', hair: 'h_twin', hairColor: { color: '#ff8fb8' }, outfit: { top: '#ff8fb8', bottom: '#ff8fb8', type: 'dress', sleeve: 22, deco: 'heart', acc: '#fff' }, shoes: 's_white', hat: 't_ribbon' },
  mint: { name: 'Mint', hair: 'h_bob', hairColor: { color: '#63d3b2' }, outfit: 'o_sky', shoes: 's_red', hat: null },
  yuzu: { name: 'Yuzu', hair: 'h_pony', hairColor: { color: '#ffd45e' }, outfit: 'o_lemon', shoes: 's_pink', hat: null },
  lala: { name: 'Lala', hair: 'h_long', hairColor: { color: '#b59cff' }, outfit: 'o_lav', shoes: 's_white', hat: null },
  sora: { name: 'Sora', hair: 'h_bun', hairColor: { color: '#6fbfff' }, outfit: 'o_sailor', shoes: 's_boots', hat: null },
};
const FRIENDS = ['mint', 'yuzu', 'lala', 'sora'];

const BALLOON_COLORS = ['#ff8fb8', '#8fe3c8', '#ffe27a', '#8fd0ff', '#c9b6ff', '#ffb27a'];
