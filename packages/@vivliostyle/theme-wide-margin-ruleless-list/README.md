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

| 変数                           | 既定値             | 説明                         |
| ------------------------------ | ------------------ | ---------------------------- |
| `--vs-theme-wide-margin-ruleless-list--font-display`     | `'Inter', ...`     | 見出し・バイラインの表示書体 |
| `--vs-font-family`             | `'Noto Sans', ...` | 本文書体                     |
| `--vs-theme-wide-margin-ruleless-list--color-accent`     | `#d4a574`          | 見出し下罫のアクセント色     |
| `--vs-theme-wide-margin-ruleless-list--color-rule-faint` | `#ead6c1`          | セクション区切りの極細罫の色 |
| `--vs-theme-wide-margin-ruleless-list--color-muted`      | `#8c8983`          | フッター注記の文字色         |
