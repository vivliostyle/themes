# @vivliostyle/theme-orange-black-header-table

A4縦の予実管理レポート向けテーマ。バーントオレンジのアクセントカラーで、黒ベタヘッダーの予実対比表、差異推移グラフ、※注記のぶら下げリスト、角丸の対策メモを組み立てる。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-orange-black-header-table',
};
```

## 原稿の書き方

- 節見出し (`##`) には「1. 」から始まる連番が自動で付く。原稿に番号を書かない。番号を付けたくない見出しは `## 見出し ##` と閉じ `#` を付ける。
- 柱は左に frontmatter の `title`、右に原稿冒頭の `<p class="issuer">発行部署</p>` を流す。
- 予実対比表は「項目 / 予算 / 実績 / 差異 / 差異率 / 合印」の6列を想定する。予算超過のセルは `<span class="neg">▲17,800</span>` で囲むと淡オレンジ地になる。表・グラフの直後の段落は単位注記として小さく組まれる。
- 注記は `<ul class="remarks">` に `<li id="rm-payroll">…</li>` と書く。「※1」の連番は CSS が付ける。表の合印欄からは `<a href="#rm-payroll" data-ref="remark"></a>` と参照する。
- 図は単独行の `![キャプション](fig.svg)` で置くと「図1　」が自動で付く。本文からの参照は `<a href="#fig-id" data-ref="fig"></a>`。
- 対策メモは `<aside class="note">` に見出し段落と箇条書きを入れる。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                   | 既定値                                | 説明                                                |
| -------------------------------------- | ------------------------------------- | --------------------------------------------------- |
| `--vs-font-family`                     | `'Noto Sans JP', sans-serif`          | 本文書体                                            |
| `--vs-color-foreground`                      | `#1f2428`                             | 本文の文字色                                        |
| `--vs-theme-orange-black-header-table--color-accent`             | `#c05621`                             | 見出し罫・警告表示のアクセント色 (バーントオレンジ) |
| `--vs-theme-orange-black-header-table--color-accent-tint`        | `#fbe9df`                             | 予算超過セル・対策メモの淡色地                      |
| `--vs-theme-orange-black-header-table--color-rule`               | `#1f2428`                             | 柱の下の太罫の色                                    |
| `--vs-theme-orange-black-header-table--table-label-size-inline`  | `21%`                                 | 予実対比表の項目列の幅                              |
| `--vs-theme-orange-black-header-table--table-value-size-inline`  | `18%`                                 | 予算・実績・差異列の幅                              |
| `--vs-theme-orange-black-header-table--table-rate-size-inline`   | `17%`                                 | 差異率列の幅                                        |
| `--vs-theme-orange-black-header-table--table-remark-size-inline` | `8%`                                  | 合印列の幅                                          |
| `--vs-theme-orange-black-header-table--remark-marker-content`    | `'※' counter(vs-counter-remark) '　'` | 注記のぶら下げ番号                                  |
| `--vs--table-border-color`             | `#c9ccd0`                             | 表の罫線色                                          |
| `--vs--th-background-color`            | `#24272b`                             | 表ヘッダーの地色                                    |
