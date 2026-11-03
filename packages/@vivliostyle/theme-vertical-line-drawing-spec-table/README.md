# @vivliostyle/theme-vertical-line-drawing-spec-table

図鑑テーマ。1項目 = `#` 見出し1つを1ページに起こし、線画に識別スペック表を回り込ませ、その下に観察メモの傍注と丸数字の節を組む。

## 使い方

```css
@import '@vivliostyle/theme-vertical-line-drawing-spec-table';
```

## 原稿の書き方

- `# 名称<span class="latin">学名</span>`: 項目の通し番号は `vs-counter-sec-h1` が自動で振る。原稿に番号は書かない。
- `## 節見出し`: 丸数字 (①②③…) が自動で付く。番号を振りたくない見出しは閉じ `#` を付けて `## 見出し ##` と書く (VFM がセクションに包まないので番号が付かない)。
- 識別スペック表は通常の Markdown 表。見出し行は紙面に出さず、1列目が項目名 (全角コロン付き) になる。
- 観察メモは `<aside class="note">` で書く。傍注として左に置かれ、本文が回り込む。
- 柱には各原稿の frontmatter `title` が入る。
