# @vivliostyle/theme-two-column-blue-sidenote

A4縦・左右2段組の学会拡張アブストラクト向けテーマ。Inter の番号付き見出しと青のアクセントカラー、サイドノート、段抜きの図表・疑似コードを組み合わせた高密度な HCI 系レイアウトを作る。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-two-column-blue-sidenote',
};
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）・`--vs-color-background`（地色）・`--vs-color-foreground-alt`（アクセント色）の 3 色から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                        | 既定値                         | 説明                                               |
| ------------------------------------------- | ------------------------------ | -------------------------------------------------- |
| `--vs-color-foreground` | `#20252b` | 本文の文字色 |
| `--vs-color-background` | `#ffffff` | 紙面の地色 |
| `--vs-color-foreground-alt` | `#0066cc` | アクセント色 |
| `--vs-font-family-alt`                  | `'Inter', ...`                 | 見出し・番号・キャプションの表示書体               |
| `--vs-sidenote--font-family`                       | `'IBM Plex Sans', ...`         | サイドノート・表内数値の書体                       |
| `--vs-theme-two-column-blue-sidenote--color-accent`                  | `--vs-color-foreground-alt` と同じ | 番号・短い水平罫・図の主系列に使うアクセント色     |
| `--vs--th-background-color`             | `--vs-color-foreground-alt` × `--vs-color-background` 85% | 表ヘッダーの淡色背景                               |
| `--vs-theme-two-column-blue-sidenote--color-foreground-secondary`                   | `--vs-color-foreground` × `--vs-color-background` 40% | サイドノート・キャプション・参考文献の抑えた文字色 |
| `--vs-color-border`                    | `--vs-color-foreground` × `--vs-color-background` 90% | サイドノートの罫・表の行罫の淡色                   |
| `--vs--pre-background-color`                    | `--vs-color-foreground-alt` × `--vs-color-background` 95% | 疑似コード (pre) の地色                            |
| `--vs-theme-two-column-blue-sidenote--figure-full-width-size-inline` | `100%`                         | 段抜き図 (`.full-width`) の画像の幅                |
| `--vs-sidenote--marker-content`             | `counter(vs-counter-sidenote)` | サイドノートの見出し番号                           |
| `--vs-sidenote--size-inline`                | `24mm`                         | サイドノートの幅                                   |

## 原稿の書きかた

- 見出しの番号は theme-base の `--vs-section--*` が付ける。Markdown の見出しには番号を書かない。番号を付けたくない見出し (References など) は `## References ##` のように閉じ `#` を付けてセクション化を止める。
- 図は `![キャプション](fig.svg){#fig-id}`、本文からの参照は `<a href="#fig-id" data-ref="fig"></a>`。段抜きにする図は `{#fig-id .full-width}` を付けるとページ天のページフロートに送られる。
- 表は `<figure class="tbl" id="tbl-id">` で包み、`<figcaption>` にキャプションを書く (番号は自動)。段抜きにするなら `class="tbl wide-table"`。
- 節の参照は `<a href="#sec-id" data-ref="sec"></a>`、参考文献は `<ol class="cite-items">` + `<a href="#ref-id" data-ref="cite"></a>`。
- サイドノートは `<aside class="sidenote">`。番号はカウンタが付ける。
- VFM は空要素の直後に置いた空白を落とすため、参照リンクの直後に語が続くときは `<a href="#sec-id" data-ref="sec"></a>&nbsp;describes` のように `&nbsp;` を置く。直後が句読点なら不要。
