# @vivliostyle/theme-three-column-index-tab-figure

A4縦・三段組の植物ビジュアル用語集テーマ。在来種/外来種を示すマーカーと模式葉形の図版、五十音索引タブを添えて見出し語を組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-three-column-index-tab-figure',
};
```

## 原稿の書き方

- 見出し語 1 件は `## 見出し語<small><b>バッジ</b></small>` の 1 節。番号は原稿に書かず、テーマが生成する。
  - 図版 (`![…](….svg)`) をもつ節にはバッジのうしろに図番号 (`Fig. 4-12`) が付く。
  - 図版をもたない節 (凡例・付記など) には、その章のなかでの通し番号が付く。
- 図版番号の参照は `<a href="#見出し語のid" data-ref="fig"></a>` と書く。索引の番号もこれで生成する。
- `frontmatter` に `class: chapter` を書いた原稿では、図版番号が `Fig. 章-連番` の形になる。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）・`--vs-color-background`（地色）・`--vs-color-foreground-alt`（アクセント色）の 3 色から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                               | 既定値                      | 説明                         |
| ---------------------------------- | --------------------------- | ---------------------------- |
| `--vs-color-foreground` | `#252a26` | 本文の文字色 |
| `--vs-color-background` | `#f8f6ee` | 紙面の地色 |
| `--vs-color-foreground-alt` | `#27ae60` | アクセント色 |
| `--vs-font-family-alt`            | `'Noto Sans JP', ...`       | 分類記号・柱・索引タブの書体 |
| `--vs-theme-three-column-index-tab-figure--font-latin`           | `'Source Serif 4', ...`     | 学名(イタリック)の書体       |
| `--vs-theme-three-column-index-tab-figure--color-accent`         | `--vs-color-foreground-alt` と同じ | 在来種マーカー・リンクの緑色 |
| `--vs-theme-three-column-index-tab-figure--color-accent-dark`    | `--vs-color-foreground-alt` × `--vs-color-foreground` 50% | 学名・分類バッジ文字の濃緑色 |
| `--vs-theme-three-column-index-tab-figure--color-alt`            | `#b98b35` | 国内評価バッジの琥珀色       |
| `--vs-theme-three-column-index-tab-figure--color-foreground-secondary`          | `--vs-color-foreground` × `--vs-color-background` 30% | 柱・脚注の控えめな文字色     |
| `--vs-color-background-alt`         | `--vs-color-foreground` × `--vs-color-background` 95% | 五十音索引タブの地色         |
| `--vs-theme-three-column-index-tab-figure--fig-marker-content`   | `'Fig. ' counter(...)`      | 見出し語行に出す図版番号     |
| `--vs-theme-three-column-index-tab-figure--entry-marker-content` | `counter(vs-counter-entry)` | 図版をもたない項目の通し番号 |
