# @vivliostyle/theme-hanging-heading-dropcap-marginalia

単行本風レポート向けテーマ。ハンギング見出しと3行取りドロップキャップ、罫付きの傍注を配した非対称2カラムのレイアウトで、落ち着いた親書調に仕上げる。

## 使い方

```css
@import '@vivliostyle/theme-hanging-heading-dropcap-marginalia';
```

## 原稿の書き方

- 1章 = 1ファイルとし、frontmatter に `class: chapter` を書く。章見出し (`#`) には「第N章　」、節見出し (`##`) には「N.n　」が自動で付く。原稿に番号を書かない。
- 柱は「第N章　章題」を自動で組む。章題は `#` 見出しから取る (`string-set`)。
- 傍注は本文の参照箇所の直前か直後に `<aside class="sidenote">…</aside>` を置く。左の傍注帯へ浮き、本文が回り込む。本文側の合印は `<sup>※</sup>` で示す。
- 図は `![キャプション](fig.svg){#fig-process}`、表は `<figure class="tbl" id="…">` に `<figcaption>` と Markdown の表を入れる。番号 (「図2-1　」「表2-1　」) は CSS が付ける。
- 本文からの参照は `<a href="#tbl-priority" data-ref="tbl"></a>` / `data-ref="fig"` と書く。参照の直後に欧文が続く場合は `&nbsp;` を挟む (VFM が空要素直後の空白を落とすため)。
- 章末のチェックリストは `<ul class="checklist">` にすると合印が白四角になる。

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略。

| 変数                                   | 既定値                 | 説明                                           |
| -------------------------------------- | ---------------------- | ---------------------------------------------- |
| `--vs-theme-hanging-heading-dropcap-marginalia--color-accent`             | `--vs-color-foreground` × `--vs-color-background` 20% | 見出し・ドロップキャップ・傍注罫のアクセント色 |
| `--vs-theme-hanging-heading-dropcap-marginalia--sidenote-gutter` | `calc(var(--vs-sidenote--size-inline) + 4mm)` | 傍注帯の幅と本文との間隔の和 (本文を内側へ寄せる量) |
