# @vivliostyle/theme-vertical-boxed-column-note

新書判の教養書向けテーマ。縦組み1段の明朝体本文に、罫囲みコラムの縦帯・ノド側の図版・縦組み脚注を組み合わせる。本文はページをまたいで流れる。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-vertical-boxed-column-note',
};
```

原稿の書きかた:

- 節見出しは `## 見出し` と書き、番号は書かない (`--vs-section--*` が漢数字で付ける)。番号を振りたくない見出しは `## 見出し ##` と閉じる。
- 罫囲みコラムは `<aside class="column">` に生 HTML の `<h3>` を入れて書く。「コラム一」の見出し語と番号は CSS が付ける。
- 脚注は本文中に `<span class="footnote">注の内容</span>` を置く。合印 (＊一) と脚注欄への送り出しは base の footnote.css が行う。
- 図版は `![キャプション](fig.svg){#fig-id}`。キャプションに「図1」と書かず、本文からは `<a href="#fig-id" data-ref="fig"></a>` で参照する。
- 柱には `vivliostyle.config.js` の `title` (書名) が鉤括弧付きで入る。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                    | 既定値                       | 説明                         |
| --------------------------------------- | ---------------------------- | ---------------------------- |
| `--vs-font-family`                      | `'Noto Serif JP', serif`     | 本文書体                     |
| `--vs-color-foreground`                       | `#1a1a1a`                    | 本文の墨色                   |
| `--vs-color-background`                 | `#faf7f0`                    | 地色                         |
| `--vs--h2-padding-inline`               | `7mm 0`                      | 節見出しの天からの一字下げ量 |
| `--vs-section--counter-style`           | `cjk-ideographic`            | 節番号の書式                 |
| `--vs-counter-style`                    | `cjk-ideographic`            | 図番号の書式                 |
| `--vs-theme-vertical-boxed-column-note--column-marker-content`     | `'コラム' counter(...) '　'` | コラム見出しの冠             |
| `--vs-theme-vertical-boxed-column-note--figure-size-inline`        | `23mm`                       | ノド側に置く図版の幅         |
| `--vs-footnote--call-content`           | `'＊' counter(...)`          | 脚注の合印                   |
| `--vs-page--mbox-top-left-content`      | `'「' env(pub-title) '」'`   | 柱の内容                     |
| `--vs-page--mbox-bottom-center-content` | `counter(page)`              | ノンブルの内容               |
