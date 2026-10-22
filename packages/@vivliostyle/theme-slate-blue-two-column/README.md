# @vivliostyle/theme-slate-blue-two-column

A4縦・左右2段組の企業テクニカルレポート向けテーマ。Archivo の番号付き見出しとダークスレートブルーのアクセント、原稿の題名を流す柱とノンブルを持つ本文ページを組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-slate-blue-two-column',
};
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                  | 既定値                                 | 説明                                             |
| ------------------------------------- | -------------------------------------- | ------------------------------------------------ |
| `--vs-theme-slate-blue-two-column--font-display`            | `'Archivo', ...`                       | 見出し・図表番号の表示書体                       |
| `--vs-theme-slate-blue-two-column--color-accent`            | `#2c3e50`                              | 見出し・表ヘッダー・マストヘッド罫のアクセント色 |
| `--vs-theme-slate-blue-two-column--color-rule`              | `#c9d3dd`                              | 表罫・図版の枠線色                               |
| `--vs-theme-slate-blue-two-column--color-muted`             | `#5c6b7a`                              | マストヘッド・キャプションの抑えた文字色         |
| `--vs-theme-slate-blue-two-column--figure-wide-size-inline` | `100%`                                 | 段抜きの本文図の画像の幅                         |
| `--vs-theme-slate-blue-two-column--equation-marker-content` | `'(' counter(vs-counter-eq) ')'` | ディスプレイ数式の右端に出す式番号               |
| `--vs-theme-slate-blue-two-column--equation-call-content`   | `'(' target-counter(…) ')'`            | 本文から式を参照したときの表示                   |

## 原稿の書きかた

- 見出しの番号は theme-base の `--vs-section--*` が付ける (h2 が「1.」、h3 が「1.1」)。Markdown の見出しには番号を書かない。番号を付けたくない見出し (謝辞・参考文献・書誌管理など) は `## References ##` のように閉じ `#` を付けてセクション化を止める。
- 柱には原稿の `h1` が流れる (`string-set`)。標題ページには出さない。
- 図は `![キャプション](fig.svg){#fig-id}`、本文からの参照は `<a href="#fig-id" data-ref="fig"></a>`。
- 表は `<figure class="datatable" id="tbl-id">` で包み、`<figcaption>` にキャプションを書く (番号は自動)。
- 節の参照は `<a href="#sec-id" data-ref="sec"></a>`、参考文献は `<ol class="cite-items">` + `<a href="#ref-id" data-ref="cite"></a>`。
- ディスプレイ数式は `<div class="equation" id="eq-id">` で包む。式番号はカウンタが付け、本文からは `<a href="#eq-id" data-ref="eq"></a>` で参照する。
- VFM は空要素の直後に置いた空白を落とすため、参照リンクの直後に語が続くときは `<a href="#sec-id" data-ref="sec"></a>&nbsp;describes` のように `&nbsp;` を置く。直後が句読点なら不要。
