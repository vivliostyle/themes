# @vivliostyle/theme-archivo-heading-two-column

左右2段組の企業テクニカルレポート向けテーマ。Archivo の番号付き見出しとアクセントカラー、原稿の題名を流す柱とノンブルを持つ本文ページを組む。

## 使い方

```css
@import '@vivliostyle/theme-archivo-heading-two-column';
```

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略。

| 変数                                  | 既定値                                 | 説明                                             |
| ------------------------------------- | -------------------------------------- | ------------------------------------------------ |
| `--vs-theme-archivo-heading-two-column--color-accent`            | `--vs-color-foreground-alt` と同じ | 見出し・表ヘッダー・マストヘッド罫のアクセント色 |
| `--vs-theme-archivo-heading-two-column--color-foreground-secondary`             | `--vs-color-foreground-alt` × `--vs-color-background` 25% | マストヘッド・キャプションの抑えた文字色         |
| `--vs-theme-archivo-heading-two-column--figure-wide-size-inline` | `100%`                                 | 段抜きの本文図の画像の幅                         |

## 原稿の書きかた

- 見出しの番号は自動で付く (h2 が「1.」、h3 が「1.1」)。Markdown の見出しには番号を書かない。番号を付けたくない見出し (謝辞・参考文献・書誌管理など) は `## References ##` のように閉じ `#` を付けてセクション化を止める。
- 柱には原稿の `h1` が流れる (`string-set`)。標題ページには出さない。
- 図は `![キャプション](fig.svg){#fig-id}`、本文からの参照は `<a href="#fig-id" data-ref="fig"></a>`。
- 表は `<figure class="datatable" id="tbl-id">` で包み、`<figcaption>` にキャプションを書く (番号は自動)。
- 節の参照は `<a href="#sec-id" data-ref="sec"></a>`、参考文献は `<ol class="cite-items">` + `<a href="#ref-id" data-ref="cite"></a>`。
- ディスプレイ数式は `<div class="equation" id="eq-id">` で包む。式番号はカウンタが付け、本文からは `<a href="#eq-id" data-ref="eq"></a>` で参照する。
- VFM は空要素の直後に置いた空白を落とすため、参照リンクの直後に語が続くときは `<a href="#sec-id" data-ref="sec"></a>&nbsp;describes` のように `&nbsp;` を置く。直後が句読点なら不要。
