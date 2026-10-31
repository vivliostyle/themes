# @vivliostyle/theme-dense-serif-roman-numeral

PRL (Physical Review Letters) 風のレター判・墨一色の物理速報論文テーマ。STIX Two Text の高密度セリフ2段組に、中央揃えの標題ブロック、ローマ数字のセンター見出し、段の右端に式番号を置くディスプレイ数式、モノクロ図版を組む。節番号・式番号・図番号・引用番号はすべてカウンタが付ける。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-dense-serif-roman-numeral',
};
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                  | 既定値                                      | 説明                             |
| ------------------------------------- | ------------------------------------------- | -------------------------------- |
| `--vs-color-background` | `#ffffff` | 紙面の地色 |
| `--vs-font-family`                    | `'STIX Two Text', 'Times New Roman', serif` | 本文書体                         |
| `--vs-font-size`                      | `8.3pt`                                     | 本文サイズ (高密度な誌面)        |
| `--vs-color-foreground`                     | `#111111` | 本文・罫の墨色                   |
| `--vs-column-gap`                     | `6mm`                                       | 2 段の間隔                       |
| `--vs--h1-font-size`                  | `11.8pt`                                    | 論文タイトルのサイズ             |
| `--vs--h2-font-size`                  | `8pt`                                       | ローマ数字センター見出しのサイズ |
| `--vs-section--counter-style`         | `upper-roman`                               | 節番号のスタイル                 |
| `--vs--p-text-indent`                 | `3.5mm`                                     | 段落先頭の字下げ量               |
| `--vs--figure-item-size-inline`       | `84%`                                       | 図版の幅                         |
| `--vs-theme-dense-serif-roman-numeral--equation-marker-content` | `'(' counter(…) ')'`                        | 段の右端に出す式番号             |
| `--vs-figure--marker-content`   | `'FIG. ' counter(…) '. '`                   | 図題の先頭に出す図番号           |

## 原稿の書きかた

- 節番号は theme-base の `--vs-section--*` が付ける (h2 が「I.」「II.」)。Markdown の見出しには番号を書かず、大文字化も CSS に任せる。
- 論題は閉じ `#` を付けた `# 論題 #` で書く (閉じ `#` のない `#` はセクション化して後続をすべて包んでしまうため)。番号を付けたくない後付けの見出し (謝辞など) も同じく `## Acknowledgments ##` と書く。
- 標題まわりは `<div class="titleblock">` の中に `<p class="masthead">` / `h1` / `<p class="byline">` / `<p class="affil">` / `<p class="received">` / `<div class="abstract">` を置く。このブロックだけが段抜きになり、以降が 2 段に流れる。
- 別行立ての数式は `<div class="equation" id="eq-id">` で `$$…$$` を包む。式番号は文書を通した連番で、本文からは `<a href="#eq-id" data-ref="eq"></a>` (「Eq. (4)」) で参照する。
- 図は `<figure id="fig-id">` + `<img>` + `<figcaption>`。図番号は自動で、参照は `<a href="#fig-id" data-ref="fig"></a>` (「Fig. 1」)。図題に数式を書く場合は `<figcaption>` の中を空行で区切って段落として書く (1 行で書くと VFM が `$…$` を処理しない)。
- 節の参照は `<a href="#sec-id" data-ref="sec"></a>` (「Sec. IV」)。
- 参考文献は `<ol class="cite-items">` + `<li id="ref-id">`、本文からは `<a href="#ref-id" data-ref="cite"></a>` (「[5]」)。「[6,7]」「[1–4]」のように連ねるときは番号だけを出す `data-ref="citenum"` を使い、括弧と区切りは原稿側で書く。
- VFM は空要素の直後に置いた空白を落とすため、参照リンクの直後に語が続くときは `<a href="#fig-id" data-ref="fig"></a>&nbsp;shows` のように `&nbsp;` を置く。直後が句読点なら不要。
