# @vivliostyle/theme-dense-ruled-table-drawing

A6 縦・完全モノクロのポケットサイズ製品データシートテーマ。Inter の見出しと IBM Plex Mono の数値で、外形寸法図・特性表・放電グラフを高密度に積む。

## 組み方

- 節番号は `## 見出し` から自動で振る。見出しに番号を書かない。本文から節を引くには `<a href="#id" data-ref="sec"></a>`。
- 紙面の頭は `<header><p class="headline">社名</p><p class="meta">品名 <strong>型番</strong></p></header>`。`.headline` が脚の社名になる。
- 管理番号は `<p class="docref">…</p>` に書く。版面には出ず、脚の右に入る。脚の中央はノンブル。
- 図は `<figure class="fig drawing">` (線図) / `<figure class="fig chart">` (グラフ) で包み、`<figcaption>` に短い説明を書く。「Fig. N」はカウンタが付ける。`alt` は読み上げ用の長い説明のままでよい。
- 表の欄は折り返さない。文章の入る欄は Markdown の左寄せ指定 (`:---`) で示すと、その欄だけ折り返して余りの幅を引き受ける。
- 参照の直後に語が続くときは `&nbsp;` を置く (VFM が空要素直後の空白を落とすため)。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-dense-ruled-table-drawing',
};
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                  | 既定値    | 説明                             |
| ------------------------------------- | --------- | -------------------------------- |
| `--vs-theme-dense-ruled-table-drawing--color-rule`              | `#111111` | マストヘッド・脚の罫色           |
| `--vs-theme-dense-ruled-table-drawing--color-table-head-fill`   | `#e6e6e6` | 表ヘッダーの地色                 |
| `--vs-theme-dense-ruled-table-drawing--fig-drawing-size-inline` | `72mm`    | 線図 (`figure.drawing`) の最大幅 |
| `--vs-theme-dense-ruled-table-drawing--fig-chart-size-inline`   | `95mm`    | グラフ (`figure.chart`) の最大幅 |
