# @vivliostyle/theme-vertical-numbered-heading-graph

新書判の学術新書向けテーマ。縦組み1段の明朝体本文に漢数字の節見出しを立て、版面の地に横組みの図版 (グラフ等) をページフロートで置いて本文を回り込ませる。巻末注に対応する。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-vertical-numbered-heading-graph',
};
```

原稿の書きかた:

- 節見出しは `## 見出し` と書き、番号は書かない (`--vs-section--*` が漢数字で付ける)。番号を振りたくない見出しは `## 見出し ##` と閉じる。
- 図版は `![キャプション](fig.svg){#fig-id}`。キャプションに「図1」と書かず、本文からは `<a href="#fig-id" data-ref="fig"></a>` で参照する。
- 注は VFM の `[^1]` を使う。本文の合印と巻末の「注」一覧が自動で振られる。
- 縦組みで正立させたい算用数字には `.tcy` を付ける (`<span class="tcy">21</span>`)。
- 柱には `vivliostyle.config.js` の `title` (書名) が入る。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                    | 既定値                   | 説明                         |
| --------------------------------------- | ------------------------ | ---------------------------- |
| `--vs-font-family`                      | `'Noto Serif JP', serif` | 本文書体                     |
| `--vs-color-foreground`                       | `#1a1a1a` | 本文の墨色                   |
| `--vs-color-background`                 | `#f7f5f0` | 地色                         |
| `--vs--h2-padding-inline`               | `11mm 0`                 | 節見出しの天からの一字下げ量 |
| `--vs-section--counter-style`           | `cjk-ideographic`        | 節番号の書式                 |
| `--vs-counter-style`                    | `cjk-ideographic`        | 図表番号の書式               |
| `--vs--figure-item-size-inline`        | `50mm`                   | 地に置く図版の幅             |
| `--vs-page--mbox-top-right-content`     | `env(pub-title)`         | 柱の内容                     |
| `--vs-page--mbox-bottom-right-content`  | `counter(page)`          | ノンブルの内容               |
| `--vs-endnote--section-heading-content` | `'注'`                   | 巻末注の見出し               |
