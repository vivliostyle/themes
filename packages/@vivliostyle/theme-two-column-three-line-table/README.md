# @vivliostyle/theme-two-column-three-line-table

B5判・英語横組み2段組の国際学術論文集テーマ。番号付き見出し、右端に番号を振るディスプレイ数式、三線罫のデータ表、段下脚注を密に組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-two-column-three-line-table',
};
```

## 原稿の書き方

- 標題ブロックは `<div class="paper-head">` に `# 論文名 #` (閉じ `#`) と `p.byline` / `p.affil` / `p.abstract` / `p.terms` を入れる。段を横断する全幅の塊になる。
- `## 節題 {#sec-id}` / `### 小節題` — 番号は `vs-counter-sections` が「1.」「2.1」と自動で振る。謝辞・参考文献など番号を振らない見出しは閉じ `#` を付けて `## 見出し ##` と書く。
- 節への参照は `<a href="#sec-id" data-ref="sec"></a>` → 「Section 2」「Section 3.3」。
- 表は `<figure class="tbl" id="tbl-id">` + `<figcaption>` に Markdown 表を入れる。見出しは「TABLE 1.」が自動で付き、参照は `<a href="#tbl-id" data-ref="tbl"></a>`。
- ディスプレイ数式は `<div class="equation" id="eq-id">` に入れる。番号は自動で右端に付き、参照は `<a href="#eq-id" data-ref="eq"></a>`。
- 参考文献は `<ol class="cite-items">` の `<li id="ref-N">`。本文の引用は `<a href="#ref-N" data-ref="cite"></a>` → 「[N]」。
- 空要素の参照の直後 (および Markdown 表のセル内では直前) に語が続く場合は、VFM が空白を落とすため `&nbsp;` を置く。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                      | 既定値                      | 説明                           |
| ----------------------------------------- | --------------------------- | ------------------------------ |
| `--vs-theme-two-column-three-line-table--color-accent`                | `#2c3e50`                   | 見出し・表の太罫・柱罫の紺色   |
| `--vs-theme-two-column-three-line-table--color-rule`                  | `#8a9199`                   | 表のヘッダ罫・脚注区切り罫の色 |
| `--vs-theme-two-column-three-line-table--color-rule-soft`             | `#d5d9dd`                   | 表の行間の淡い罫の色           |
| `--vs-theme-two-column-three-line-table--font-math`                   | `'STIX Two Math', ...`      | MathML 数式の書体              |
| `--vs-theme-two-column-three-line-table--running-publication`         | `env(pub-title)`            | 天の柱の左に出す誌名・巻号     |
| `--vs-theme-two-column-three-line-table--equation-marker-content`     | `'(' counter(…) ')'`        | 数式番号の表記                 |
| `--vs-theme-two-column-three-line-table--equation-call-content`       | `'(' target-counter(…) ')'` | 数式参照の表記                 |
| `--vs-theme-two-column-three-line-table--equation-marker-size-inline` | `6mm`                       | 数式番号のために右に空ける幅   |
| `--vs-font-family`                        | `'Noto Sans', ...`          | 本文書体                       |
| `--vs-color-foreground`                         | `#1a1a1a`                   | 本文の文字色                   |

天の柱の右は各原稿の frontmatter `title`、ノンブルは `counter(page)` から生成する。
