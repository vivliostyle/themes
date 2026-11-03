# @vivliostyle/theme-wide-margin-speaker-indent

1段組の技術同人誌向けテーマ。対談形式のページを話者名のぶら下げインデントで組み、上下細罫のプルクオートやコードブロックを差し込める。

## 原稿の書き方

- 1 章 = 1 ファイルとし、frontmatter に `class: chapter` を書く。base のドキュメントカウンタ `vs-counter-chapter` が章番号になり、`# 章題 {#id}` の前に出る。章以外のファイル (表紙・もくじ・はじめに・奥付) には書かない。
- 柱には各ファイルの frontmatter の `title`、ノンブルには通し番号が出る。`title` に章番号を書き足す必要はない。
- 対談は `<div class="dialogue">` の中に `<span class="speaker">話者</span>発言` の段落を並べる。編集部の補足は `<div class="note">`、プルクオートは引用 (`>`) で書く。
- 章への参照は `<a href="04-night-1.html#id" data-ref="chap"></a>` (「1　章題」と展開)、番号だけなら `data-ref="chap-num"`。節への参照は `data-ref="sec"` (見出し名を `target-text()` で引く)。もくじのページ番号は base の toc.css が `target-counter()` で入れるので手書きしない。

## 使い方

```css
@import '@vivliostyle/theme-wide-margin-speaker-indent';
```
