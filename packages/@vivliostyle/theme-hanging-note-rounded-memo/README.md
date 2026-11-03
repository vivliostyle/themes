# @vivliostyle/theme-hanging-note-rounded-memo

ビジネスレポート向けテーマ。ベタヘッダーの対比表、グラフ、※注記のぶら下げリスト、角丸のメモを組み立てる。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-hanging-note-rounded-memo',
};
```

## 原稿の書き方

- 節見出し (`##`) には「1. 」から始まる連番が自動で付く。原稿に番号を書かない。番号を付けたくない見出しは `## 見出し ##` と閉じ `#` を付ける。
- 柱は左に frontmatter の `title`、右に原稿冒頭の `<p class="issuer">発行部署</p>` を流す。
- 表の列幅は「項目 / 数値 3 列 / 比率 / 合印」の6列を想定している。マイナス値のセルは `<span class="neg">▲17,800</span>` で囲むと淡オレンジ地になる。表・グラフの直後の段落は単位注記として小さく組まれる。
- 注記は `<ul class="remarks">` に `<li id="rm-payroll">…</li>` と書く。「※1」の連番は CSS が付ける。表の合印欄からは `<a href="#rm-payroll" data-ref="remark"></a>` と参照する。
- 図は単独行の `![キャプション](fig.svg)` で置くと「図1　」が自動で付く。本文からの参照は `<a href="#fig-id" data-ref="fig"></a>`。
- メモは `<aside class="note">` に見出し段落と箇条書きを入れる。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）・`--vs-color-background`（地色）・`--vs-color-foreground-alt`（アクセント色）の 3 色から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                   | 既定値                                | 説明                                                |
| -------------------------------------- | ------------------------------------- | --------------------------------------------------- |
| `--vs-color-background` | `#ffffff` | 紙面の地色 |
| `--vs-color-foreground-alt` | `#c05621` | アクセント色 |
| `--vs-font-family`                     | `'Noto Sans JP', sans-serif`          | 本文書体                                            |
| `--vs-color-foreground`                      | `#1f2428` | 本文の文字色                                        |
| `--vs-theme-hanging-note-rounded-memo--color-accent`             | `--vs-color-foreground-alt` と同じ | 見出し罫・警告表示のアクセント色 (バーントオレンジ) |
| `--vs-color-background-alt`        | `--vs-color-foreground-alt` × `--vs-color-background` 85% | マイナス値のセル・メモの淡色地                      |
| `--vs-page--border-color-top`               | `--vs-color-foreground` と同じ | 柱の下の太罫の色                                    |
| `--vs-theme-hanging-note-rounded-memo--remark-marker-size-inline` | `2.55em`                             | 注記のぶら下げ番号の幅                              |
| `--vs--table-border-color`             | `--vs-color-foreground` × `--vs-color-background` 80% | 表の罫線色                                          |
| `--vs--th-background-color`            | `--vs-color-foreground` と同じ | 表ヘッダーの地色                                    |
