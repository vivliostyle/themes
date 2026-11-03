# @vivliostyle/theme-one-record-page

1段組のアーキテクチャ決定記録 (ADR) 向けテーマ。細罫で囲んだ補足ノートとコードブロックで構成する。

## 原稿の書き方

- 1 レコード = 1 ファイルとし、frontmatter に `class: chapter` を書く。base のドキュメントカウンタ `vs-counter-chapter` がレコード番号になり、`ADR-015` のラベルと見出しの「決定記録15」を生成する。
- レコードの表題は `# 表題 {#adr-xxx}` と書く (番号は書かない)。番号を付けない見出しは閉じ `#` を付けて `# 見出し #` と書く。
- 他のレコードへの参照は `<a href="adr-xxx.html#adr-xxx" data-ref="adr"></a>` (「決定記録16」と展開)、番号だけが要る一覧表では `data-ref="adr-num"` (「16」と展開) を使う。
- 図は `![キャプション](fig.svg){#fig-xxx}`。番号「図17-1」はレコード番号と図番号から生成されるので手書きしない。参照は `<a href="#fig-xxx" data-ref="fig"></a>`。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-one-record-page',
};
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）と `--vs-color-background`（地色）から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                                  | 既定値                                                | 説明                             |
| ------------------------------------- | ----------------------------------------------------- | -------------------------------- |
| `--vs-font-family`                    | `'Noto Serif JP', ...`                                | 本文書体                         |
| `--vs-font-family-alt`                | `'Noto Sans JP', ...`                                 | メタ情報・キャプションの書体     |
| `--vs-font-family-monospace`          | `'IBM Plex Mono', ...`                                | レコード番号・コードの等幅書体   |
| `--vs-color-foreground`               | `#1c1c1c`                                             | 本文の文字色                     |
| `--vs-color-background`               | `#fbfaf7`                                             | 地色                             |
| `--vs-color-foreground-alt`           | `--vs-color-foreground` × `--vs-color-background` 30% | ステータス行・キャプションの淡色 |
| `--vs-color-border`                   | `--vs-color-foreground` × `--vs-color-background` 70% | 罫線・リストマーカーの色         |
| `--vs-color-background-alt`           | `--vs-color-foreground` × `--vs-color-background` 95% | 補足ノートの地色                 |
| `--vs-section--counter-style`         | `decimal`                                             | 見出し・参照に出すレコード番号の書式 |
| `--vs-section--h1-marker-content`     | `'決定記録' counter(vs-counter-chapter, …)`           | 表題の前に付くレコード番号       |
| `--vs-crossref-marker-counter-prefix` | `counter(vs-counter-chapter) '-'`                     | 図番号の前に付くレコード番号     |
| `--vs-crossref-call-counter-prefix`   | `target-counter(…) '-'`                               | 図の参照の前に付くレコード番号   |

表題の上の `ADR-015` は 3 桁ゼロ詰めのカウンタスタイル `vs-theme-adr-record` で生成する。
