# @vivliostyle/theme-vertical-boxed-column-note

教養書向けテーマ。縦組み1段の明朝体本文に、罫囲みコラムの縦帯・ノド側の図版・縦組み脚注を組み合わせる。本文はページをまたいで流れる。

## 使い方

```css
@import '@vivliostyle/theme-vertical-boxed-column-note';
```

原稿の書きかた:

- 節見出しは `## 見出し` と書き、番号は書かない (漢数字で自動的に付く)。番号を振りたくない見出しは `## 見出し ##` と閉じる。
- 罫囲みコラムは `<aside class="column">` に生 HTML の `<h3>` を入れて書く。「コラム一」の見出し語と番号は CSS が付ける。
- 脚注は本文中に `<span class="footnote">注の内容</span>` を置く。合印 (＊一) と脚注欄への送り出しは base の footnote.css が行う。
- 図版は `![キャプション](fig.svg){#fig-id}`。キャプションに「図1」と書かず、本文からは `<a href="#fig-id" data-ref="fig"></a>` で参照する。
- 柱には `vivliostyle.config.js` の `title` (書名) が鉤括弧付きで入る。
