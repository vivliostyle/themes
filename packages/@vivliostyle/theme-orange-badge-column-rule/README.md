# @vivliostyle/theme-orange-badge-column-rule

実用海外旅行ガイド向けの A4縦2段組テーマ。ゴシック本文にオレンジの章番号バッジ・段間罫・情報ボックス・料金表を組み合わせ、俯瞰略図とスポットDATA欄、モデルコースのフローを配置する。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-orange-badge-column-rule',
};
```

## 原稿の書き方

章 (`#`) と小見出し (`##`) の番号はカウンタで自動的に付く。原稿には番号を書かない。

```md
# 章題<span class="subhead">欧文サブ</span>

## 小見出し {#spot-id}

## スポットDATA {.data-box}

## モデルコース {.course}

## 料金表 {.fee}
```

- DATA欄・コース・料金表の定型枠 (`{.data-box}` / `{.course}` / `{.fee}`) は小見出しの番号を消費しない。
- そのほかに番号を付けたくない見出しは `## 見出し ##` と閉じ `#` を付ける (節にならないので番号を消費しない)。
- 図には `![キャプション](fig.svg){#fig-map}` のように id を付け、本文からは `<a href="#fig-map" data-ref="fig"></a>` で参照する。図番号は自動で付く。
- 「→ P.**」の相互参照は `<p class="ref"><a href="#spot-id" data-ref="page"></a></p>`。参照先のページ番号が自動で入る。
- 柱には `vivliostyle.config.js` の `title` (シリーズ名) が出る。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）・`--vs-color-background`（地色）・`--vs-color-foreground-alt`（アクセント色）の 3 色から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                               | 既定値                                                      | 説明                                               |
| ---------------------------------- | ----------------------------------------------------------- | -------------------------------------------------- |
| `--vs-color-foreground` | `#1f1f1f` | 本文の文字色 |
| `--vs-color-background` | `#fdfcf8` | 紙面の地色 |
| `--vs-color-foreground-alt` | `#ff6600` | アクセント色 |
| `--vs-theme-orange-badge-column-rule--color-accent`         | `--vs-color-foreground-alt` と同じ | 章番号バッジ・段間罫・情報ボックス枠のアクセント色 |
| `--vs-font-family-alt`       | `'Barlow Condensed', ...`                                   | 章番号・料金数字・参照ページの書体                 |
| `--vs-theme-orange-badge-column-rule--font-caption`         | `'M PLUS 1p', ...`                                          | データ欄・表の書体                                 |
| `--vs--figcaption-text-color`          | `--vs-color-foreground` × `--vs-color-background` 50% | キャプション・ノンブルの色                         |
| `--vs-theme-orange-badge-column-rule--pageref-call-content` | `'→ P.' target-counter(attr(href), page)`                   | `data-ref="page"` の参照に出る文字列               |
| `--vs--h1-font-size`               | `33pt`                                                      | 章題の文字サイズ                                   |
| `--vs-section--h1-marker-content`  | `counter(vs-counter-sec-h1)`                                | 章番号バッジの内容                                 |
| `--vs-section--h2-marker-content`  | `counter(vs-counter-sec-h1) '-' counter(vs-counter-sec-h2)` | 小見出し番号の内容                                 |
