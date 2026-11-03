# @vivliostyle/theme-vertical-matrix-diagram

縦組み1段のテーマ。サンセリフ本文の下部に、横組みのマトリクス図とデータ表を回り込ませて配置する。

## 使い方

```css
@import '@vivliostyle/theme-vertical-matrix-diagram';
```

原稿の書きかた:

- 章題は `# 章題` の h1、節見出しは `## 見出し`。番号 (「第1章」「1・2」) は自動で付くので原稿には書かない。番号を振りたくない見出しは `## 見出し ##` と閉じる。
- 図表は `<aside>` にまとめて置くと、紙面下部の横組みバンドに回り込む。
- 図は `<figure class="fig" id="fig-xxx">`、表は `<figure class="tbl" id="tbl-xxx">` とし、キャプションに「図3-1」と書かない。本文からは `<a href="#fig-xxx" data-ref="fig"></a>` / `data-ref="tbl"` で参照する。
- 柱には h1 の章題が入る。書名は `vivliostyle.config.js` の `title` に書く。

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。

| 変数                                                    | 既定値                                                | 説明                             |
| ------------------------------------------------------- | ----------------------------------------------------- | -------------------------------- |
| `--vs-theme-vertical-matrix-diagram--aside-size-inline` | `9rlh`                                                | 図表バンドの幅                   |
