# @vivliostyle/theme-garamond-three-column-marginalia

A4縦・3段組の学史アンソロジー (大学や学会の記念誌) 向けテーマ。EB Garamond のオールドスタイル・セリフ本文に、Libre Caslon Text の番号付き見出し、小口側の傍注、横罫主体のデータ表、脚注を密に組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-garamond-three-column-marginalia',
};
```

## 原稿の組み立て

md ファイル (ドキュメント) の種別を frontmatter の `class` で指定する。番号・柱・目次はすべてここから導出される。

| `class`      | 用途       | 見出しの構成                                               |
| ------------ | ---------- | ---------------------------------------------------------- |
| `chapter`    | 本章       | h1 = 章題 (柱と章番号になる)、h2 = 節題 (節ごとに改ページ) |
| `appendix`   | 付録       | h1 = 付録の表題 (A, B … と採番)                            |
| `title-page` | 標題紙     | 柱・ノンブルを出さない                                     |
| (なし)       | 前付・後付 | h1 = 表題 (番号は付かない)                                 |

章番号は `class: chapter` のドキュメント数で数える (theme-base の `vs-counter-chapter`)。節番号は「章番号.章内の連番」、図表番号は「章番号.連番」(付録では「付録記号.連番」) になるので、md には番号を書かない。

相互参照は空のアンカーに `data-ref` を付けて書く。

| `data-ref`                      | 出力例                   | 参照先            |
| ------------------------------- | ------------------------ | ----------------- |
| `sec`                           | `§ 3.2`                  | 節 (h2) の id     |
| `chapter`                       | `4`                      | 章 (h1) の id     |
| `appendix`                      | `B`                      | 付録 (h1) の id   |
| `fig` / `tbl`                   | `Fig. 3.1` / `Table 4.1` | 本章の図・表の id |
| `fig-appendix` / `tbl-appendix` | `Fig. A.1` / `Table B.1` | 付録の図・表の id |

```md
The figures gathered in <a href="#tbl-titles-published" data-ref="tbl"></a>&nbsp;tell the story.
```

VFM は空のインライン要素の直後の空白を落とすので、参照のあとに語が続くときは `&nbsp;` を置く (句読点が続くときは不要)。

目次は `<nav role="doc-toc">` の tight list で書き、ページ番号は theme-base が `target-counter()` で入れる。章の行には `class="toc-part"` を付ける。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）と `--vs-color-background`（地色）から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                    | 既定値                         | 説明                                             |
| --------------------------------------- | ------------------------------ | ------------------------------------------------ |
| `--vs-font-family`                      | `'EB Garamond', ...`           | 本文書体                                         |
| `--vs--heading-font-family`             | `'Libre Caslon Text', ...`     | 見出しの書体                                     |
| `--vs-color-foreground`                       | `#1a1a1a` | 本文・罫の墨色                                   |
| `--vs-color-background`                 | `#f7f4ec` | クリーム紙の地色                                 |
| `--vs-theme-garamond-three-column-marginalia--font-display`              | `'Libre Caslon Text', ...`     | 表題行の書体                                     |
| `--vs-font-family-alt`                 | `'Archivo', ...`               | 柱・ノンブル・図表キャプションの書体             |
| `--vs--th-background-color`            | `--vs-color-foreground` × `--vs-color-background` 55% | 表ヘッダーの地色                                 |
| `--vs--table-border-color`                | `--vs-color-foreground` × `--vs-color-background` 80% | 表の行罫の色                                     |
| `--vs-theme-garamond-three-column-marginalia--running-head-content`      | `env(pub-title)`               | 柱 (中央) の内容。章・付録では章題・付録名になる |
| `--vs-section--h1-marker-content`    | `'Chapter ' counter(...)`      | 章標 (h1 の前) の内容                            |
| `--vs-theme-garamond-three-column-marginalia--appendix-marker-content`   | `'Appendix ' counter(...)`     | 付録の表題 (h1 の前) の内容                      |
| `--vs-theme-garamond-three-column-marginalia--chapter-call-content`      | `target-counter(...)`          | `data-ref="chapter"` の参照文字列                |
| `--vs-theme-garamond-three-column-marginalia--appendix-call-content`     | `target-counter(...)`          | `data-ref="appendix"` の参照文字列               |
| `--vs-theme-garamond-three-column-marginalia--appendix-fig-call-content` | `'Fig. ' target-counter(...)`  | `data-ref="fig-appendix"` の参照文字列           |
| `--vs-theme-garamond-three-column-marginalia--appendix-tbl-call-content` | `'Table ' target-counter(...)` | `data-ref="tbl-appendix"` の参照文字列           |
