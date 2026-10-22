# @vivliostyle/theme-wide-margin-speaker-indent

A4判・1段組の技術同人誌向けテーマ。対談形式のページを話者名のぶら下げインデントで組み、上下細罫のプルクオートやコードブロックを差し込める。

## 原稿の書き方

- 1 章 = 1 ファイルとし、frontmatter に `class: chapter` を書く。base のドキュメントカウンタ `vs-counter-chapter` が章番号になり、`# 章題 {#id}` の前に出る。章以外のファイル (表紙・もくじ・はじめに・奥付) には書かない。
- 柱には各ファイルの frontmatter の `title`、ノンブルには通し番号が出る。`title` に章番号を書き足す必要はない。
- 対談は `<div class="dialogue">` の中に `<span class="speaker">話者</span>発言` の段落を並べる。編集部の補足は `<div class="note">`、プルクオートは引用 (`>`) で書く。
- 章への参照は `<a href="04-night-1.html#id" data-ref="chap"></a>` (「1　章題」と展開)、番号だけなら `data-ref="chap-num"`。節への参照は `data-ref="sec"` (見出し名を `target-text()` で引く)。もくじのページ番号は base の toc.css が `target-counter()` で入れるので手書きしない。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-wide-margin-speaker-indent',
};
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                          | 既定値                 | 説明                                   |
| ----------------------------- | ---------------------- | -------------------------------------- |
| `--vs-font-family`            | `'Noto Sans JP', ...`  | 本文書体                               |
| `--vs--monospace-font-family` | `'IBM Plex Mono', ...` | コードブロックの書体                   |
| `--vs-color-foreground`             | `#1a1a1a`              | 本文色                                 |
| `--vs-theme-wide-margin-speaker-indent--color-muted`     | `#666666`              | 柱・話者以外の地の文・キャプションの色 |
| `--vs-theme-wide-margin-speaker-indent--color-rule`      | `#333333`              | プルクオート罫・コード左帯の色         |
| `--vs-theme-wide-margin-speaker-indent--color-code-bg`   | `#f4f4f4`              | コードブロックの背景色                 |

生成内容の変数:

| 変数                                   | 既定値                                                                        | 説明                               |
| -------------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------- |
| `--vs-theme-wide-margin-speaker-indent--chapter-call-content`     | `target-counter(attr(href), vs-counter-chapter) '　' target-text(attr(href))` | `data-ref="chap"` の参照文字列     |
| `--vs-theme-wide-margin-speaker-indent--chapter-num-call-content` | `target-counter(attr(href), vs-counter-chapter)`                              | `data-ref="chap-num"` の参照文字列 |

章番号の見え方は base の `--vs-section--h1-marker-*`、節参照は `--vs-section--call-content`、柱とノンブルは `--vs-page--mbox-*-content` で変更できる。
