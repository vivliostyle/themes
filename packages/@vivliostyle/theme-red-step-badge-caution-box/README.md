# @vivliostyle/theme-red-step-badge-caution-box

A5判・横組み2段の学校向け実験マニュアル (理科・化学) テーマ。赤を見出しバッジ・STEPバッジ・安全上の注意ボックスに限定反復し、器具一覧の表とピクトグラム付きの安全注意、番号付き操作手順を組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-red-step-badge-caution-box',
};
```

原稿の書き方:

- 1 実験 = 1 見出し (`# 実験の題`) で、`h1` ごとに改ページする。実験は `{.experiment}`、安全の手引きは `{.safety}` を付けると、赤バッジの番号 (`実験1` / `安全1`) がカウンタから振られる。番号を持たないページは `{data-badge="実験編"}` のようにバッジの文字を原稿に書く。
- 2段組は `h1` の節に掛かる。見出しとリード文 (`<p class="lead">`) は段抜きになる。1ページに収まらない分量を書いた場合は切り捨てず次ページへ流れる。
- 柱の左に出す章名は `<p class="chapter-name">第4章　酸と塩基</p>` と書く (紙面には出ない)。右にはその見出しが入る。
- 操作手順は `<div class="steps">` で包んだ番号付きリスト 1 つにまとめる。STEP バッジの数字はリストの順に振られる。
- 図は `![キャプション](fig.svg)` で、番号 (`図1`) はページごとに振り直される。もくじのページ番号は `<a href="#id" data-ref="page"></a>`、実験への参照は `[題](#id){data-ref=exp}` と書く。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）・`--vs-color-background`（地色）・`--vs-color-foreground-alt`（アクセント色）の 3 色から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                  | 既定値                       | 説明                                       |
| ------------------------------------- | ---------------------------- | ------------------------------------------ |
| `--vs-color-foreground` | `#1a1a1a` | 本文の文字色 |
| `--vs-color-background` | `#ffffff` | 紙面の地色 |
| `--vs-color-foreground-alt` | `#ff3333` | アクセント色 |
| `--vs-font-family`                    | `'Noto Sans JP', sans-serif` | 本文・見出しの書体                         |
| `--vs-theme-red-step-badge-caution-box--color-accent`            | `--vs-color-foreground-alt` と同じ | 見出しバッジ・STEPバッジ・注意ボックスの赤 |
| `--vs-color-background-alt`         | `--vs-color-foreground-alt` × `--vs-color-background` 90% | 安全上の注意ボックスの地色                 |
| `--vs-color-border`              | `--vs-color-foreground` × `--vs-color-background` 60% | ページ上部の区切り罫の色                   |
| `--vs-theme-red-step-badge-caution-box--color-rule-column`       | `--vs-color-foreground` × `--vs-color-background` 65% | 段間罫の色                                 |
| `--vs-color-border-alt`         | `--vs-color-foreground` × `--vs-color-background` 80% | 表の行罫の色                               |
| `--vs--th-text-color`             | `--vs-color-foreground` × `--vs-color-background` 30% | 表見出し行の抑え色                         |
| `--vs-theme-red-step-badge-caution-box--section-columns`         | `2`                          | 1ページに掛ける段数                        |
| `--vs-theme-red-step-badge-caution-box--section-column-gap`      | `8mm`                        | 段間                                       |
| `--vs-theme-red-step-badge-caution-box--step-figure-size-inline` | `18mm`                       | 手順に添える線画の幅                       |
| `--vs-theme-red-step-badge-caution-box--badge-counter-style`     | `decimal`                    | 実験・安全バッジの番号書式                 |
