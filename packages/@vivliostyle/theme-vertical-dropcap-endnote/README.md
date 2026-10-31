# @vivliostyle/theme-vertical-dropcap-endnote

A6判の文庫巻末解説ページ向けテーマ。縦組み1段の明朝体本文にドロップキャップ風の初字とルビを組み、小口側の縦組み傍注と本文終端の巻末註をコンパクトに収める。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-vertical-dropcap-endnote',
};
```

原稿の書きかた:

- 解説の題は `# 解説　…` の h1 で書く。柱には書名 (`vivliostyle.config.js` の `title`) とこの題が並ぶ。
- 註は VFM の `[^1]` を使う。本文の合印 `(1)` と巻末の「註」一覧が自動で振られる。
- 小口側の傍注は `<aside class="sidebar">` に段落を並べる。番号は CSS が付ける。
- 節の切れ目は `<p class="divider">＊</p>`、解説者の署名は `<div class="byline">` で書く。
- 縦組みで正立させたい算用数字には `.tcy` を付ける (`<span class="tcy">14</span>`)。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）と `--vs-color-background`（地色）から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                        | 既定値                                        | 説明                     |
| ------------------------------------------- | --------------------------------------------- | ------------------------ |
| `--vs-font-family`                          | `'Noto Serif JP', serif`                      | 本文書体                 |
| `--vs-font-size`                            | `8pt`                                         | 本文文字サイズ           |
| `--vs-color-foreground`                           | `#1d1c1a` | 本文の墨色               |
| `--vs-color-background`                     | `#f7f3e8` | 地色                     |
| `--vs-color-foreground-alt`                     | `--vs-color-foreground` × `--vs-color-background` 25% | 傍注・巻末註・柱の濃灰色 |
| `--vs-theme-vertical-dropcap-endnote--endnote-call-content`          | `'(' counter(...) ')'`                        | 本文中の註番号           |
| `--vs-theme-vertical-dropcap-endnote--sidenote-marker-content`       | `'(' counter(...) ')'`                        | 傍注の番号               |
| `--vs-theme-vertical-dropcap-endnote--sidenote-padding-inline-start` | `22mm`                                        | 傍注を天から下げる量     |
| `--vs-endnote--section-heading-content`     | `'註'`                                        | 巻末註の見出し           |
| `--vs-page--mbox-top-left-content`          | `env(pub-title) '　　' string(chapter-title)` | 柱の内容                 |
| `--vs-page--mbox-bottom-right-content`      | `counter(page, cjk-decimal)`                  | ノンブルの内容           |
