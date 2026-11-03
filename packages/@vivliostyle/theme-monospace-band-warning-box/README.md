# @vivliostyle/theme-monospace-band-warning-box

横組みの技術同人誌向け API 仕様書テーマ。全編モノスペース書体の高密度組みで、細罫グリッドのパラメータ表・淡色地のコードブロック・帯付き警告ボックスを積む。

## 原稿の書き方

- 1 章 = 1 ファイルとし、frontmatter に `class: chapter` を書く。base のドキュメントカウンタ `vs-counter-chapter` が章番号になり、節は `vs-counter-sec-h2`、小節は `vs-counter-sec-h3` から「3.4」「4.1.1」を組む。見出しに番号は書かない。
- 付録の見出しは `# 表題 {#apx-xxx .appendix}`。章とは別立てで `Appendix A` … と採番される。
- 本文からの参照は `section <a href="05-common.html#id" data-ref="sec"></a>` (番号だけが展開されるので「section」「Section」は原稿側に置く)、付録は `<a href="10-appendix.html#apx-xxx" data-ref="apx"></a>` (「Appendix B」と展開)。
- もくじは `data-ref="chap"` (「1 Overview」)、`data-ref="sec-title"` (「1.1 About This Reference」)、`data-ref="apx-title"` (「Appendix A Limits and Quotas」) の空アンカーで書く。ページ番号は base の toc.css が `target-counter()` で入れる。
- 空のアンカーの直後に語が続くときは VFM が空白を落とすので `&nbsp;` を置く。
- 見出しに `{key}` のような波括弧を出すときは `<span>{key}</span>` と書く (属性記法と衝突するため)。この見出しには `{#id}` を付けられないので、参照は VFM が生成する id を使う。

## 使い方

```css
@import '@vivliostyle/theme-monospace-band-warning-box';
```

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。

| 変数                             | 既定値                  | 説明                               |
| -------------------------------- | ----------------------- | ---------------------------------- |
| `--vs-theme-monospace-band-warning-box--color-inverse-bg`   | `#000000` | 警告ボックスのヘッダ背景色と枠の色 (ヘッダ文字は `--vs-color-background`) |
