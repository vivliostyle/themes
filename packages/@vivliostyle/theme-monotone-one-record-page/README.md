# @vivliostyle/theme-monotone-one-record-page

新書判 (105×173mm)・1段組・モノトーンのアーキテクチャ決定記録 (ADR) 向けテーマ。細罫で囲んだ補足ノートとコードブロックで構成する。

## 原稿の書き方

- 1 レコード = 1 ファイルとし、frontmatter に `class: chapter` を書く。base のドキュメントカウンタ `vs-counter-chapter` がレコード番号になり、`ADR-015` のラベルと見出しの「決定記録15」を生成する。
- レコードの表題は `# 表題 {#adr-xxx}` と書く (番号は書かない)。番号を付けない見出しは閉じ `#` を付けて `# 見出し #` と書く。
- 他のレコードへの参照は `<a href="adr-xxx.html#adr-xxx" data-ref="adr"></a>` (「決定記録16」と展開)、番号だけが要る一覧表では `data-ref="adr-num"` (「16」と展開) を使う。
- 図は `![キャプション](fig.svg){#fig-xxx}`。番号「図17-1」はレコード番号と図番号から生成されるので手書きしない。参照は `<a href="#fig-xxx" data-ref="fig"></a>`。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-monotone-one-record-page',
};
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                          | 既定値                 | 説明                             |
| ----------------------------- | ---------------------- | -------------------------------- |
| `--vs-font-family`            | `'Noto Serif JP', ...` | 本文書体                         |
| `--vs-font-family-alt`  | `'Noto Sans JP', ...`  | メタ情報・キャプションの書体     |
| `--vs--monospace-font-family` | `'IBM Plex Mono', ...` | レコード番号・コードの等幅書体   |
| `--vs-color-foreground`             | `#1c1c1c`              | 本文の文字色                     |
| `--vs-color-background`       | `#fbfaf7`              | 地色                             |
| `--vs-color-foreground-alt`       | `#5c5a55`              | ステータス行・キャプションの淡色 |
| `--vs-theme-monotone-one-record-page--color-rule`      | `#b5b3ae`              | 罫線・リストマーカーの色         |
| `--vs-theme-monotone-one-record-page--color-note-bg`   | `#f1efea`              | 補足ノートの地色                 |

レコード番号まわりの変数:

| 変数                                  | 既定値                                  | 説明                                 |
| ------------------------------------- | --------------------------------------- | ------------------------------------ |
| `--vs-theme-monotone-one-record-page--record-counter-style`    | `decimal`                               | 本文・見出しに出すレコード番号の書式 |
| `--vs-theme-monotone-one-record-page--record-id-counter-style` | `vs-theme-adr-record` (3桁ゼロ詰め)     | `ADR-015` ラベルの番号書式           |
| `--vs-theme-monotone-one-record-page--record-label-content`    | `'ADR-' counter(vs-counter-chapter, …)` | 表題の上に置くレコード ID            |
| `--vs-theme-monotone-one-record-page--record-label-display`    | `block`                                 | レコード ID の表示 (`none` で消す)   |
| `--vs-theme-monotone-one-record-page--record-call-content`     | `'決定記録' target-counter(…)`          | `data-ref="adr"` の参照文字列        |
| `--vs-theme-monotone-one-record-page--record-num-call-content` | `target-counter(…)`                     | `data-ref="adr-num"` の参照文字列    |

見出しの採番は base の `--vs-section--h1-marker-*`、図番号は `--vs-figure--marker-content` (参照は `--vs-figure--call-content`) で変更できる。
