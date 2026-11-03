# @vivliostyle/theme-three-column-mono-signature

3段組のAPIリファレンス向けテーマ。等幅のシグネチャ見出し・2列の引数表・淡色地のコード例を1エントリとして積み、小口に縦書きの章柱を置く。エントリはページをまたいで3段に流れる。

## 原稿の書き方

- 1 章 = 1 ファイルとし、frontmatter に `class: chapter` と柱に出す `title` を書く。
- 小口の章柱に出す章題は `<aside class="chapter-tab">章題</aside>` を本文先頭に置く。この要素自体は本文には流れず、`第<章番号>章　<章題>` として章柱に出る。
- エントリの見出しは `## signature(...) → 型 {#api-xxx}`。
- 他エントリへの参照は `[→ 名前](#api-xxx){data-ref=api}` (「→ 名前（p.12）」と展開)。地の文の中でページだけ添えるときは `名前<a href="#api-xxx" data-ref="api-page"></a>` を使う。ページ番号は `target-counter()` で解決されるので手書きしない。
- 図は `![キャプション](fig.svg){#fig-xxx}`。番号「図1-2」は章番号と図番号から生成される。参照は `<a href="#fig-xxx" data-ref="fig"></a>`。
- 空のアンカーの直後に欧文語が続くときは、VFM が空白を落とすので `&nbsp;` を置く。

## 使い方

```css
@import '@vivliostyle/theme-three-column-mono-signature';
```

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。

| 変数                                                   | 既定値                                                    | 説明                               |
| ------------------------------------------------------ | --------------------------------------------------------- | ---------------------------------- |
| `--vs-theme-three-column-mono-signature--accent-color` | `--vs-color-foreground-alt` と同じ                        | 見出し・章柱・リンクのアクセント色 |
