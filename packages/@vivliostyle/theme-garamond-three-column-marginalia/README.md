# @vivliostyle/theme-garamond-three-column-marginalia

3段組の記念誌・アンソロジー向けテーマ。EB Garamond のオールドスタイル・セリフ本文に、Libre Caslon Text の番号付き見出し、小口側の傍注、横罫主体のデータ表、脚注を密に組む。

## 使い方

```css
@import '@vivliostyle/theme-garamond-three-column-marginalia';
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
