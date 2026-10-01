/* 日本語表示：英語の画面文言を、ひらがな中心の日本語に置きかえる */
'use strict';

const JA_EXACT = {
  // 共通
  'OK': 'うん', 'Cancel': 'やめる', 'Done': 'おしまい', 'Yay!': 'やったね！', 'None': 'なし',
  "That's all for today!": 'きょうは ここまで！',
  'You worked so hard.': 'たくさん がんばったね。',
  "Let's play again tomorrow!": 'また あした あそぼうね！',
  '🔥 Streak': '🔥 れんぞく', day: 'にち', days: 'にち', '🪙 Coins': '🪙 コイン',
  // ホーム
  'Times Table Town': 'くくの ひみつのまち',
  "Hi! I'm Coco. Let's play together!": 'はじめまして！ ここちゃんだよ。いっしょに あそぼう！',
  'Welcome back! I missed you!': 'またあえたね！ あいたかったよ！',
  "Let's do our best today!": 'きょうも いっしょに がんばろう！',
  'Welcome! What shall we play?': 'ようこそ！ なにして あそぶ？',
  "Let's learn times tables together!": 'いっしょに くくを おぼえよう！',
  Learn: 'おぼえよう', 'Chant and remember': 'となえて おぼえる',
  Play: 'あそぼう', 'Practice with games': 'ゲームで れんしゅう',
  Test: 'ためしてみよう', '10-question challenge': '10もん チャレンジ',
  'Dress-Up Room': 'きせかえルーム', 'Rewards and outfits': 'ごほうびで おしゃれ',
  'Grown-ups: press and hold to open': 'ほごしゃの かたは ながおしで ひらけます',
  Coco: 'ここちゃん',
  // おぼえよう
  'Which times table?': 'どの だんを おぼえる？',
  Practice: 'れんしゅう', 'Master!': 'マスター！', 'Stamp earned': 'スタンプ ゲット',
  '🔊 Read all': '🔊 ぜんぶよむ', '⏹ Stop': '⏹ とめる', '✨ Quiz me!': '✨ おぼえたかな？',
  'Pick the answer': 'こたえを えらんでね',
  'Practice a little more and try again!': 'もういちど おぼえて チャレンジしよう！',
  'Back to learning': 'もういちど よむ',
  // あそぼう
  'Which times tables to play?': 'どの だんを あそぶ？', 'Pick a game!': 'ゲームを えらんでね！',
  'Balloon Pop': 'ふうせんわり', 'Tap the right balloon': 'こたえの ふうせんを タップ',
  'Sweet Shop': 'かわいいおみせやさん', 'Fill the orders': 'ちゅうもんを うけよう',
  'Whack-a-Mole': 'もぐらたたき', 'Tap the right mole': 'こたえの もぐらを タップ',
  "Time's up! Great effort!": 'じかんだよ！ よくがんばったね',
  // ためしてみよう
  'Which times tables to test?': 'どの だんを ためす？', '✏️ Start!': '✏️ スタート！',
  '10 questions. Get them all right for a special prize!': '10もん。ぜんぶ せいかいで とくべつな プレゼント！',
  '⌫ Delete': '⌫ もどす', Enter: 'きめる', 'Next ▶': 'つぎへ ▶',
  '🌟 100 points! A special prize!': '🌟 100てん！ とくべつな プレゼント！',
  'Retry the ones I missed': 'まちがえた もんだいを もういちど', 'Try again': 'もういちど ためす',
  // けっか
  "Let's play together again!": 'また いっしょに あそぼうね！', 'Amazing! Perfect!': 'すごい！ かんぺき！',
  'Well done!': 'よくできたね！', "Good effort! Let's try again together": 'がんばったね！ つぎも いっしょに やろう',
  'Check these answers': 'こたえを みてみよう', 'Play again!': 'もういちど！',
  '👗 Dress-Up Room': '👗 きせかえルーム', '🏠 Home': '🏠 ホーム',
  // きせかえ
  '👗 Dress Up': '👗 きせかえ', '🛍️ Shop': '🛍️ ショップ', '🎁 Capsules': '🎁 ガチャ', '📚 Collection': '📚 ずかん',
  'Nothing yet. Get some from the Shop or Capsules!': 'まだ ないよ。ショップや ガチャで てにいれよう！',
  Owned: 'もってる', 'Score 100 on a test': 'テスト 100てんで', 'Shop or Capsules': 'ショップ・ガチャ',
  'What will come out? More ★ means rarer!': 'なにが でるかな？ ★が おおいほど レア！',
  'Not enough coins. Play to earn more!': 'コインが たりないよ。あそんで ためよう！',
  'Buy!': 'かう！', 'Got it! You are wearing it now': 'てにいれたよ！ さっそく つけたよ',
  'You got it again!': 'また でたよ！', '✨ New friend!': '✨ あたらしい なかま！',
  'Try it on in the Dress-Up Room!': 'きせかえルームで つけてみよう！',
  // ほごしゃ
  'For Parents': 'ほごしゃの かたへ',
  '📊 Progress by times table (bar = how well remembered)': '📊 だんごとの ようす（バー＝おぼえた ぐあい）',
  '💪 Top 5 tricky problems': '💪 にがてな くく トップ5', 'None yet': 'まだ ありません', 'Not yet': 'まだ',
  '⚙️ Settings': '⚙️ せってい', 'Sound effects': 'おと（こうかおん）', 'Voice reading': 'よみあげ（こえ）',
  '🗑️ Data': '🗑️ データ', 'Erase all progress': 'すべての きろくを けす', Reset: 'リセット',
  'Progress is saved only on this device and is never sent anywhere.': 'きろくは この たんまつの なかだけに ほぞんされ、がいぶには おくられません。',
  'Erase progress?': 'きろくを けしますか？', 'Coins and items will be deleted too.': 'コインや アイテムも ぜんぶ きえます。',
  Next: 'つぎへ', 'Are you sure?': 'ほんとうに けしますか？', 'This cannot be undone.': 'もとには もどせません。',
  Erase: 'けす', 'Progress erased': 'きろくを けしました',
  'Tip: bigger times tables earn more coins!': 'ヒント：おおきい だんほど コインが たくさん もらえるよ！', '💡 Tip: bigger times tables earn more coins!': '💡 ヒント：おおきい だんほど コインが たくさん もらえるよ！',
  '🌱 You practiced these a lot today, so coins are lower. Try other times tables!': '🌱 きょうは おなじ もんだいを たくさん やったから、コインが すこし へったよ。ほかの だんも やってみよう！',
  'Daily play limit': '1にちの あそぶ めやす', 'Player name': 'なまえ', Edit: 'へんしゅう', Language: 'ことば', Save: 'ほぞん',
  "What's your name?": 'なまえを おしえてね', 'Type your name': 'なまえを いれてね', 'Name saved!': 'なまえを ほぞんしたよ',
  // ほめことば・はげまし
  'Great job!': 'すごい！', 'You did it!': 'やったね！', 'Genius!': 'てんさい！', 'Perfect!': 'かんぺき！',
  'Nice!': 'いいね！', 'Sparkly!': 'きらきら！', 'Awesome!': 'さすが！', 'Super!': 'ばっちり！',
  'Almost! You can do it next time': 'おしい！ つぎは できるよ',
  "Just a little off. Let's look together": 'ちょっとだけ ちがったね。いっしょに みてみよう',
  "It's okay! Try again": 'だいじょうぶ！ もういちど やってみよう', 'Almost! Just a bit more!': 'おしい！ もうすこし！',
  // aria-label
  Back: 'もどる', Parents: 'ほごしゃ', Listen: 'よむ',
  // アイテム
  Bob: 'おかっぱ', 'Short Hair': 'ショート', Ponytail: 'ポニーテール', Pigtails: 'ツインテール', 'Long Hair': 'ロングヘア', Buns: 'おだんご', Braids: 'みつあみ', 'Fluffy Waves': 'ふわふわ',
  Chocolate: 'チョコ', Black: 'くろかみ', 'Toasty Brown': 'きなこ', 'Cherry Pink': 'さくら', Lemon: 'レモン', Mint: 'ミント', 'Sky Blue': 'そらいろ', Lavender: 'ラベンダー', Rainbow: 'にじいろ',
  'Heart Skirt': 'ハートのスカート', 'Striped Pants': 'しましまパンツ', 'Mint Dress': 'ミントのワンピ', 'Star Tee': 'おほしさまT', Overalls: 'オーバーオール', 'Ribbon Dress': 'リボンのワンピ', 'Sailor Outfit': 'セーラーふく', 'Strawberry Dress': 'いちごのワンピ', 'Rainbow Shirt': 'にじいろシャツ', 'Princess Dress': 'プリンセスドレス', 'Sunflower Dress': 'ひまわりワンピ', 'Starry Robe': 'ほしぞらローブ',
  'Pink Shoes': 'ピンクのくつ', Sneakers: 'スニーカー', 'Red Shoes': 'あかいくつ', Boots: 'ブーツ', 'Crystal Shoes': 'クリスタルのくつ',
  'Big Ribbon': 'おおきなリボン', 'Cat Ears': 'ねこみみ', Cap: 'キャップ', Beret: 'ベレーぼう', 'Flower Crown': 'おはなのかんむり', Crown: 'おうかん', 'Sparkle Tiara': 'キラキラティアラ', 'Magic Hat': 'まほうのぼうし', 'Gold Crown': 'ゴールドクラウン',
  Necklace: 'ネックレス', Scarf: 'スカーフ', 'Round Glasses': 'まるめがね', 'Star Wand': 'ほしのステッキ', Cape: 'マント', 'Angel Wings': 'てんしのはね', 'Heart Wings': 'ハートのはね',
  Kitty: 'ねこ', Puppy: 'いぬ', Bunny: 'うさぎ', Penguin: 'ペンギン', Unicorn: 'ユニコーン', Chick: 'ひよこ',
  'Window & Curtains': 'まどとカーテン', 'Star Garland': 'ほしのガーランド', 'Flower Pot': 'おはなのうえき', 'Rainbow Poster': 'にじのポスター', 'Starry Night Room': 'ほしぞらのおへや',
  Hairstyle: 'かみがた', 'Hair Color': 'かみのいろ', Outfit: 'ふく', Shoes: 'くつ', Hats: 'ぼうし', Extras: 'アクセ', Pets: 'ペット', Room: 'おへや',
};
const JA_GOODS = { cookies: 'クッキー', candies: 'あめ', strawberries: 'いちご', cupcakes: 'ケーキ', apples: 'りんご', tangerines: 'みかん', cherries: 'さくらんぼ', donuts: 'ドーナツ' };

function jaTr(s) {
  if (Object.prototype.hasOwnProperty.call(JA_EXACT, s)) return JA_EXACT[s];
  return null;
}
const JA_PATTERNS = [
  [/^Quiz (\d+)\/9$/, m => `おぼえたかな？ ${m[1]}/9`],
  [/^Sweet Shop (\d+)\/(\d+)$/, m => `かわいいおみせやさん ${m[1]}/${m[2]}`],
  [/^Test (\d+)\/(\d+)$/, m => `ためしてみよう ${m[1]}/${m[2]}`],
  [/^(\d+)のだん Quiz$/, m => `${m[1]}のだん おぼえたかな？`],
  [/^⭐ (\d+)のだん stamp earned!$/, m => `⭐ ${m[1]}のだん スタンプ ゲット！`],
  [/^(\d+) groups? of (\d+) → (\d+) in all$/, m => `${m[2]}こずつ ${m[1]}グループ → ぜんぶで ${m[3]}こ`],
  [/^"I'd like (\d+) (.+) in each bag\. (\d+) bags?, please!"$/, m => `「${JA_GOODS[m[2]] || m[2]}を ${m[1]}こずつ、${m[3]}ふくろ ください！」`],
  [/^(\S+) will go here$/, m => `ここに ${m[1]} が はいるよ`],
  [/^(\d+) in each bag × (\d+) bags → How many in all\?$/, m => `${m[1]}こずつ ${m[2]}ふくろ → ぜんぶで いくつかな？`],
  [/^Thank you! (\d+) in all!$/, m => `ありがとう！ ぜんぶで ${m[1]}こ！`],
  [/^⭕ Correct! (.+)$/, m => `⭕ せいかい！ ${jaTr(m[1]) || m[1]}`],
  [/^💡 The answer is (\d+)$/, m => `💡 こたえは ${m[1]} だよ`],
  [/^(\d+) points$/, m => `${m[1]}てん`],
  [/^Correct: (\d+) \/ (\d+)$/, m => `せいかい ${m[1]} / ${m[2]}`],
  [/^Correct: (\d+)$/, m => `せいかい ${m[1]}もん`],
  [/^🪙 Coins \+(\d+)$/, m => `🪙 コイン +${m[1]}`],
  [/^🎉 (.+) mastered!$/, m => `🎉 ${m[1].replace(/, /g, '・')} マスター！`],
  [/^(\d+)のだん Master!$/, m => `${m[1]}のだん マスター！`],
  [/^Collected (\d+) \/ (\d+)$/, m => `あつめた かず ${m[1]} / ${m[2]}`],
  [/^Master (\d+)のだん$/, m => `${m[1]}のだん マスターで`],
  [/^Open a capsule 🪙 (\d+)$/, m => `ガチャ 🪙 ${m[1]}`],
  [/^Got a duplicate\? You get 🪙 (\d+) back!$/, m => `かぶっても だいじょうぶ！ 🪙 ${m[1]}こ もどるよ`],
  [/^Buy for 🪙 (\d+)\?$/, m => `🪙 ${m[1]}こで かう？`],
  [/^Duplicate! 🪙 (\d+) back to you$/, m => `かぶったから 🪙 ${m[1]}こ もどるよ`],
  [/^(\d+)% correct \((\d+) tries\)$/, m => `せいかい ${m[1]}%（${m[2]}かい）`],
  [/^(\d+×\d+＝\d+)\(missed (\d+)x\)$/, m => `${m[1]}（まちがい ${m[2]}かい）`],
  [/^Daily play limit \(today: (\d+) min\)$/, m => `1にちの あそぶ めやす（きょう ${m[1]}ふん）`],
  [/^(\d+) min$/, m => `${m[1]}ふん`],
];

const I18N = {
  lang() { return (typeof S !== 'undefined' && S.settings && S.settings.lang) || 'en'; },
  tr(s) {
    const t = jaTr(s);
    if (t !== null) return t;
    for (const [re, fn] of JA_PATTERNS) { const m = s.match(re); if (m) return fn(m); }
    const e = s.match(/^([^A-Za-z0-9\s]+)\s+(.+)$/); // 先頭が絵文字のとき
    if (e) { const r = this.tr(e[2]); if (r !== null) return e[1] + ' ' + r; }
    return null;
  },
  node(n) {
    const v = n.nodeValue;
    if (!v || !/[A-Za-z]/.test(v)) return;
    const t = v.trim(); if (!t) return;
    const out = this.tr(t);
    if (out !== null && out !== t) n.nodeValue = v.replace(t, out);
  },
  apply(root) {
    if (this.lang() !== 'ja' || !root) return;
    if (root.nodeType === 3) { this.node(root); return; }
    if (root.nodeType !== 1) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let n; const list = [];
    while ((n = w.nextNode())) list.push(n);
    list.forEach(x => this.node(x));
    const els = root.matches && root.matches('[aria-label]') ? [root] : [];
    root.querySelectorAll('[aria-label]').forEach(e => els.push(e));
    els.forEach(e => { const o = this.tr(e.getAttribute('aria-label')); if (o) e.setAttribute('aria-label', o); });
  },
  start() {
    new MutationObserver(ms => {
      if (this.lang() !== 'ja') return;
      for (const m of ms) {
        if (m.type === 'characterData') this.apply(m.target);
        else m.addedNodes.forEach(n => this.apply(n));
      }
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
    this.refreshMeta();
  },
  refreshMeta() {
    const ja = this.lang() === 'ja';
    document.title = ja ? 'くくの ひみつのまち' : 'Times Table Town';
    document.documentElement.lang = ja ? 'ja' : 'en';
  },
};
