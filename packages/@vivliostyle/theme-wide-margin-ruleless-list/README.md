# @vivliostyle/theme-wide-margin-ruleless-list

A5判・1段組のスペシャルティコーヒー店メニュー向けテーマ。広い余白と罫線のない価格表で、ホワイトスペースを活かした洗練された世界観を表現する。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-wide-margin-ruleless-list',
};
```

## 原稿の書き方

- `# 章題` がメニューの大分類、`## 見出し` が品目表の小分類。品目表は GFM の 2 列表 (品名・価格) で書き、見出し行は空にする (罫線のない表にするため見出し行は隠される)。
- 品目表は 1 つの塊として扱われ、ページをまたいで割られない。
- 店名などのバイラインは `<p class="byline">店名</p>` と書く。
- 欄外の注記は `<footer>` に入れる。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）・`--vs-color-background`（地色）・`--vs-color-foreground-alt`（アクセント色）の 3 色から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                           | 既定値             | 説明                         |
| ------------------------------ | ------------------ | ---------------------------- |
| `--vs-color-foreground` | `#242321` | 本文の文字色 |
| `--vs-color-background` | `#faf9f6` | 紙面の地色 |
| `--vs-color-foreground-alt` | `#d4a574` | アクセント色 |
| `--vs-font-family-alt`     | `'Inter', ...`     | 見出し・バイラインの表示書体 |
| `--vs-font-family`             | `'Noto Sans', ...` | 本文書体                     |
| `--vs--h2-border-color-block-end`     | `--vs-color-foreground-alt` と同じ | 見出し下罫のアクセント色     |
| `--vs--table-border-color-block-end` | `--vs-color-foreground-alt` × `--vs-color-background` 60% | セクション区切りの極細罫の色 |
| `--vs-theme-wide-margin-ruleless-list--color-foreground-secondary`      | `--vs-color-foreground` × `--vs-color-background` 50% | フッター注記の文字色         |
