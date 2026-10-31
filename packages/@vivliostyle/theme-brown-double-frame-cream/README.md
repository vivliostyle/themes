# @vivliostyle/theme-brown-double-frame-cream

A5判・1段組の同窓会報向けテーマ。焦茶の二重飾り罫でクリーム地の版面を囲み、上下罫で挟んだ中央見出しと小口余白の縦組み傍注、モノクロ記念写真で静かな品位を組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-brown-double-frame-cream',
};
```

## 原稿の書き方

号を章 (コーナー) ごとの md に分け、frontmatter に章題と `class: chapter` を書く。柱には「第N章　章題」が出る。章番号は base のドキュメントカウンタ `vs-counter-chapter`、章題は `env(doc-title)` から取るので、原稿に書くのは frontmatter だけでよい。

```md
---
title: 会員のうごき
class: chapter
---

# 支部だより

<img class="ornament" src="fig-ornament.svg" alt="" />

本文…

<aside>便りの数だけ、母校は遠くまで届いています。</aside>

## 東京支部　初夏の集い
```

- `# 記事名` … 記事はページから起こされる。号頭に誌名を掲げるときは `# 誌名 {.masthead}` と書くと一段大きく組まれる。
- `## 小見出し` … 上下を太罫で挟んだ中央見出し。
- `<aside>…</aside>` … 小口余白の縦組み傍注。本文の脇を流れるページフロート (`float-reference: column`) なので、置いた位置に収まらないときは次ページへ送られる。1 ページに 2 本まで、`--vs-theme-brown-double-frame-cream--marginalia-size` (既定 62mm) に収まる長さを目安にする。
- `.issue` / `.signature` / `.contact` / `.colophon` … 号数と発行日、署名、連絡先、奥付。いずれも段落に class を付ける。
- 表は横罫だけで組まれる。列の右揃えは Markdown の `---:` で指定する。

柱に章番号を出したくない章 (編集後記など) は、その原稿の frontmatter に任意の class を足し、`--vs-theme-brown-double-frame-cream--running-chapter-content` を空にする。

```css
html.closing {
  --vs-theme-brown-double-frame-cream--running-chapter-content: '';
}
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）と `--vs-color-background`（地色）から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                  | 既定値                                                     | 説明                                       |
| ------------------------------------- | ---------------------------------------------------------- | ------------------------------------------ |
| `--vs-color-foreground` | `#2b2620` | 本文の文字色 |
| `--vs-theme-brown-double-frame-cream--font-display`            | `'Shippori Mincho', serif`                                 | 誌名・見出しの表示書体                     |
| `--vs-font-family-alt`               | `'Zen Old Mincho', serif`                                  | 縦組み傍注・キャプションの書体             |
| `--vs-theme-brown-double-frame-cream--color-accent`            | `--vs-color-foreground` × `--vs-color-background` 15% | 飾り罫・傍注の焦茶色                       |
| `--vs-theme-brown-double-frame-cream--marginalia-gutter`       | `9mm`                                                      | 小口の縦組み傍注のために本文に確保する余白 |
| `--vs-theme-brown-double-frame-cream--marginalia-size`         | `62mm`                                                     | 縦組み傍注の行長 (これを超えると折り返す)  |
| `--vs-page--border-width`             | `4.4px`                                                    | 版面を囲む二重飾り罫の太さ                 |
| `--vs-page--padding-{top,right,bottom,left}` | `7mm 8mm 6mm 8mm`                                   | 飾り罫と本文の間隔                         |
| `--vs-theme-brown-double-frame-cream--running-chapter-content` | `'第' counter(vs-counter-chapter, cjk-ideographic) '章　'` | 柱に出す章番号                             |
| `--vs-color-background`               | `#f7f3ec` | 紙面の地色                                 |
