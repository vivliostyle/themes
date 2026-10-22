# @vivliostyle/theme-all-mono-black-band-warning

A5判・横組みの技術同人誌向け API 仕様書テーマ。全編モノスペース書体の高密度組みで、細罫グリッドのパラメータ表・薄グレー地のコードブロック・黒帯付き警告ボックスを積む。

## 原稿の書き方

- 1 章 = 1 ファイルとし、frontmatter に `class: chapter` を書く。base のドキュメントカウンタ `vs-counter-chapter` が章番号になり、節は `vs-counter-sec-h2`、小節は `vs-counter-sec-h3` から「3.4」「4.1.1」を組む。見出しに番号は書かない。
- 付録の見出しは `# 表題 {#apx-xxx .appendix}`。章とは別立てで `Appendix A` … と採番される。
- 本文からの参照は `section <a href="05-common.html#id" data-ref="sec"></a>` (番号だけが展開されるので「section」「Section」は原稿側に置く)、付録は `<a href="10-appendix.html#apx-xxx" data-ref="apx"></a>` (「Appendix B」と展開)。
- もくじは `data-ref="chap"` (「1 Overview」)、`data-ref="sec-title"` (「1.1 About This Reference」)、`data-ref="apx-title"` (「Appendix A Limits and Quotas」) の空アンカーで書く。ページ番号は base の toc.css が `target-counter()` で入れる。
- 空のアンカーの直後に語が続くときは VFM が空白を落とすので `&nbsp;` を置く。
- 見出しに `{key}` のような波括弧を出すときは `<span>{key}</span>` と書く (属性記法と衝突するため)。この見出しには `{#id}` を付けられないので、参照は VFM が生成する id を使う。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-all-mono-black-band-warning',
};
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                             | 既定値                  | 説明                               |
| -------------------------------- | ----------------------- | ---------------------------------- |
| `--vs-font-family`               | `'JetBrains Mono', ...` | 本文・見出し共通のモノスペース書体 |
| `--vs-color-foreground`                | `#1a1a1a`               | 本文・罫の墨色                     |
| `--vs-theme-all-mono-black-band-warning--color-code-bg`      | `#f0f0f0`               | コードブロックの背景色             |
| `--vs-theme-all-mono-black-band-warning--color-code-border`  | `#777777`               | コードブロックの枠線色             |
| `--vs-theme-all-mono-black-band-warning--color-inverse-bg`   | `#000000`               | 警告ボックスのヘッダ背景色         |
| `--vs-theme-all-mono-black-band-warning--color-inverse-body` | `#ffffff`               | 警告ボックスのヘッダ文字色         |

生成内容の変数:

| 変数                                  | 既定値                                                              | 説明                                |
| ------------------------------------- | ------------------------------------------------------------------- | ----------------------------------- |
| `--vs-theme-all-mono-black-band-warning--appendix-counter-style`  | `vs-theme-appendix` (A, B, C …)                                     | 付録番号の書式                      |
| `--vs-theme-all-mono-black-band-warning--appendix-marker-content` | `'Appendix ' counter(vs-counter-appendix, …)`                       | 付録見出しの番号                    |
| `--vs-theme-all-mono-black-band-warning--appendix-call-content`   | `'Appendix ' target-counter(…)`                                     | `data-ref="apx"` の参照文字列       |
| `--vs-theme-all-mono-black-band-warning--chapter-call-content`    | `target-counter(…, vs-counter-chapter) ' ' target-text(attr(href))` | `data-ref="chap"` の参照文字列      |
| `--vs-theme-all-mono-black-band-warning--section-call-content`    | 章番号 + 節番号 + 見出し名                                          | `data-ref="sec-title"` の参照文字列 |

章・節番号の見え方は base の `--vs-section--hN-marker-content`、本文からの節参照は `--vs-section--call-content`、ノンブルは `--vs-page--mbox-bottom-center-content` で変更できる。
