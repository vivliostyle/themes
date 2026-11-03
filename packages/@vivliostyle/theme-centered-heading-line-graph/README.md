# @vivliostyle/theme-centered-heading-line-graph

2段組の英文教科書向けテーマ。中央揃えの番号付き見出し、色付きヘッダーの表、折れ線グラフといったデータ多用の紙面を組む。

## 使い方

```css
@import '@vivliostyle/theme-centered-heading-line-graph';
```

原稿の書き方:

- 1 章 = 1 ファイルとし、frontmatter に `class: chapter` と章題 (`title`) を書く。章番号 (見出し・図表番号・柱) は base のドキュメントカウンタ `vs-counter-chapter` から採り、柱の左は章題 (`env(doc-title)`)、右は書名 (`env(pub-title)` = config の `title`) が入る。
- 節は `## 節題 {#id}`。番号を付けない見出しは `## 見出し ##` と閉じ `#` を付ける (節にならないので番号を消費しない)。章末のまとめ・練習問題は段組が節単位なので section を残す必要があり、`## 節題 {.closing}` と書くと番号だけが落ちる。
- 図は `![キャプション](fig.svg){#id}`、表は `<figure class="tbl" id="id">` で表と `<figcaption>` を包む。番号 (`Figure 7.1` / `Table 7.1`) はカウンタが振る。
- 参照は `<a href="#id" data-ref="fig|tbl|sec"></a>`。VFM は空要素の直後の空白を落とすので、続けて語が来る場合は `&nbsp;` を書く。
- 段抜きにする図表は `wide` クラスを付ける。図番号を持たないチャートは `<div class="chart">`、枠付きグラフは `<div class="panel">` で包む。

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略。

| 変数                             | 既定値                  | 説明                                     |
| -------------------------------- | ----------------------- | ---------------------------------------- |
| `--vs-theme-centered-heading-line-graph--color-accent`       | `--vs-color-foreground-alt` と同じ | 見出し番号・表ヘッダー・cross-ref の深緑 |
| `--vs-theme-centered-heading-line-graph--color-panel-bg`     | `--vs-color-foreground-alt` × `--vs-color-background` 95% | 図版パネルの地色                         |
