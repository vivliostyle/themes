# @vivliostyle/theme-mono-hairline-two-column

2段組のデータシート向けテーマ。IBM Plex Mono の等幅本文と Roboto Mono のタブラー数字、極細罫で工業文書らしい高密度なレイアウトを組む。

## 組み方

- 節番号は `## 見出し` から自動で振る (`##` = 1, `###` = 1.1)。見出しに番号を書かない。
- 柱の中央は `env(doc-title)` (原稿の frontmatter `title`)、右はノンブル。
- 図は `<figure class="diagram">` などで包み、`<figcaption>` に説明だけを書く。頭の「Figure N.」はカウンタが付ける。図版幅は `diagram` / `chart` / `package` のクラスで決める。
- 表は `<figure class="tbl">` で包み、表の後ろに `<figcaption>` を置く。「Table N.」もカウンタが付ける。表を包む figure は段・頁をまたいで分割できる。
- コードフェンス (` ```text title="…" `) で組んだ一覧も表として数える。
- 参照は `<a href="#id" data-ref="fig"></a>` / `data-ref="tbl"`。直後 (および表セル内では直前) に語が続くときは `&nbsp;` を置く。VFM が空要素の隣の空白を落とすため。
- 節見出し直下の補足行は `<p class="lead">`、注記は `<p class="note">`。

## 使い方

```css
@import '@vivliostyle/theme-mono-hairline-two-column';
```
