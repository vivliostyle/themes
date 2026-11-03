# @vivliostyle/theme-two-column-sidenote

左右2段組の学会拡張アブストラクト向けテーマ。Inter の番号付き見出しとアクセントカラー、サイドノート、段抜きの図表・疑似コードを組み合わせた高密度なレイアウトを作る。

## 使い方

```css
@import '@vivliostyle/theme-two-column-sidenote';
```

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略。

| 変数                                        | 既定値                         | 説明                                               |
| ------------------------------------------- | ------------------------------ | -------------------------------------------------- |
| `--vs-theme-two-column-sidenote--color-accent`                  | `--vs-color-foreground-alt` と同じ | 番号・短い水平罫・図の主系列に使うアクセント色     |
| `--vs-theme-two-column-sidenote--color-foreground-secondary`                   | `--vs-color-foreground` × `--vs-color-background` 40% | サイドノート・キャプション・参考文献の抑えた文字色 |
| `--vs-theme-two-column-sidenote--figure-full-width-size-inline` | `100%`                         | 段抜き図 (`.full-width`) の画像の幅                |

## 原稿の書きかた

- 見出しの番号は自動で付く。Markdown の見出しには番号を書かない。番号を付けたくない見出し (References など) は `## References ##` のように閉じ `#` を付けてセクション化を止める。
- 図は `![キャプション](fig.svg){#fig-id}`、本文からの参照は `<a href="#fig-id" data-ref="fig"></a>`。段抜きにする図は `{#fig-id .full-width}` を付けるとページ天のページフロートに送られる。
- 表は `<figure class="tbl" id="tbl-id">` で包み、`<figcaption>` にキャプションを書く (番号は自動)。段抜きにするなら `class="tbl wide-table"`。
- 節の参照は `<a href="#sec-id" data-ref="sec"></a>`、参考文献は `<ol class="cite-items">` + `<a href="#ref-id" data-ref="cite"></a>`。
- サイドノートは `<aside class="sidenote">`。番号はカウンタが付ける。
- VFM は空要素の直後に置いた空白を落とすため、参照リンクの直後に語が続くときは `<a href="#sec-id" data-ref="sec"></a>&nbsp;describes` のように `&nbsp;` を置く。直後が句読点なら不要。
