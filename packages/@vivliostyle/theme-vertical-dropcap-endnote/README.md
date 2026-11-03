# @vivliostyle/theme-vertical-dropcap-endnote

巻末解説ページ向けテーマ。縦組み1段の明朝体本文にドロップキャップ風の初字とルビを組み、小口側の縦組み傍注と本文終端の巻末註をコンパクトに収める。

## 使い方

```css
@import '@vivliostyle/theme-vertical-dropcap-endnote';
```

原稿の書きかた:

- 解説の題は `# 解説　…` の h1 で書く。柱には書名 (`vivliostyle.config.js` の `title`) とこの題が並ぶ。
- 註は VFM の `[^1]` を使う。本文の合印 `(1)` と巻末の「註」一覧が自動で振られる。
- 小口側の傍注は `<aside class="sidebar">` に段落を並べる。番号は CSS が付ける。
- 節の切れ目は `<p class="divider">＊</p>`、解説者の署名は `<div class="byline">` で書く。
- 縦組みで正立させたい算用数字には `.tcy` を付ける (`<span class="tcy">14</span>`)。
