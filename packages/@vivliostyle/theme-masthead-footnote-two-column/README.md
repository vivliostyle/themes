# @vivliostyle/theme-masthead-footnote-two-column

A5判・2段組の学会予稿集向けテーマ。全幅マストヘッド (題目・著者・概要・キーワード) と2段組本文、図表・脚注・参考文献・索引語を高密度に組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-masthead-footnote-two-column',
};
```

## 原稿の書き方

- 概要 1 件を `#` 見出しで始める。h1 の節ごとに改ページし、節番号・図表番号・式番号・脚注番号が 1 から数え直される。
- 柱は左が `vivliostyle.config.js` の `title` (`env(pub-title)`)、右が原稿の frontmatter の `title` (`env(doc-title)`)。
- マストヘッドの各行は `<p class="authors">` `<p class="affiliations">` `<p class="contact">` `<p class="venue">` `<p class="abstract">` `<p class="keywords">` で書く。この class を持つ段落だけが段抜きになる。
- 節番号を付けない見出しは閉じ `#` を付けて `## 参考文献 ##` と書く (セクション化されないので番号が振られない)。
- 表題は `<p class="caption" id="…">` (番号を付けない表題は `class="caption plain"`)、数式は `<div class="equation" id="…">`。「表1」「(1)」などの番号は原稿に書かない。
- 参照は `<a href="#id" data-ref="fig|tbl|eq|page"></a>` と書く。`page` は参照先のページ番号を出す。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）と `--vs-color-background`（地色）から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                  | 既定値                        | 説明                                     |
| ------------------------------------- | ----------------------------- | ---------------------------------------- |
| `--vs-color-background` | `#fafaf7` | 紙面の地色 |
| `--vs-theme-masthead-footnote-two-column--equation-marker-content` | `'(' counter(…) ')'`          | 数式の右端に置く式番号                   |
| `--vs-theme-masthead-footnote-two-column--equation-call-content`   | `'式(' target-counter(…) ')'` | 本文中の式番号の参照                     |
| `--vs-theme-masthead-footnote-two-column--page-call-content`       | `target-counter(…, page)`     | 本文中のページ参照                       |
| `--vs-font-family`                    | `'Noto Serif JP', serif`      | 本文書体                                 |
| `--vs-font-family-alt`          | `'Noto Sans JP', ...`         | 著者・柱・キャプション等の補助書体       |
| `--vs-color-foreground`                     | `#161616` | 本文色                                   |
| `--vs-color-foreground-alt`               | `--vs-color-foreground` × `--vs-color-background` 25% | 著者所属・柱・キャプション等の補助文字色 |
| `--vs-color-border-alt`              | `--vs-color-foreground` × `--vs-color-background` 55% | 概要・キーワード欄の細罫色               |
| `--vs-color-background-alt`              | `--vs-color-foreground` × `--vs-color-background` 90% | 表ヘッダーの淡色面                       |

## 見開きで組む

ノンブルは小口側の変数 `--vs-page--mbox-bottom-outside-content` で指定しているので、右ページでは右下、左ページでは左下に置かれる。片面で全ページ右下に揃えたい場合は `--vs-page--mbox-bottom-right-content: counter(page)` のように物理位置の変数で上書きする。
