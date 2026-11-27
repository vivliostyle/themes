# Vivliostyle Themesギャラリー

npm packageとして公開されているVivliostyle Themesのギャラリーです。新しく公開されたテーマは見つけ次第掲載していますが、掲載漏れを見つけた場合は [issue](https://github.com/vivliostyle/themes/issues) やpull requestをお願いします。

## 公式のVivliostyle Themes

現在、10の公式のテーマがあります。

### [@vivliostyle/theme-bunko](https://www.npmjs.com/package/@vivliostyle/theme-bunko)

日本語の縦書き小説などに向いています。ルビ、縦中横にも対応しています。CSS変数で行数・文字数、ページヘッダ等をカスタマイズ可能です。

- [README（CSS変数一覧）](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-bunko#readme)

![theme-bunkoのサンプル画像。原稿は「銀河鉄道の夜」。](../assets/captures/theme-bunko.webp)

### [@vivliostyle/theme-slide](https://www.npmjs.com/package/@vivliostyle/theme-slide)

スライド資料などに向いています。表紙ページと一般ページでスタイルが変わります。CSS変数で配色、レイアウト、カバーページのスタイル等をカスタマイズ可能です。

- [README（CSS変数一覧）](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-slide#readme)

![theme-slideのサンプル画像。左は表紙ページで背景が青く、右は一般ページで背景が白い。](../assets/captures/theme-slide.webp)

### [@vivliostyle/theme-techbook](https://www.npmjs.com/package/@vivliostyle/theme-techbook)

印刷を意識した技術書（小口・ノドの余白調整など）。ソースコードや目次にも対応しています。CSS変数で配色、ページヘッダ・フッタ、画像解像度等をカスタマイズ可能です。

- [README（CSS変数一覧）](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-techbook#readme)

![theme-techbookのサンプル画像。テキストのほか、表、ソースコードが載っている。](../assets/captures/theme-techbook.webp)

### [@vivliostyle/theme-academic](https://www.npmjs.com/package/@vivliostyle/theme-academic)

学生が書くレポートなどに向いています。自動で章・節番号がつきます。CSS変数で図のサイズやフレーム要素のスタイルをカスタマイズ可能です。

- [README（CSS変数一覧）](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-academic#readme)

![theme-academicのサンプル画像。テキストのほか、図、表が載っている。](../assets/captures/theme-academic.webp)

### [@vivliostyle/theme-gutenberg](https://www.npmjs.com/package/@vivliostyle/theme-gutenberg)

英語の横書き小説などに向いています。デフォルトの `theme.css` のほかに、3種のCSSバリエーション（`alice.css`, `fang.css`, `sherlock.css`）があります。

- [README](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-gutenberg#readme)

#### alice.css

![theme-gutenbergのサンプル画像。原稿は「Alice's Adventures in Wonderland」。](../assets/captures/theme-gutenberg-alice.webp)

#### fang.css

![theme-gutenbergのサンプル画像。原稿は「White Fang」。](../assets/captures/theme-gutenberg-fang.webp)

#### sherlock.css

![theme-gutenbergのサンプル画像。原稿は「The Adventures of Sherlock Holmes」。](../assets/captures/theme-gutenberg-sherlock.webp)

### [@vivliostyle/theme-epub3j](https://www.npmjs.com/package/@vivliostyle/theme-epub3j)

[電書協EPUB3制作ガイド](http://ebpaj.jp/counsel/guide)準拠のEPUBを作るためのテーマです。日本語縦書きのEPUB出版物に適しています。

- [README](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-epub3j#readme)

![theme-epub3jのサンプル画像。](../assets/captures/theme-epub3j.webp)

### [@vivliostyle/theme-centered-heading-line-graph](https://www.npmjs.com/package/@vivliostyle/theme-centered-heading-line-graph)

英語教科書向けの2段組テーマです。センタリングした番号付き見出し、色付きヘッダの表、折れ線グラフを多用するデータ重視のページを組みます。

- [README](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-centered-heading-line-graph#readme)

![theme-centered-heading-line-graphのサンプル画像。センタリングした番号付き見出し、表、折れ線グラフを含む2段組の英語教科書。](../assets/captures/theme-centered-heading-line-graph.webp)

### [@vivliostyle/theme-mono-hanging-number-sidenote](https://www.npmjs.com/package/@vivliostyle/theme-mono-hanging-number-sidenote)

全面モノスペースで組む大学教科書向けのテーマです。ハンギングした節番号と、版面の外側の余白に並ぶ番号付き傍注が特徴です。

- [README](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-mono-hanging-number-sidenote#readme)

![theme-mono-hanging-number-sidenoteのサンプル画像。ハンギング節番号と外側の余白の傍注を持つモノスペースの教科書。](../assets/captures/theme-mono-hanging-number-sidenote.webp)

### [@vivliostyle/theme-vertical-numbered-heading-graph](https://www.npmjs.com/package/@vivliostyle/theme-vertical-numbered-heading-graph)

学術教養書向けのテーマです。縦組み明朝1段で、漢数字の番号付き節見出しを組み、グラフなどの横組みの図版を版面下部に配置します。後注にも対応しています。

- [README](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-vertical-numbered-heading-graph#readme)

![theme-vertical-numbered-heading-graphのサンプル画像。縦組みの本文、番号付き見出し、版面下部の横組みグラフ。](../assets/captures/theme-vertical-numbered-heading-graph.webp)

### [@vivliostyle/theme-wide-margin-speaker-indent](https://www.npmjs.com/package/@vivliostyle/theme-wide-margin-speaker-indent)

広めの余白を取った1段組の技術同人誌向けテーマです。対談形式のページを話者名のぶら下げインデントで組み、発言の合間にプルクォートやコードブロックを置けます。

- [README](https://github.com/vivliostyle/themes/tree/main/packages/@vivliostyle/theme-wide-margin-speaker-indent#readme)

![theme-wide-margin-speaker-indentのサンプル画像。表紙と、話者名のぶら下げインデントで組んだ対談ページ。](../assets/captures/theme-wide-margin-speaker-indent.webp)

## 非公式のVivliostyle Themes

### [vivliostyle-theme-dnd-5e-phb](https://www.npmjs.com/package/vivliostyle-theme-dnd-5e-phb)

作成者：oldgeese

D&D 5e PHB theme for Vivliostyle

<img src="https://raw.githubusercontent.com/oldgeese/vivliostyle-theme-dnd5e-phb/HEAD/example/sample.png" alt="" style="max-width:500px">

### [vivliostyle-theme-thesis](https://www.npmjs.com/package/vivliostyle-theme-thesis)

作成者：yamasy1549

Academic theme (thesis)

### [vivliostyle-akashi-kosen-bulletin](https://www.npmjs.com/package/vivliostyle-akashi-kosen-bulletin)

作成者：yamasy1549

明石高専の年報用スタイル（非公式）
