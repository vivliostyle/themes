# @vivliostyle/theme-issue-number-heading-rule

メールマガジンを書籍にまとめた合本向けのテーマ。中央寄せの号数見出しと連番付き小見出し、版面全幅の柱罫を横組み1段で組む。

## 使い方

```css
@import '@vivliostyle/theme-issue-number-heading-rule';
```

## 原稿の書き方

1 号 = 1 ファイル。frontmatter に `class: chapter` を書くと、その号に「第1号」「第2号」…が自動で付く。

```md
---
title: '第1号　二〇二五年三月三日発行'
lang: ja
class: chapter
---

## 二〇二五年三月三日発行 {#issue-1}

見出し直後の一段落はリードとして中央に組まれる。

### 小見出し
```

- 号数は原稿に書かない。`###` の小見出しには号ごとに 1. 2. … と番号が付く。
- 扉・前書き・後書き・奥付など号数を振らない見出しは `## 見出し ##` と閉じ `#` を付けて書き、frontmatter の `class` から `chapter` を外す。
- 扉と奥付は frontmatter の `class: cover` / `class: colophon` で柱・ノンブルが伏せられる。
- 他号への参照は `<a href="…#issue-1" data-ref="issue"></a>` で「第N号」に展開される。扉の号一覧は `<p class="issue-entry">` で囲むと「第N号　発行日」を各号の見出しから引く。
- 参照の直後に語が続くときは、VFM が空インライン要素直後の空白を落とすので `&nbsp;` を置く (句読点や助詞が直接続くときは不要)。
- 柱には `vivliostyle.config.js` の `title` (書名) が出る。
