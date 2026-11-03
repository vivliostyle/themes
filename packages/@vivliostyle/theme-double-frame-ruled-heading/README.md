# @vivliostyle/theme-double-frame-ruled-heading

1段組の会報向けテーマ。二重飾り罫で版面を囲み、上下罫で挟んだ中央見出しと写真で静かな品位を組む。

## 使い方

```css
@import '@vivliostyle/theme-double-frame-ruled-heading';
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

## 東京支部　初夏の集い
```

- `# 記事名` … 記事はページから起こされる。号頭に誌名を掲げるときは `# 誌名 {.masthead}` と書くと一段大きく組まれる。
- `## 小見出し` … 上下を太罫で挟んだ中央見出し。
- `.issue` / `.signature` / `.contact` / `.colophon` … 号数と発行日、署名、連絡先、奥付。いずれも段落に class を付ける。
- 表は横罫だけで組まれる。列の右揃えは Markdown の `---:` で指定する。

柱に章番号を出したくない章 (編集後記など) は、その原稿の frontmatter に任意の class を足し、`--vs-theme-double-frame-ruled-heading--running-chapter-content` を空にする。

```css
html.closing {
  --vs-theme-double-frame-ruled-heading--running-chapter-content: '';
}
```

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。

| 変数 | 既定値 | 説明 |
| --- | --- | --- |
| `--vs-theme-double-frame-ruled-heading--font-display` | `'Shippori Mincho', serif` | 誌名・見出しの表示書体 |
| `--vs-theme-double-frame-ruled-heading--running-chapter-content` | `'第' counter(vs-counter-chapter, cjk-ideographic) '章　'` | 柱に出す章番号                             |
