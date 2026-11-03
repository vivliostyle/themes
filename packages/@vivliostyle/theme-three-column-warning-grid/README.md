# @vivliostyle/theme-three-column-warning-grid

1シートの安全重視型テーマ。チェック表・工程・警告枠を3段グリッドで並べ、アクセントカラーを警告・確認マーカー・重要罫線に限定して使うことで、誤読なき安全確認を最優先したレイアウトを組む。

## 使い方

```css
@import '@vivliostyle/theme-three-column-warning-grid';
```

## 原稿の書き方

- `# シート名` (h1 セクション) が 1 シート = 1 ページになる。シート番号は見出しの順序から自動で振られるので、見出しに番号を書かない。
- シート内の枠は `## 見出し {.hd-ingredient}` (チェック表)、`{.hd-method}` (工程)、`{.hd-nutrition}` (全幅の数値表) で指定する。写真・諸元表・警告枠は `<div class="col">` にまとめると先頭トラックに入る。
- 工程 (`.hd-method` 内の `ol`) の番号はカウンタが振る。原稿に「1.」以外の手書き番号を書かない。
- 他シートの参照は `<a href="#sheet-id" data-ref="sheet"></a>` と書く。番号は参照先から解決される。参照の直後に語が続く場合は `&nbsp;` を挟む (VFM が空インライン要素直後の空白を落とすため)。

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略。

| 変数                               | 既定値                                                        | 説明                                   |
| ---------------------------------- | ------------------------------------------------------------- | -------------------------------------- |
| `--vs-theme-three-column-warning-grid--sheet-call-content`   | `'sheet ' target-counter(attr(href), vs-counter-sec-h1, ...)` | `data-ref="sheet"` の参照文字列        |
| `--vs-theme-three-column-warning-grid--color-accent`         | `--vs-color-foreground-alt` と同じ | 警告・確認マーカー・重要罫線の赤       |
| `--vs-theme-three-column-warning-grid--color-alert-rule`     | `--vs-color-foreground-alt` × `--vs-color-background` 70% | 警告枠内の区切り罫の色                 |
