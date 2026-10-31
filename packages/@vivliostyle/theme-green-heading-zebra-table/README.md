# @vivliostyle/theme-green-heading-zebra-table

レター判・縦組み2段組の金融書・実用書本文ページ向けテーマ。ダークグリーンの色ベタ帯に白抜きした番号付き見出しと、緑ヘッダー行+淡緑ゼブラのレッジャー表、外部SVGの棒グラフでデータを読み解く紙面を組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-green-heading-zebra-table',
};
```

## 原稿の書き方

- 1章 = 1ファイルとし、frontmatter に `class: chapter` を書く。章番号は base のドキュメントカウンタが数える。
- 節見出し (`##`) には「章番号.連番」が自動で付く。原稿に番号を書かない。番号を付けたくない見出しは `## 見出し ##` と閉じ `#` を付ける。
- 柱は原稿冒頭の `<header>…</header>` を running element として天に流す。1ファイルに1つ置く。
- 表は `<figure class="tbl" id="…">` に `<figcaption>` と Markdown の表を入れる。図版は `<figure id="…">` に `<img>` と `<figcaption>`。番号 (`Table 4.1` / `Fig. 4.1`) は CSS が付ける。
- 本文からの参照は `<a href="#tbl-funds" data-ref="tbl"></a>` / `data-ref="fig"` / `data-ref="sec"` と書く。参照の直後に語が続く場合は `&nbsp;` を挟む (VFM が空要素直後の空白を落とすため)。
- 途中の章から始まる抜粋を組むには、原稿側の CSS で `--vs-document-first-page-counter-reset: vs-counter-chapter <開始章 - 1>` を指定する。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）・`--vs-color-background`（地色）・`--vs-color-foreground-alt`（アクセント色）の 3 色から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                   | 既定値               | 説明                         |
| -------------------------------------- | -------------------- | ---------------------------- |
| `--vs-color-foreground` | `#1c1c1c` | 本文の文字色 |
| `--vs-color-background` | `#f7f5f0` | 紙面の地色 |
| `--vs-color-foreground-alt` | `#1a472a` | アクセント色 |
| `--vs-theme-green-heading-zebra-table--color-accent`             | `--vs-color-foreground-alt` と同じ | 見出し帯・表ヘッダーの基調色 |
| `--vs-color-background-alt`        | `--vs-color-foreground-alt` × `--vs-color-background` 90% | 表のゼブラ縞の淡色           |
| `--vs-color-border`               | `--vs-color-foreground` × `--vs-color-background` 75% | 段間罫・表罫の色             |
| `--vs-font-family-alt`             | `'Zilla Slab', ...`  | 表・図版・キャプションの書体 |
| `--vs--figure-item-size-inline` | `94%`                | 図版の段幅に対する幅         |
| `--vs-font-family`                     | `'Roboto Slab', ...` | 本文・見出しの書体           |
| `--vs-columns`                         | `2`                  | 段数                         |
| `--vs--table-border-color`             | `--vs-color-border` と同じ | レッジャー表の罫色           |

## 見開きで組む

ノンブルは小口側の変数 `--vs-page--mbox-bottom-outside-content` で指定しているので、右ページでは右下、左ページでは左下に置かれる。片面で全ページ右下に揃えたい場合は `--vs-page--mbox-bottom-right-content: counter(page)` のように物理位置の変数で上書きする。
