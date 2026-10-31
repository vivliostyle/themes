# @vivliostyle/theme-three-column-card-table-syntax

TRPGのカードゲームルールブック向けテーマ。等幅フォントの3段組みで、カード効果対照表とコード風の構文ブロックを1章に組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-three-column-card-table-syntax',
};
```

## 原稿の書き方

- `# 章題` が 1 章。章はページ頭から始まり、中身は 3 段に自動で流れる。段への配分を原稿側で行う必要はない。
- 章番号は見出しの順序から自動で振られるので、見出しに「第○章」と書かない。番号を付けない扉には `{.front}`、付録には `{.appendix}` (`付録A`、`付録B`… と別系列で振られる) を付ける。3 段組・改ページは章の section に掛かるので、扉も閉じ `#` (`# 章題 #`) ではなくこの形で書く。
- 見出し右肩の欧文ラベルは `# <span class="meta">CH1 — WORLD</span>章題` のように**見出しの先頭**に置く (VFM のブロック属性は見出しの末尾が生 HTML だと解釈されないため)。表示はフロートで右端に寄る。
- 項目表の 1 列目は `<span class="card">記号</span><span>名称</span>`。章内の通し番号を振りたいときは、カードチップと番号欄を**空のまま**書くとカウンタが番号を入れる (`<span class="card"></span>` と空セル)。番号は章ごとに 1 から数え直し、章の途中で表が分かれても続く。
- 目次のページ数は `<a href="#章のid" data-ref="page"></a>` と書く。参照先が載るページ番号が入る。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）と `--vs-color-background`（地色）から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                  | 既定値                                                  | 説明                           |
| ------------------------------------- | ------------------------------------------------------- | ------------------------------ |
| `--vs-font-family`                    | `'IBM Plex Mono', ...`                                  | 本文書体 (等幅)                |
| `--vs--heading-font-family`           | `'M PLUS 1 Code', ...`                                  | 見出し書体                     |
| `--vs-section--h1-marker-content`  | `'第' counter(vs-counter-sec-h1) '章　'`                | 章番号の体裁                   |
| `--vs-theme-three-column-card-table-syntax--appendix-marker-content` | `'付録' counter(vs-counter-appendix, upper-alpha) '　'` | 付録番号の体裁                 |
| `--vs-theme-three-column-card-table-syntax--entry-marker-content`    | `counter(vs-counter-entry, decimal-leading-zero)`       | 項目番号の体裁                 |
| `--vs-theme-three-column-card-table-syntax--page-call-content`       | `target-counter(attr(href), page)`                      | `data-ref="page"` の参照文字列 |
| `--vs-color-foreground`                     | `#1a1a1a` | 本文・罫の基本色               |
| `--vs-color-background`               | `#fafaf7` | 地色                           |
| `--vs-color-border`              | `--vs-color-foreground` × `--vs-color-background` 75% | 段区切り罫・表罫の色           |
| `--vs-color-background-alt`              | `--vs-color-foreground` × `--vs-color-background` 95% | 表見出し行の背景色             |
| `--vs-theme-three-column-card-table-syntax--color-code-bg`           | `--vs-color-foreground` × `--vs-color-background` 95% | 構文ブロック (`pre`) の背景色  |
| `--vs-theme-three-column-card-table-syntax--color-card-border`       | `--vs-color-foreground` × `--vs-color-background` 55% | カードアイコンの枠色           |

## 見開きで組む

ノンブルは小口側の変数 `--vs-page--mbox-bottom-outside-content` で指定しているので、右ページでは右下、左ページでは左下に置かれる。片面で全ページ右下に揃えたい場合は `--vs-page--mbox-bottom-right-content: counter(page)` のように物理位置の変数で上書きする。
