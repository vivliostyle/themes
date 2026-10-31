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

配色は `--vs-color-foreground`（文字色）と `--vs-color-background`（地色）から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                           | 既定値                           | 説明                                       |
| ------------------------------ | -------------------------------- | ------------------------------------------ |
| `--vs-color-foreground` | `#171717` | 本文の文字色 |
| `--vs-color-background` | `#ffffff` | 紙面の地色 |
| `--vs--table-font-family`     | `'Roboto Mono', ...`             | データ表・レジスタマップの等幅数字書体     |
| `--vs--figcaption-font-family`     | `'IBM Plex Sans Condensed', ...` | 図版キャプションの書体                     |
| `--vs-color-foreground-alt`      | `--vs-color-foreground` × `--vs-color-background` 30% | 注記・条件行・キャプションの控えめな文字色 |
| `--vs-color-border`       | `--vs-color-foreground` × `--vs-color-background` 65% | 柱罫・表罫の基本グレー                     |
| `--vs--pre-border-color`  | `--vs-color-foreground` × `--vs-color-background` 85% | コードブロックの淡い罫色                   |
| `--vs-color-background-alt`  | `--vs-color-foreground` × `--vs-color-background` 95% | 表ヘッダー・コードブロックの淡い地色       |
| `--vs-theme-mono-hairline-two-column--color-fill-zebra` | `--vs-color-foreground` × `--vs-color-background` 95% | 表の偶数行の縞地色                         |
