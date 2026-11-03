# @vivliostyle/theme-hanging-note-rounded-memo

ビジネスレポート向けテーマ。ベタヘッダーの対比表、グラフ、※注記のぶら下げリスト、角丸のメモを組み立てる。

## 使い方

```css
@import '@vivliostyle/theme-hanging-note-rounded-memo';
```

## 原稿の書き方

- 節見出し (`##`) には「1. 」から始まる連番が自動で付く。原稿に番号を書かない。番号を付けたくない見出しは `## 見出し ##` と閉じ `#` を付ける。
- 柱は左に frontmatter の `title`、右に原稿冒頭の `<p class="issuer">発行部署</p>` を流す。
- 表の列幅は「項目 / 数値 3 列 / 比率 / 合印」の6列を想定している。マイナス値のセルは `<span class="neg">▲17,800</span>` で囲むと淡オレンジ地になる。表・グラフの直後の段落は単位注記として小さく組まれる。
- 注記は `<ul class="remarks">` に `<li id="rm-payroll">…</li>` と書く。「※1」の連番は CSS が付ける。表の合印欄からは `<a href="#rm-payroll" data-ref="remark"></a>` と参照する。
- 図は単独行の `![キャプション](fig.svg)` で置くと「図1　」が自動で付く。本文からの参照は `<a href="#fig-id" data-ref="fig"></a>`。
- メモは `<aside class="note">` に見出し段落と箇条書きを入れる。

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。

| 変数                                   | 既定値                                | 説明                                                |
| -------------------------------------- | ------------------------------------- | --------------------------------------------------- |
| `--vs-theme-hanging-note-rounded-memo--color-accent`             | `--vs-color-foreground-alt` と同じ | 見出し罫・警告表示のアクセント色 (バーントオレンジ) |
| `--vs-theme-hanging-note-rounded-memo--remark-marker-size-inline` | `2.55em`                             | 注記のぶら下げ番号の幅                              |
