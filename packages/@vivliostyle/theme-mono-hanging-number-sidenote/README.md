# @vivliostyle/theme-mono-hanging-number-sidenote

A4判・全面モノスペースの大学教科書 (情報科学・プログラミング系) 向けテーマ。ハンギングの節番号見出しと、小口側の帯へ float で流す番号付き傍注が特徴。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-mono-hanging-number-sidenote',
};
```

原稿の書き方:

- 1 章 = 1 ファイルとし、frontmatter に `class: chapter` を書く。章番号 (`Chapter N`、節番号の頭、柱) は base のドキュメントカウンタ `vs-counter-chapter` から採る。
- 章題は `# 章題`、節は `## 節題 {#id}`。番号を付けない見出し (章末問題など) は `## 見出し ##` と閉じ `#` を付ける。
- 傍注は `<aside class="sidenote" id="sn-1">`、本文中の参照は `<a href="#sn-1" data-ref="sidenote"></a>`。番号は両方ともカウンタから振られる。
- 節の参照は `<a href="#id" data-ref="sec"></a>` (`§4.2` のように出る)。VFM は空要素の直後の空白を落とすので、続けて語が来る場合は `&nbsp;` を書く。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）と `--vs-color-background`（地色）から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                    | 既定値                              | 説明                                 |
| --------------------------------------- | ----------------------------------- | ------------------------------------ |
| `--vs-color-foreground` | `#111111` | 本文の文字色 |
| `--vs-color-background` | `#ffffff` | 紙面の地色 |
| `--vs-font-family`                      | `'IBM Plex Mono', ...`              | 本文・見出し共通の等幅書体           |
| `--vs-font-family-monospace`                 | `'JetBrains Mono', ...`             | コードブロックの書体                 |
| `--vs-color-foreground-alt`               | `--vs-color-foreground` × `--vs-color-background` 45% | コメント等の抑え色                   |
| `--vs-theme-mono-hanging-number-sidenote--color-lineno`              | `--vs-color-foreground` × `--vs-color-background` 60% | コードの行番号ガターの色             |
| `--vs-color-background-alt`             | `--vs-color-foreground` × `--vs-color-background` 95% | コードブロックの地色                 |
| `--vs-color-border`                | `--vs-color-foreground` × `--vs-color-background` 15% | 章扉・プルクオートの罫線色           |
| `--vs-theme-mono-hanging-number-sidenote--section-hang-size-inline`  | `14mm`                              | 節番号をハングさせる幅               |
| `--vs-theme-mono-hanging-number-sidenote--sidenote-band-size-inline` | `46mm`                              | 小口側に空ける傍注の帯の幅           |
| `--vs-sidenote--size-inline`            | `34mm`                              | 傍注そのものの幅                     |
| `--vs-sidenote--font-size`              | `6.8pt`                             | 傍注の文字サイズ                     |
| `--vs-theme-mono-hanging-number-sidenote--sidenote-marker-content`   | `counter(vs-counter-sidenote) '. '` | 傍注の頭に付く番号                   |
| `--vs-sidenote--call-content`           | `target-counter(...)`               | 本文中の傍注参照 (肩付き番号) の内容 |
| `--vs-sidenote--call-font-size`         | `0.7em`                             | 傍注参照の文字サイズ                 |

ノンブルは小口側の変数 `--vs-page--mbox-bottom-outside-content` で指定しているので、右ページでは右下、左ページでは左下に置かれる。片面で全ページ右下に揃えたい場合は `--vs-page--mbox-bottom-right-content: counter(page)` のように物理位置の変数で上書きする。
