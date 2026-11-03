# @vivliostyle/theme-speaker-hanging-two-column

ポッドキャストの書き起こしを書籍化するためのテーマ。話者名をぶら下げで示す対話組みを横組み2段で配置し、アクセントカラーでプルクオートとタイムコード脚注を彩る。

## 使い方

```css
@import '@vivliostyle/theme-speaker-hanging-two-column';
```

## 原稿の書き方

1 回 = 1 ファイル。frontmatter に `class: chapter` を書くと、その回に「第1回」「第2回」…が自動で付く。

```md
---
title: '番組名 第1回 回タイトル'
lang: ja
class: chapter
---

# 回タイトル

<span class="speaker">ハル：</span>発言<span class="footnote"><span class="tc">[00:03:20]</span>　注</span>。

## コーナー見出し

> プルクオートは<br />引用として書く
```

- 回数は原稿に書かない。`##` のコーナー見出しは段抜きで組まれる。
- 発言は 1 段落 = 1 発言。行頭の `<span class="speaker">` がぶら下げのラベルになる。
- 脚注は `<span class="footnote">` で本文中に書くと、そのページの下部へ送られて自動採番される。タイムコードは `<span class="tc">` で囲む。
- **脚注を見出し (`#`〜`######`) の中に置くと Vivliostyle が採番を取りこぼす**。見出しに注を付けたいときは直後の本文側に置く。
- 柱には `vivliostyle.config.js` の `title` (番組名) が出る。

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。

| 変数                                                              | 既定値                                                | 説明                                           |
| ----------------------------------------------------------------- | ----------------------------------------------------- | ---------------------------------------------- |
| `--vs-theme-speaker-hanging-two-column--color-accent`        | `--vs-color-foreground-alt` と同じ                    | 話者名・見出し罫・プルクオートの金茶アクセント |
| `--vs-theme-speaker-hanging-two-column--speaker-size-inline` | `3.15em`                                              | 話者ラベルのぶら下げ幅                         |
