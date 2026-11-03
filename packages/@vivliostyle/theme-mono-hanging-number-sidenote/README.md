# @vivliostyle/theme-mono-hanging-number-sidenote

全面モノスペースの大学教科書向けテーマ。ハンギングの節番号見出しと、小口側の帯へ float で流す番号付き傍注が特徴。

## 使い方

```css
@import '@vivliostyle/theme-mono-hanging-number-sidenote';
```

原稿の書き方:

- 1 章 = 1 ファイルとし、frontmatter に `class: chapter` を書く。章番号 (`Chapter N`、節番号の頭、柱) は base のドキュメントカウンタ `vs-counter-chapter` から採る。
- 章題は `# 章題`、節は `## 節題 {#id}`。番号を付けない見出し (章末問題など) は `## 見出し ##` と閉じ `#` を付ける。
- 傍注は `<aside class="sidenote" id="sn-1">`、本文中の参照は `<a href="#sn-1" data-ref="sidenote"></a>`。番号は両方ともカウンタから振られる。
- 節の参照は `<a href="#id" data-ref="sec"></a>` (`§4.2` のように出る)。VFM は空要素の直後の空白を落とすので、続けて語が来る場合は `&nbsp;` を書く。

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略。

| 変数                                    | 既定値                              | 説明                                 |
| --------------------------------------- | ----------------------------------- | ------------------------------------ |
| `--vs-theme-mono-hanging-number-sidenote--color-lineno`              | `--vs-color-foreground` × `--vs-color-background` 60% | コードの行番号ガターの色             |
| `--vs-theme-mono-hanging-number-sidenote--section-hang-size-inline`  | `14mm`                              | 節番号をハングさせる幅               |
| `--vs-theme-mono-hanging-number-sidenote--sidenote-band-size-inline` | `46mm`                              | 小口側に空ける傍注の帯の幅           |
