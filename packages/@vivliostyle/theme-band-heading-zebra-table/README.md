# @vivliostyle/theme-band-heading-zebra-table

2段組の実用書本文ページ向けテーマ。色ベタ帯に白抜きした番号付き見出しと、色付きヘッダー行+淡色ゼブラのレッジャー表、外部SVGの棒グラフでデータを読み解く紙面を組む。

## 使い方

```css
@import '@vivliostyle/theme-band-heading-zebra-table';
```

## 原稿の書き方

- 1章 = 1ファイルとし、frontmatter に `class: chapter` を書く。章番号は base のドキュメントカウンタが数える。
- 節見出し (`##`) には「章番号.連番」が自動で付く。原稿に番号を書かない。番号を付けたくない見出しは `## 見出し ##` と閉じ `#` を付ける。
- 柱は原稿冒頭の `<header>…</header>` を running element として天に流す。1ファイルに1つ置く。
- 表は `<figure class="tbl" id="…">` に `<figcaption>` と Markdown の表を入れる。図版は `<figure id="…">` に `<img>` と `<figcaption>`。番号 (`Table 4.1` / `Fig. 4.1`) は CSS が付ける。
- 本文からの参照は `<a href="#tbl-funds" data-ref="tbl"></a>` / `data-ref="fig"` / `data-ref="sec"` と書く。参照の直後に語が続く場合は `&nbsp;` を挟む (VFM が空要素直後の空白を落とすため)。

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。

| 変数                                   | 既定値               | 説明                         |
| -------------------------------------- | -------------------- | ---------------------------- |
| `--vs-theme-band-heading-zebra-table--color-accent`             | `--vs-color-foreground-alt` と同じ | 見出し帯・表ヘッダーの基調色 |
