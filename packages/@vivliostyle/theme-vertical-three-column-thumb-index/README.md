# @vivliostyle/theme-vertical-three-column-thumb-index

A5判・縦組み3段の古語辞典テーマ。天の柱に見出し語範囲、小口にツメ見出し、地にノンブルを配し、太字ゴシックの見出し語と明朝の語釈・古典用例を高密度に組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-vertical-three-column-thumb-index',
};
```

## 原稿の書き方

- 見出し語は `## **かたち**【漢字】<span class="meta">〔品詞〕</span>` の h2 で立てる。天の柱は、そのページの最初と最後の見出し語 (`**…**` の部分) から自動で組まれる。
- 語義の区切りは `<span class="sense"></span>` を置く。①②③… の番号はテーマが生成するので原稿には書かない。
- ツメ見出しは `<nav class="bleed">あ</nav>` を部の先頭に 1 つ置く。running element として以降の全ページの小口に立つ。五十音の行ごとに位置を下げるには `--vs-theme-vertical-three-column-thumb-index--thumb-index-inset-block-end` を小さくする。
- 凡例など前付は frontmatter に `class: preface` を書く。柱がその文書の `#` 見出しに変わり、`##` の節に漢数字の連番が付く。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                      | 既定値                 | 説明                               |
| ----------------------------------------- | ---------------------- | ---------------------------------- |
| `--vs-theme-vertical-three-column-thumb-index--font-gothic`                 | `'Noto Sans JP', ...`  | 見出し語・ツメ見出しのゴシック書体 |
| `--vs-theme-vertical-three-column-thumb-index--thumb-index-inset-block-end` | `139mm`                | ツメ見出しを地から持ち上げる量     |
| `--vs-font-family`                        | `'Noto Serif JP', ...` | 語釈・古典用例の明朝書体           |
| `--vs-color-foreground`                         | `#1a1a1a`              | 本文・罫・ツメ見出しの墨色         |
| `--vs-color-background`                   | `#f7f5ef`              | 辞典用紙の地色                     |
| `--vs-color-border`                       | `#1a1a1a`              | 帯を仕切る水平罫の色               |
| `--vs-columns`                            | `3`                    | 紙面を分ける帯 (段) の数           |
