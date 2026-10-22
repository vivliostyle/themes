# @vivliostyle/theme-three-column-warning-grid

アレルギー対応レシピ向けの安全重視型テーマ。材料チェック・工程・警告枠を3段グリッドで並べ、赤を警告・アレルゲン確認マーカー・重要罫線に限定して使うことで、誤読なき安全確認を最優先したレイアウトを組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-three-column-warning-grid',
};
```

## 原稿の書き方

- `# シート名` (h1 セクション) が 1 シート = 1 ページになる。シート番号は見出しの順序から自動で振られるので、見出しに番号を書かない。
- シート内の枠は `## 見出し {.hd-ingredient}` (材料チェック)、`{.hd-method}` (工程)、`{.hd-nutrition}` (全幅の成分表) で指定する。写真・諸元表・警告枠は `<div class="col">` にまとめると先頭トラックに入る。
- 工程 (`.hd-method` 内の `ol`) の番号はカウンタが振る。原稿に「1.」以外の手書き番号を書かない。
- 他シートの参照は `<a href="#sheet-id" data-ref="sheet"></a>` と書く。番号は参照先から解決される。参照の直後に語が続く場合は `&nbsp;` を挟む (VFM が空インライン要素直後の空白を落とすため)。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                               | 既定値                                                        | 説明                                   |
| ---------------------------------- | ------------------------------------------------------------- | -------------------------------------- |
| `--vs-font-family`                 | `'Noto Sans', ...`                                            | 本文書体                               |
| `--vs--monospace-font-family`      | `'Roboto Mono', ...`                                          | 栄養成分表・数値の書体                 |
| `--vs-theme-three-column-warning-grid--sheet-marker-content` | `counter(vs-counter-sec-h1, decimal-leading-zero)`            | シート番号の体裁                       |
| `--vs-theme-three-column-warning-grid--sheet-call-content`   | `'sheet ' target-counter(attr(href), vs-counter-sec-h1, ...)` | `data-ref="sheet"` の参照文字列        |
| `--vs-theme-three-column-warning-grid--step-marker-content`  | `counter(vs-counter-step)`                                    | 工程番号の体裁                         |
| `--vs-theme-three-column-warning-grid--color-accent`         | `#ff0000`                                                     | 警告・アレルゲンマーカー・重要罫線の赤 |
| `--vs-theme-three-column-warning-grid--color-alert-bg`       | `#fff0f0`                                                     | 警告枠の地色                           |
| `--vs-theme-three-column-warning-grid--color-row-alt-bg`     | `#f2f3f3`                                                     | 栄養成分表の縞地色                     |
