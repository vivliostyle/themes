# @vivliostyle/theme-mono-graph-comparison-table

A4判モノクロ2段組のオーディオ機器レビュー誌テーマ。全幅の周波数特性グラフ、2段組の測定解説、コラム跨ぎの仕様比較表と測定条件ボックスを配し、細めのゴシック体で計測データの視認性を優先した紙面を作る。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-mono-graph-comparison-table',
};
```

## 原稿の書き方

`# 記事名` で 1 記事。記事は改ページで始まる。柱に流す誌名は原稿の先頭に
`<p class="running-title">` で置く。図番号は base のカウンタが付けるので原稿には書かない。

```md
<p class="running-title">誌名</p>

# 記事名

<p class="meta"><b class="stamp-area">分類</b><span>型式&#8195;/&#8195;<span class="price">価格</span></span></p>

![全幅で置くグラフの説明](fig.svg){#fig-id .wide}

<div class="body">

リード段落。図の参照は <a href="#fig-id" data-ref="fig"></a> と書く。

## 小見出し ##

</div>

<div class="bottom">

<aside class="conditions">
<h2>測定条件</h2>

（等幅で組む測定条件をコードブロックで書く）

</aside>

| 項目 | 値  |
| ---- | --- |

</div>
```

- 全幅で置くグラフは画像に `.wide` を付ける。付けないものは段の中に収まる。
- `<div class="body">` が 2 段組の範囲。段抜きを伴う multicol は段の均しが効かないため、2 段組はこのラッパにだけ掛けている。
- `<div class="bottom">` の中では測定条件箱を表より **前** に書く (箱を右へ回り込ませるため)。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）と `--vs-color-background`（地色）から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                    | 既定値                       | 説明                               |
| --------------------------------------- | ---------------------------- | ---------------------------------- |
| `--vs-color-background` | `#ffffff` | 紙面の地色 |
| `--vs-font-family`                      | `'Noto Sans JP', sans-serif` | 本文の細字ゴシック書体             |
| `--vs--monospace-font-family`           | `'IBM Plex Mono', ...`       | 数値・軸ラベル・測定条件の等幅書体 |
| `--vs-color-foreground`                       | `#1a1a1a` | 本文・罫の墨色                     |
| `--vs-color-background-alt`     | `--vs-color-foreground` × `--vs-color-background` 90% | 表ヘッダ・1列目の地色              |
| `--vs-theme-mono-graph-comparison-table--color-table-zebra-bg`      | `--vs-color-foreground` × `--vs-color-background` 95% | 表の縞地 (偶数行)                  |
| `--vs-color-border-alt`           | `--vs-color-foreground` × `--vs-color-background` 60% | 2段組の中央罫の色                  |
| `--vs-theme-mono-graph-comparison-table--color-reverse-bg`          | `--vs-color-foreground` と同じ | 見出しスタンプの反転地色           |
| `--vs-theme-mono-graph-comparison-table--columns`                   | `2`                          | 解説本文の段数                     |
| `--vs-theme-mono-graph-comparison-table--column-gap`                | `10mm`                       | 段間                               |
| `--vs-theme-mono-graph-comparison-table--figure-size-inline-column` | `78mm`                       | 段中グラフの最大幅                 |
| `--vs-theme-mono-graph-comparison-table--conditions-size-inline`    | `44mm`                       | 測定条件箱の幅                     |
| `--vs-figure--marker-content`     | `'図' counter(...) '　'`     | 図番号の書式                       |
