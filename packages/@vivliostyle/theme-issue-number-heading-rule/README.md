# @vivliostyle/theme-issue-number-heading-rule

メールマガジンを書籍にまとめた合本向けの新書判テーマ。中央寄せの号数見出しと連番付き小見出し、版面全幅の柱罫を横組み1段で組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-issue-number-heading-rule',
};
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

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                | 既定値                                             | 説明                           |
| ----------------------------------- | -------------------------------------------------- | ------------------------------ |
| `--vs-font-family`                  | `'Noto Serif JP', ...`                             | 本文書体                       |
| `--vs--heading-font-family`         | `'Noto Serif JP', ...`                             | 見出し (号数・小見出し) の書体 |
| `--vs-color-foreground`                   | `#1a1a1a`                                          | 本文・柱・罫の基本色           |
| `--vs-color-background`             | `#fcfbf7`                                          | 地色                           |
| `--vs--h2-font-size`                | `12pt`                                             | 号数見出しの文字サイズ         |
| `--vs--h3-font-size`                | `9.2pt`                                            | 連番付き小見出しの文字サイズ   |
| `--vs-section--h2-marker-content`   | `'第' counter(vs-counter-chapter) '号'`            | 号数の表記                     |
| `--vs-theme-issue-number-heading-rule--issueref-call-content` | `'第' target-counter(...) '号'`                    | `data-ref="issue"` の参照文字  |
| `--vs-theme-issue-number-heading-rule--issue-entry-content`   | `'第' target-counter(...) '号　' target-text(...)` | 扉の号一覧の1行                |

## 見開きで組む

ノンブルは小口側の変数 `--vs-page--mbox-bottom-outside-content` で指定しているので、右ページでは右下、左ページでは左下に置かれる。片面で全ページ右下に揃えたい場合は `--vs-page--mbox-bottom-right-content: counter(page)` のように物理位置の変数で上書きする。
