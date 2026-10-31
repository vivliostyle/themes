# @vivliostyle/theme-side-border-heading-math

A4判1段組の高等数学ジャーナル向け (Elsevier / Advances in Mathematics 風)。節見出しの左に太い群青の縦バー、外余白のサイドノート、中央揃えの別行立て数式、番号をぶら下げた参考文献を配置する。節番号・定理番号・式番号・サイドノートの符号・引用番号はすべてカウンタが付ける。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-side-border-heading-math',
};
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）・`--vs-color-background`（地色）・`--vs-color-foreground-alt`（アクセント色）の 3 色から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                  | 既定値                             | 説明                                    |
| ------------------------------------- | ---------------------------------- | --------------------------------------- |
| `--vs-color-foreground` | `#1a1a1a` | 本文の文字色 |
| `--vs-color-background` | `#fdfdfb` | 紙面の地色 |
| `--vs-color-foreground-alt` | `#1e40af` | アクセント色 |
| `--vs-font-family`                    | `'STIX Two Text', ...`             | 本文書体                                |
| `--vs--heading-font-family`           | `'Source Serif 4', ...`            | 見出し・定理ラベル・柱の表示書体        |
| `--vs-theme-side-border-heading-math--accent-color`                   | `--vs-color-foreground-alt` と同じ | 節見出しの縦バー・定理ラベルの群青色    |
| `--vs-theme-side-border-heading-math--color-foreground-secondary`               | `--vs-color-foreground` × `--vs-color-background` 30% | サイドノート・脚注本文の色              |
| `--vs-math--font-family`              | `'STIX Two Math', ...`             | 数式の書体                              |
| `--vs-page--margin-inner`             | `42mm`                             | 物理左側 (サイドノート列) の余白        |
| `--vs-page--margin-outer`             | `20mm`                             | 物理右側の余白                          |
| `--vs-theme-side-border-heading-math--theorem-label-*`         | `'Theorem'` / `'Lemma'` …          | 定理環境の種別ラベル (言語の差し替え用) |
| `--vs-theme-side-border-heading-math--theorem-number-content`  | `counter(vs-counter-sec-h2) '.' …` | 定理番号の組み立て (既定は「節.通番」)  |
| `--vs-theme-side-border-heading-math--equation-marker-content` | `'(' … ')'`                        | 別行立て数式の右端に出す式番号          |
| `--vs-theme-side-border-heading-math--sidenote-marker-content` | `'(' counter(…, lower-alpha) ')'`  | サイドノートの符号                      |
| `--vs-theme-side-border-heading-math--proof-qed-content`       | `'\2003\25A1'`                     | 証明の末尾に出す記号                    |

## 原稿の書きかた

- 節番号は theme-base の `--vs-section--*` が付ける (h2 が「1」、h3 が「1.1」)。Markdown の見出しには番号を書かない。
- 論題は閉じ `#` を付けた `# 論題 #` で書く (閉じ `#` のない `#` はセクション化して後続をすべて包んでしまうため)。番号を付けたくない後付けの見出し (謝辞・参考文献など) も同じく `## References ##` と書く。こうすると節番号は本文の `##` から 1 で始まる。
- 柱には `h1` の論題が `string-set` で流れ、ノンブルはサイドノート列と同じ側の地に出る。
- 標題まわりは `<div class="paper-head">` の中に `h1` / `<p class="byline">` / `<p class="affil">` / `<div class="abstract">` / `<p class="kw">` / `<p class="msc">` を置く。
- 定理環境は `<div class="theorem">` (定理・主張は斜体)。種別は `lemma` / `proposition` / `corollary` / `definition` / `example` / `remark` / `question` を足す (`definition` 以下は立体で組む)。名前付きの環境は本文の先頭に `<span class="thmname">名前</span>` を置く。番号は「節.通番」で自動採番され、参照は `Theorem <a href="#thm-id" data-ref="thm"></a>`。
- 番号を持たない仮定の並びは `<div class="hypotheses">`。
- 証明は `<div class="proof">`、末尾に □ を出すなら `qed` を足す。対象を明示するときは先頭に `<span class="proofof">Proposition <a href="#id" data-ref="thm"></a></span>` を置く。別行立ての数式を挟んで証明が続くときは、後半の `<div class="proof continued">` にすると冒頭のラベルを繰り返さない。
- 別行立ての数式は `<div class="equation" id="eq-id">` で `$$…$$` を包む。式番号はカウンタが付け、本文からは `<a href="#eq-id" data-ref="eq"></a>` で参照する。
- サイドノートは `<aside class="sidenote">`。符号は文書を通した `(a)` `(b)` … が自動で付く。
- 脚注は `<span class="footnote">…</span>` でページ下部に落ちる。
- 節の参照は `<a href="#sec-id" data-ref="sec"></a>` (「§2.1」)。参考文献は `<ol class="cite-items">` + `<li id="ref-id">`、本文からは `<a href="#ref-id" data-ref="cite"></a>` (「[3]」)。所在を添えるときは番号だけを出す `[<a href="#ref-id" data-ref="citenum"></a>, ch. 4]`。
- VFM は空要素の直後に置いた空白を落とすため、参照リンクの直後に語が続くときは `<a href="#thm-id" data-ref="thm"></a>&nbsp;shows` のように `&nbsp;` を置く。直後が句読点なら不要。
