# @vivliostyle/theme-vertical-matrix-diagram

新書判のビジネス書向けテーマ。縦組み1段のサンセリフ本文の下部に、横組みのポジショニング・マトリクスとデータ表を回り込ませて配置する。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-vertical-matrix-diagram',
};
```

原稿の書きかた:

- 章題は `# 章題` の h1、節見出しは `## 見出し`。番号 (「第1章」「1・2」) は `--vs-section--*` が付けるので原稿には書かない。番号を振りたくない見出しは `## 見出し ##` と閉じる。
- 図表は `<aside>` にまとめて置くと、紙面下部の横組みバンドに回り込む。
- 図は `<figure class="fig" id="fig-xxx">`、表は `<figure class="tbl" id="tbl-xxx">` とし、キャプションに「図3-1」と書かない。本文からは `<a href="#fig-xxx" data-ref="fig"></a>` / `data-ref="tbl"` で参照する。
- 柱には h1 の章題が入る。書名は `vivliostyle.config.js` の `title` に書く。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                                    | 既定値                                    | 説明                             |
| --------------------------------------- | ----------------------------------------- | -------------------------------- |
| `--vs-font-family`                      | `'Noto Sans JP', sans-serif`              | 本文書体                         |
| `--vs-theme-vertical-matrix-diagram--font-figure`               | `'IBM Plex Sans JP', ...`                 | 図表バンド専用の書体             |
| `--vs-theme-vertical-matrix-diagram--color-tint`                | `#d9d9d9`                                 | 網掛け (強調セル・表見出し) の色 |
| `--vs-theme-vertical-matrix-diagram--aside-size-inline`         | `46mm`                                    | 図表バンドの幅                   |
| `--vs-color-foreground`                       | `#1a1a1a`                                 | 本文の墨色                       |
| `--vs-color-background`                 | `#f7f5f0`                                 | 地色                             |
| `--vs-section--h1-marker-content`       | `'第' counter(...) '章'`                  | 章番号                           |
| `--vs-section--h2-marker-content`       | `counter(...) '・' counter(...)`          | 節番号                           |
| `--vs-figure--marker-content`     | `'図' counter(...) '-' counter(...) '　'` | 図番号                           |
| `--vs-page--mbox-top-right-content`     | `string(chapter-title)`                   | 柱の内容                         |
| `--vs-page--mbox-bottom-center-content` | `counter(page)`                           | ノンブルの内容                   |
