# @vivliostyle/theme-red-band-grid-table

A4判・横組みのクレジットカード利用明細書テーマ。赤ベタ帯タイトルと請求概要の太枠ボックス、3段組の格子表で利用明細を密に組む実務帳票。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-red-band-grid-table',
};
```

明細は `<div class="cols">` の中に `<section class="col">` を並べて書く。`.cols` は段組で、区分ごとに段が改まり、1 段に収まらない明細は表頭を繰り返しながら次の段・次のページへ流れる。区分見出し（`<h2>`）の番号は base の `vs-counter-sec-h2` が振るので、原稿には書かない。

明細表は 1 列目を利用日、2 列目をご利用先、3 列目を金額として組む。`tbody` の最終行は小計として太罫で締められる。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）・`--vs-color-background`（地色）・`--vs-color-foreground-alt`（アクセント色）の 3 色から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                       | 既定値    | 説明                                     |
| ------------------------------------------ | --------- | ---------------------------------------- |
| `--vs-color-foreground` | `#1a1a1a` | 本文の文字色 |
| `--vs-color-background` | `#ffffff` | 紙面の地色 |
| `--vs-color-foreground-alt` | `#cc0000` | アクセント色 |
| `--vs-theme-red-band-grid-table--color-accent`                 | `--vs-color-foreground-alt` と同じ | タイトル帯・見出し帯・請求概要枠の基調色 |
| `--vs-color-border`                   | `--vs-color-foreground` × `--vs-color-background` 60% | 明細表の外枠・区切り罫の色               |
| `--vs-theme-red-band-grid-table--color-rule-strong`            | `--vs-color-foreground` × `--vs-color-background` 20% | 小計行の太罫の色                         |
| `--vs-color-background-alt`               | `--vs-color-foreground` × `--vs-color-background` 90% | 明細表ヘッダー行の地色                   |
| `--vs-theme-red-band-grid-table--color-bg-thead-subtle`        | `--vs-color-foreground` × `--vs-color-background` 95% | 囲み注記の表ヘッダー行の地色             |
| `--vs-theme-red-band-grid-table--ledger-columns`               | `3`       | 明細の段数                               |
| `--vs-theme-red-band-grid-table--ledger-column-gap`            | `4mm`     | 段間                                     |
| `--vs-theme-red-band-grid-table--ledger-date-width`            | `10mm`    | 明細表 1 列目（利用日）の幅              |
| `--vs-theme-red-band-grid-table--ledger-amount-width`          | `15mm`    | 明細表 3 列目（金額）の幅                |
| `--vs-theme-red-band-grid-table--ledger-description-font-size` | `5.7pt`   | 摘要列の文字サイズ                       |
| `--vs-theme-red-band-grid-table--note-inline-size`             | `106mm`   | 囲み注記の幅                             |
| `--vs-page--margin-inner`                  | `18mm`    | 綴じ側の余白                             |
