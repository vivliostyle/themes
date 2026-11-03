# @vivliostyle/theme-vertical-numbered-heading-graph

学術教養書向けテーマ。縦組み1段の明朝体本文に漢数字の節見出しを立て、版面の地に横組みの図版 (グラフ等) をページフロートで置いて本文を回り込ませる。巻末注に対応する。

## 使い方

```css
@import '@vivliostyle/theme-vertical-numbered-heading-graph';
```

原稿の書きかた:

- 節見出しは `## 見出し` と書き、番号は書かない (漢数字で自動的に付く)。番号を振りたくない見出しは `## 見出し ##` と閉じる。
- 図版は `![キャプション](fig.svg){#fig-id}`。キャプションに「図1」と書かず、本文からは `<a href="#fig-id" data-ref="fig"></a>` で参照する。
- 注は VFM の `[^1]` を使う。本文の合印と巻末の「注」一覧が自動で振られる。
- 縦組みで正立させたい算用数字には `.tcy` を付ける (`<span class="tcy">21</span>`)。
- 柱には `vivliostyle.config.js` の `title` (書名) が入る。
