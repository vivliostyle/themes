# @vivliostyle/theme-four-column-plain-table

A4縦・4段組・墨1色のデータベース風電子部品カタログテーマ。等幅書体で型番/主要特性/パッケージの3列表を高密度に連続配置し、ピン配置図とNOTE枠を段下部に定着させる。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-four-column-plain-table',
};
```

## 原稿の書き方

- 節は `##`、小節は `###`。番号は原稿に書かず、テーマが連番で振る。frontmatter に `class: chapter` を書くと `3.1` のように章番号が冠される。
- 節への参照は `<a href="#節のid" data-ref="sec"></a>`。参照先の見出しには `## OPERATIONAL AMPLIFIERS {#sec-opamp}` で id を付ける。
- 型番表はふつうの Markdown 表を 1 つ書けばよい。段をまたいで自動的に流れるので、段ごとに表を分けたり「(CONT)」の見出しを繰り返したりする必要はない。
- ピン配置図は単独行の画像 (`![DIP-8 (TOP VIEW)](fig-dip8.svg)`) で置く。page float として段の地に定着する。
- 注記は `<div class="note">` で囲む。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                     | 既定値                        | 説明                 |
| ------------------------ | ----------------------------- | -------------------- |
| `--vs-columns`           | `4`                           | 型番表を流す段の数   |
| `--vs-font-family`       | `'JetBrains Mono', monospace` | 全編共通の等幅書体   |
| `--vs-color-foreground`        | `#1a1a1a`                     | 本文・罫の墨色       |
| `--vs-color-background`  | `#f7f6f2`                     | 地色                 |
| `--vs-theme-four-column-plain-table--rule-width` | `0.4pt`                       | 図版枠・NOTE枠の罫幅 |
