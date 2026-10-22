# @vivliostyle/theme-hanging-heading-dropcap-marginalia

四六判 (127×188mm) の単行本風コンサルティングガイド向けテーマ。ハンギング見出しと3行取りドロップキャップ、ブラウン罫付きの傍注を配した非対称2カラムのレイアウトで、落ち着いたクリーム紙の親書調に仕上げる。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-hanging-heading-dropcap-marginalia',
};
```

## 原稿の書き方

- 1章 = 1ファイルとし、frontmatter に `class: chapter` を書く。章見出し (`#`) には「第N章　」、節見出し (`##`) には「N.n　」が自動で付く。原稿に番号を書かない。
- 柱は「第N章　章題」を自動で組む。章題は `#` 見出しから取る (`string-set`)。
- 傍注は本文の参照箇所の直前か直後に `<aside class="sidenote">…</aside>` を置く。左の傍注帯へ浮き、本文が回り込む。本文側の合印は `<sup>※</sup>` で示す。
- 図は `![キャプション](fig.svg){#fig-process}`、表は `<figure class="tbl" id="…">` に `<figcaption>` と Markdown の表を入れる。番号 (「図2-1　」「表2-1　」) は CSS が付ける。
- 本文からの参照は `<a href="#tbl-priority" data-ref="tbl"></a>` / `data-ref="fig"` と書く。参照の直後に欧文が続く場合は `&nbsp;` を挟む (VFM が空要素直後の空白を落とすため)。
- 章末のチェックリストは `<ul class="checklist">` にすると合印が白四角になる。
- 途中の章から始まる抜粋を組むには、原稿側の CSS で `--vs-document-first-page-counter-reset: vs-counter-chapter <開始章 - 1>` を指定する。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                   | 既定値                 | 説明                                           |
| -------------------------------------- | ---------------------- | ---------------------------------------------- |
| `--vs-font-family`                     | `'Noto Serif JP', ...` | 本文書体                                       |
| `--vs-color-foreground`                      | `#2b2520`              | 本文の文字色                                   |
| `--vs-color-background`                | `#faf7f2`              | 地色 (クリーム紙)                              |
| `--vs-theme-hanging-heading-dropcap-marginalia--color-accent`             | `#5a4a42`              | 見出し・ドロップキャップ・傍注罫のアクセント色 |
| `--vs-theme-hanging-heading-dropcap-marginalia--color-muted`              | `#8a7a70`              | 傍注の文字色・柱の色                           |
| `--vs-theme-hanging-heading-dropcap-marginalia--color-rule`               | `#b3a396`              | 柱の下の罫の色                                 |
| `--vs-theme-hanging-heading-dropcap-marginalia--sidenote-size-inline`     | `24mm`                 | 傍注帯の幅                                     |
| `--vs-theme-hanging-heading-dropcap-marginalia--sidenote-gap`             | `4mm`                  | 傍注帯と本文の間隔                             |
| `--vs-theme-hanging-heading-dropcap-marginalia--heading-hang-size-inline` | `10mm`                 | ハンギング見出しの突き出し量                   |
| `--vs--figure-item-size-inline`        | `80%`                  | フロー図の幅                                   |

## 見開きで組む

柱はノド側の `--vs-page--mbox-top-inside-content`、ノンブルは小口側の `--vs-page--mbox-bottom-outside-content` で指定しているので、左右のページで自動的に入れ替わる。片面で位置を固定したい場合は `--vs-page--mbox-top-left-content` / `--vs-page--mbox-bottom-right-content` のように物理位置の変数で上書きする。
