# @vivliostyle/theme-mono-green-entry-form

スリム手帳判 (105×173mm) の釣果記録フォームテーマ。等幅組み・緑1色で記入欄・釣果テーブル・NOTES 罫を 1 枚ずつに収める。

## 組み方

- `# 用紙名` = 記録 1 枚 = 1 ページ。見出しの右肩に `No. 001` の通し番号が自動で入る (`## TACKLE` / `## NOTES` は用紙の中の欄)。
- 総括や記入例など通し番号を持たない用紙は、見出しに `<span class="no">…</span>` を書き入れる。その用紙は番号を消費しない。
- 他の用紙の番号を引くには `<a href="#id" data-ref="sheet"></a>`。用紙の見出しに `{#id}` を振っておく。
- 記入欄は `<div class="field"><dl><dt>ラベル</dt><dd>記入値</dd></dl>…</div>`。1 つの `dl` に 2 組まで並ぶ。記入値が長いときは折り返し、記入罫はその行の下端で揃う。
- 釣果テーブルの欄の寄せは Markdown の桁揃え指定 (`:---` / `:-:` / `---:`) で決める。空欄の行は `&nbsp;` を並べる。
- NOTES の段落・箇条書き・`<p class="rule">&nbsp;</p>` はすべて記入罫になる。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-mono-green-entry-form',
};
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。通し番号を途中から起こすには base の `--vs-section--root-counter-sec-h1` に開始値の 1 つ手前を与える。

配色は `--vs-color-foreground`（文字色）・`--vs-color-background`（地色）・`--vs-color-foreground-alt`（アクセント色）の 3 色から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                      | 既定値                  | 説明                                     |
| ----------------------------------------- | ----------------------- | ---------------------------------------- |
| `--vs-color-foreground-alt` | `#27ae60` | アクセント色 |
| `--vs-font-family`                        | `'JetBrains Mono', ...` | 本文書体 (等幅)                          |
| `--vs-color-foreground`                         | `#1c7a46` | 記入インクの色                           |
| `--vs-color-background`                   | `#fbfbf8` | 地色                                     |
| `--vs-theme-mono-green-entry-form--color-accent`                | `--vs-color-foreground-alt` と同じ | 見出し・罫・テーブル外枠のアクセント色   |
| `--vs--th-background-color`                  | `--vs-color-foreground-alt` × `--vs-color-background` 95% | 釣果テーブルヘッダーの淡緑地色           |
| `--vs-color-border`                  | `--vs-color-foreground` × `--vs-color-background` 70% | NOTES 記入罫の色                         |
| `--vs-theme-mono-green-entry-form--field-label-size-inline`     | `13mm`                  | 記入欄ラベルの幅                         |
| `--vs-theme-mono-green-entry-form--field-label-size-inline-2nd` | `17mm`                  | 1 行に 2 組並べたときの 2 つめのラベル幅 |
| `--vs-theme-mono-green-entry-form--row-size-block`              | `3.8mm`                 | 釣果テーブルの記入行の高さ               |
| `--vs-theme-mono-green-entry-form--rule-size-block`             | `4.8mm`                 | NOTES 記入罫の行の高さ                   |
| `--vs-theme-mono-green-entry-form--sheet-number-content`        | `'No. ' counter(...)`   | 用紙の通し番号の書式                     |
| `--vs-theme-mono-green-entry-form--sheet-call-content`          | `target-counter(...)`   | `data-ref="sheet"` の参照の書式          |
