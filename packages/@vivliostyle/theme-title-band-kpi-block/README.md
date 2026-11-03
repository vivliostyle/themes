# @vivliostyle/theme-title-band-kpi-block

横組み2段組の速報レポート向けテーマ。タイトルバンドとKPIブロック、2トーン棒グラフ、タブラー数字で揃えた表を組み合わせ、情報密度の高い速報資料の紙面を作る。

## 使い方

```css
@import '@vivliostyle/theme-title-band-kpi-block';
```

## 原稿の書き方

- 節見出し (`##`) には「1．」、項見出し (`###`) には「（1）」が自動で付く。原稿に番号を書かない。番号を付けたくない見出しは `### 見出し ###` と閉じ `#` を付けるか、生の `<h3>` で書く。
- 図表は `<figure>` で囲み `<figcaption>` を置くと「図1　」「表1　」が自動で付く。表は `<figure class="tbl">`、グラフは `<figure class="chart">` を使う。
- 本文からの参照は `<a href="#tbl-results" data-ref="tbl"></a>` / `data-ref="fig"` / `data-ref="sec"` と書く。番号・節名は参照先から生成されるので原稿には書かない。参照の直後に欧文が続く場合は `&nbsp;` を挟む (VFM が空要素直後の空白を落とすため)。
- 最終行が合計行の表には `<figure class="tbl sum-last">` を付けると総計行が強調される。
- 節への参照は「5．節題」のように番号と節題で組まれる。

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略。

| 変数                                     | 既定値                          | 説明                                         |
| ---------------------------------------- | ------------------------------- | -------------------------------------------- |
| `--vs-theme-title-band-kpi-block--color-accent`               | `--vs-color-foreground-alt` と同じ | タイトルバンド・KPI・見出しブロックの基調色  |
| `--vs-theme-title-band-kpi-block--color-accent-deep`          | `--vs-color-foreground-alt` × `--vs-color-foreground` 35% | 合計行の上罫・見出しブロック左帯などの濃色アクセント |
| `--vs-theme-title-band-kpi-block--color-foreground-secondary`                | `--vs-color-foreground` × `--vs-color-background` 30% | 凡例・補足テキストの色                       |
| `--vs-theme-title-band-kpi-block--table-label-size-inline`    | `34%`                           | 表の見出し列の幅 (表ごとに上書きする)        |
| `--vs-theme-title-band-kpi-block--table-sum-background-color` | `--vs-color-foreground-alt` × `--vs-color-background` 95% | 合計行の地色                                 |
