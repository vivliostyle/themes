# @vivliostyle/theme-monospace-entry-form

手帳向けの記録フォームテーマ。等幅組みで記入欄・記録表・NOTES 罫を 1 枚ずつに収める。

## 組み方

- `# 用紙名` = 記録 1 枚 = 1 ページ。見出しの右肩に `No. 001` の通し番号が自動で入る (`##` の見出しと `## NOTES {.notes}` は用紙の中の欄)。
- 総括や記入例など通し番号を持たない用紙は、見出しに `<span class="no">…</span>` を書き入れる。その用紙は番号を消費しない。
- 他の用紙の番号を引くには `<a href="#id" data-ref="sheet"></a>`。用紙の見出しに `{#id}` を振っておく。
- 記入欄は `<div class="field"><dl><dt>ラベル</dt><dd>記入値</dd></dl>…</div>`。1 つの `dl` に 2 組まで並ぶ。記入値が長いときは折り返し、記入罫はその行の下端で揃う。
- 記録表の欄の寄せは Markdown の桁揃え指定 (`:---` / `:-:` / `---:`) で決める。空欄の行は `&nbsp;` を並べる。
- NOTES の段落・箇条書き・`<p class="rule">&nbsp;</p>` はすべて記入罫になる。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-monospace-entry-form',
};
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。通し番号を途中から起こすには base の `--vs-section--root-counter-sec-h1` に開始値の 1 つ手前を与える。

配色は `--vs-color-foreground`（文字色）・`--vs-color-background`（地色）・`--vs-color-foreground-alt`（アクセント色）の 3 色から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                             | 既定値                                                    | 説明                               |
| ------------------------------------------------ | --------------------------------------------------------- | ---------------------------------- |
| `--vs-color-foreground-alt`                      | `#27ae60`                                                 | アクセント色                       |
| `--vs-font-family`                               | `'JetBrains Mono', ...`                                   | 本文書体 (等幅)                    |
| `--vs-color-foreground`                          | `#1c7a46`                                                 | 記入インクの色                     |
| `--vs-color-background`                          | `#fbfbf8`                                                 | 地色                               |
| `--vs-theme-monospace-entry-form--color-accent` | `--vs-color-foreground-alt` と同じ                        | 見出し・罫・表の外枠のアクセント色 |
| `--vs--th-background-color`                      | `--vs-color-foreground-alt` × `--vs-color-background` 95% | 記録表のヘッダーの淡緑地色         |
| `--vs-color-border`                              | `--vs-color-foreground` × `--vs-color-background` 70%     | NOTES 記入罫の色                   |
