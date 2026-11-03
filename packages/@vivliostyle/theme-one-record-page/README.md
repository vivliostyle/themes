# @vivliostyle/theme-one-record-page

1段組のアーキテクチャ決定記録 (ADR) 向けテーマ。細罫で囲んだ補足ノートとコードブロックで構成する。

## 原稿の書き方

- 1 レコード = 1 ファイルとし、frontmatter に `class: chapter` を書く。base のドキュメントカウンタ `vs-counter-chapter` がレコード番号になり、`ADR-015` のラベルと見出しの「決定記録15」を生成する。
- レコードの表題は `# 表題 {#adr-xxx}` と書く (番号は書かない)。番号を付けない見出しは閉じ `#` を付けて `# 見出し #` と書く。
- 他のレコードへの参照は `<a href="adr-xxx.html#adr-xxx" data-ref="adr"></a>` (「決定記録16」と展開)、番号だけが要る一覧表では `data-ref="adr-num"` (「16」と展開) を使う。
- 図は `![キャプション](fig.svg){#fig-xxx}`。番号「図17-1」はレコード番号と図番号から生成されるので手書きしない。参照は `<a href="#fig-xxx" data-ref="fig"></a>`。

## 使い方

```css
@import '@vivliostyle/theme-one-record-page';
```
