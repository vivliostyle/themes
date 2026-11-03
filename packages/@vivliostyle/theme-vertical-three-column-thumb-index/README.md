# @vivliostyle/theme-vertical-three-column-thumb-index

縦組み3段の辞典テーマ。天の柱に見出し語範囲、小口にツメ見出し、地にノンブルを配し、太字ゴシックの見出し語と明朝の語釈・用例を高密度に組む。

## 使い方

```css
@import '@vivliostyle/theme-vertical-three-column-thumb-index';
```

## 原稿の書き方

- 見出し語は `## **かたち**【漢字】<span class="meta">〔品詞〕</span>` の h2 で立てる。天の柱は、そのページの最初と最後の見出し語 (`**…**` の部分) から自動で組まれる。
- 語義の区切りは `<span class="sense"></span>` を置く。①②③… の番号はテーマが生成するので原稿には書かない。
- ツメ見出しは `<nav class="bleed">あ</nav>` を部の先頭に 1 つ置く。running element として以降の全ページの小口に立つ。
- 凡例など前付は frontmatter に `class: preface` を書く。柱がその文書の `#` 見出しに変わり、`##` の節に漢数字の連番が付く。
