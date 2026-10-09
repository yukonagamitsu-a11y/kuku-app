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
  'Look! I am wearing something new today!': 'みて！ きょうは あたらしい おようふくだよ！',
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
  'Froggy Hop': 'ぴょんぴょん カエル', 'Hop to the right leaf': 'こたえの はっぱに ジャンプ', 'You made it to the other shore!': 'むこうぎしに ついたよ！',
  'Balloon Pop': 'ふうせんわり', 'Tap the right balloon': 'こたえの ふうせんを タップ',
  'Sweet Shop': 'かわいい おみせやさん', 'Fill the orders': 'ちゅうもんを うけよう',
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
  'My Room': 'マイルーム', 'My Room is open!': 'マイルームが ひらいたよ！', 'Buy your very own room and decorate it.': 'じぶんだけの おへやを かって、かざりつけよう！',
  'Collect 70% of the items to get your own room!': 'アイテムを 7わり あつめると じぶんの おへやが もらえるよ！',
  'My Room is unlocked!': 'マイルームが ひらいたよ！', 'You collected 70% of the items!': 'アイテムを 7わり あつめたね！', 'Open the My Room tab to get your own room.': 'マイルームの タブで じぶんの おへやを かおう！', 'Go!': 'いってみる！',
  'Buy a room': 'おへやを かう', 'Placed in your room!': 'おへやに かざったよ！', 'You bought a room!': 'おへやを てにいれたよ！',
  Wallpaper: 'かべがみ', Floor: 'ゆか', Bed: 'ベッド', Desk: 'つくえ', Shelf: 'たな', Window: 'まど', Poster: 'ポスター', Rug: 'ラグ', Ceiling: 'てんじょう', Corner: 'すみっこ',
  'Plain Window': 'ふつうの まど',
  'Cream Wall': 'クリームの かべ', 'Pink Stripes': 'ピンクの しましま', 'Mint Dots': 'ミントの みずたま', 'Cloudy Sky': 'くものある そら', 'Starry Lavender': 'ほしの ラベンダー', 'Night Sky': 'よぞら',
  'Wood Floor': 'もくめの ゆか', 'Pink Tiles': 'ピンクの タイル', 'Checker Floor': 'チェックの ゆか', 'Grass Floor': 'くさの ゆか', 'Star Floor': 'ほしの ゆか',
  'Cozy Bed': 'ふかふかベッド', 'Princess Bed': 'プリンセスベッド', 'Cloud Bed': 'くものベッド', 'Study Desk': 'べんきょうづくえ', 'Pink Vanity': 'ピンクの ドレッサー', Piano: 'ピアノ',
  'Book Shelf': 'ほんだな', 'Toy Shelf': 'おもちゃだな', 'Trophy Shelf': 'トロフィーだな', 'Sunny Window': 'おひさまの まど', 'Starry Window': 'ほしの まど',
  'Photo Frames': 'しゃしんたて', 'Galaxy Poster': 'ぎんがの ポスター', 'Round Rug': 'まるい ラグ', 'Heart Rug': 'ハートの ラグ', 'Rainbow Rug': 'にじいろの ラグ',
  'Flag Garland': 'はたの ガーランド', 'Pendant Lamp': 'つりさげランプ', 'Star Mobile': 'ほしの モビール', 'Little Plant': 'ちいさな うえき', 'Toy Box': 'おもちゃばこ', Aquarium: 'おさかなの すいそう',
  'Times table chant': '九九の となえ', 'Chant language': '九九の唱えの言葉',
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
// 保護者メニューは大人向け（漢字まじり）
Object.assign(JA_EXACT, {
  "Coco's outfit changes": 'ここちゃんの着替え', 'Every day': '毎日', 'Every 3 days': '3日ごと', 'Every week': '1週間ごと', Never: '変えない',
  'For Parents': '保護者メニュー',
  '📊 Progress by times table (bar = how well remembered)': '📊 段ごとの様子（バー＝定着度）',
  '💪 Top 5 tricky problems': '💪 苦手な九九 トップ5', 'None yet': 'まだありません', 'Not yet': 'まだ',
  '⚙️ Settings': '⚙️ 設定', 'Player name': '名前', Edit: '変更', Language: '言語',
  'Sound effects': '効果音', 'Voice reading': '読み上げ（音声）', 'Daily play limit': '1日の利用時間の目安',
  '🗑️ Data': '🗑️ データ', 'Erase all progress': 'すべての記録を消去', Reset: 'リセット',
  'Progress is saved only on this device and is never sent anywhere.': '記録はこの端末の中だけに保存され、外部には送信されません。',
  'Erase progress?': '記録を消去しますか？', 'Coins and items will be deleted too.': 'コインやアイテムもすべて消えます。',
  Next: '次へ', 'Are you sure?': '本当に消去しますか？', 'This cannot be undone.': '元に戻せません。',
  Erase: '消去', 'Progress erased': '記録を消去しました', 'Name saved!': '名前を保存しました',
  'Grown-ups: press and hold to open': '保護者の方は、長押しで開きます',
  'Your own room is ready!': 'じぶんだけの おへやが できたよ！',
  "Here is your very own room. It's free!": 'おへやを プレゼント！ おかねは いらないよ。',
});
const JA_GOODS = { cookies: 'クッキー', candies: 'あめ', strawberries: 'いちご', cupcakes: 'ケーキ', apples: 'りんご', tangerines: 'みかん', chocolates: 'チョコ', donuts: 'ドーナツ' };

function jaTr(s) {
  if (Object.prototype.hasOwnProperty.call(JA_EXACT, s)) return JA_EXACT[s];
  return null;
}
const JA_PATTERNS = [
  [/^Quiz (\d+)\/9$/, m => `おぼえたかな？ ${m[1]}/9`],
  [/^Sweet Shop (\d+)\/(\d+)$/, m => `かわいい おみせやさん ${m[1]}/${m[2]}`],
  [/^Test (\d+)\/(\d+)$/, m => `ためしてみよう ${m[1]}/${m[2]}`],
  [/^(\d+(?:のだん|단)) Quiz$/, m => `${m[1]} おぼえたかな？`],
  [/^⭐ (\d+(?:のだん|단)) stamp earned!$/, m => `⭐ ${m[1]} スタンプ ゲット！`],
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
  [/^(\d+(?:のだん|단)) Master!$/, m => `${m[1]} マスター！`],
  [/^Collected (\d+) \/ (\d+)$/, m => `あつめた かず ${m[1]} / ${m[2]}`],
  [/^Master (\d+(?:のだん|단))$/, m => `${m[1]} マスターで`],
  [/^Open a capsule 🪙 (\d+)$/, m => `ガチャ 🪙 ${m[1]}`],
  [/^Got a duplicate\? You get 🪙 (\d+) back!$/, m => `かぶっても だいじょうぶ！ 🪙 ${m[1]}こ もどるよ`],
  [/^Buy for 🪙 (\d+)\?$/, m => `🪙 ${m[1]}こで かう？`],
  [/^Duplicate! 🪙 (\d+) back to you$/, m => `かぶったから 🪙 ${m[1]}こ もどるよ`],
  [/^(\d+)% correct \((\d+) tries\)$/, m => `正答率 ${m[1]}%（${m[2]}回）`],
  [/^(\d+×\d+＝\d+)\(missed (\d+)x\)$/, m => `${m[1]}（誤答 ${m[2]}回）`],
  [/^Daily play limit \(today: (\d+) min\)$/, m => `1日の利用時間の目安（今日: ${m[1]}分）`],
  [/^(\d+) min$/, m => `${m[1]}分`],
  [/^([A-Za-z' ]+[!?]) (\S.*[ぁ-ん].*)$/, m => (jaTr(m[1]) !== null ? `${jaTr(m[1])} ${m[2]}` : null)],
  [/^(\d+) \/ (\d+) items collected$/, m => `${m[1]} / ${m[2]} こ あつまったよ`],
  [/^🔒 Buy (\d+) more room items$/, m => `🔒 あと ${m[1]}こ かざりを かうと ひらくよ`],
  [/^This round 🪙 (\d+)$/, m => `いまの ゲーム 🪙 ${m[1]}`],
  [/^🎁 Daily bonus \+(\d+) \(included\)$/, m => `🎁 きょうの さいしょの ボーナス +${m[1]}（ふくむ）`],
];

const I18N = {
  lang() { return (typeof S !== 'undefined' && S.settings && S.settings.lang) || 'en'; },
  tr(s) {
    const t = jaTr(s);
    if (t !== null) return t;
    for (const [re, fn] of JA_PATTERNS) { const m = s.match(re); if (m) { const r = fn(m); if (r !== null) return r; } }
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
