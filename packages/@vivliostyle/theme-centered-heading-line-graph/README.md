# @vivliostyle/theme-centered-heading-line-graph

A4判縦・2段組の英語ミクロ経済学教科書向けテーマ。中央揃えの番号付き見出し、緑ヘッダーの需給表、折れ線グラフ・需給曲線図といったデータ多用の紙面を組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-centered-heading-line-graph',
};
```

原稿の書き方:

- 1 章 = 1 ファイルとし、frontmatter に `class: chapter` と章題 (`title`) を書く。章番号 (見出し・図表番号・柱) は base のドキュメントカウンタ `vs-counter-chapter` から採り、柱の左は章題 (`env(doc-title)`)、右は書名 (`env(pub-title)` = config の `title`) が入る。
- 節は `## 節題 {#id}`。番号を付けない見出しは `## 見出し ##` と閉じ `#` を付ける (節にならないので番号を消費しない)。章末のまとめ・練習問題は段組が節単位なので section を残す必要があり、`## 節題 {.closing}` と書くと番号だけが落ちる。
- 図は `![キャプション](fig.svg){#id}`、表は `<figure class="tbl" id="id">` で表と `<figcaption>` を包む。番号 (`Figure 7.1` / `Table 7.1`) はカウンタが振る。
- 参照は `<a href="#id" data-ref="fig|tbl|sec"></a>`。VFM は空要素の直後の空白を落とすので、続けて語が来る場合は `&nbsp;` を書く。
- 段抜きにする図表は `wide` クラスを付ける。図番号を持たないチャートは `<div class="chart">`、枠付きグラフは `<div class="panel">` で包む。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）・`--vs-color-background`（地色）・`--vs-color-foreground-alt`（アクセント色）の 3 色から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                             | 既定値                  | 説明                                     |
| -------------------------------- | ----------------------- | ---------------------------------------- |
| `--vs-color-foreground` | `#1a1a1a` | 本文の文字色 |
| `--vs-color-background` | `#fdfdf8` | 紙面の地色 |
| `--vs-color-foreground-alt` | `#006633` | アクセント色 |
| `--vs-font-family`               | `'Source Serif 4', ...` | 本文・見出しの書体                       |
| `--vs-theme-centered-heading-line-graph--font-caption`       | `'PT Serif', ...`       | キャプション・柱・ノンブルの書体         |
| `--vs-theme-centered-heading-line-graph--color-accent`       | `--vs-color-foreground-alt` と同じ | 見出し番号・表ヘッダー・cross-ref の深緑 |
| `--vs--table-border-color-outer`         | `--vs-color-foreground-alt` × `--vs-color-background` 45% | 表の外枠の罫線色                         |
| `--vs-color-border-alt`   | `--vs-color-foreground-alt` × `--vs-color-background` 70% | 表の行罫の色                             |
| `--vs-color-background-alt`         | `--vs-color-foreground-alt` × `--vs-color-background` 90% | 表のゼブラ地色                           |
| `--vs-theme-centered-heading-line-graph--color-panel-bg`     | `--vs-color-foreground-alt` × `--vs-color-background` 95% | 図版パネルの地色                         |
| `--vs-page--border-color-top` | `--vs-color-foreground` × `--vs-color-background` 30% | 柱の下の罫線色                           |
| `--vs-theme-centered-heading-line-graph--section-columns`    | `2`                     | 節ごとに掛ける段数                       |
| `--vs-theme-centered-heading-line-graph--section-column-gap` | `7mm`                   | 段間                                     |
