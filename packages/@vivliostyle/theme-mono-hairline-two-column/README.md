# @vivliostyle/theme-mono-hairline-two-column

レター判2段組の半導体RF-ICデータシート向けテーマ。IBM Plex Mono の等幅本文と Roboto Mono のタブラー数字、極細グレー罫で工業文書らしい高密度なレイアウトを組む。

## 組み方

- 節番号は `## 見出し` から自動で振る (`##` = 1, `###` = 1.1)。見出しに番号を書かない。
- 柱の中央は `env(doc-title)` (原稿の frontmatter `title`)、右はノンブル。
- 図は `<figure class="diagram">` などで包み、`<figcaption>` に説明だけを書く。頭の「Figure N.」はカウンタが付ける。図版幅は `diagram` / `chart` / `package` のクラスで決める。
- 表は `<figure class="tbl">` で包み、表の後ろに `<figcaption>` を置く。「Table N.」もカウンタが付ける。表を包む figure は段・頁をまたいで分割できる。
- コードフェンス (` ```text title="…" `) で組んだレジスタマップも表として数える。
- 参照は `<a href="#id" data-ref="fig"></a>` / `data-ref="tbl"`。直後 (および表セル内では直前) に語が続くときは `&nbsp;` を置く。VFM が空要素の隣の空白を落とすため。
- 条件行は `<p class="lead">`、注記は `<p class="note">`。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-mono-hairline-two-column',
};
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                           | 既定値                           | 説明                                       |
| ------------------------------ | -------------------------------- | ------------------------------------------ |
| `--vs-theme-mono-hairline-two-column--font-tabular`     | `'Roboto Mono', ...`             | データ表・レジスタマップの等幅数字書体     |
| `--vs-theme-mono-hairline-two-column--font-caption`     | `'IBM Plex Sans Condensed', ...` | 図版キャプションの書体                     |
| `--vs-theme-mono-hairline-two-column--color-muted`      | `#555555`                        | 注記・条件行・キャプションの控えめな文字色 |
| `--vs-theme-mono-hairline-two-column--color-rule`       | `#a8a8a8`                        | 柱罫・表罫の基本グレー                     |
| `--vs-theme-mono-hairline-two-column--color-rule-soft`  | `#d6d6d6`                        | コードブロックの淡い罫色                   |
| `--vs-theme-mono-hairline-two-column--color-fill-soft`  | `#eeeeee`                        | 表ヘッダー・コードブロックの淡い地色       |
| `--vs-theme-mono-hairline-two-column--color-fill-zebra` | `#f5f5f5`                        | 表の偶数行の縞地色                         |
