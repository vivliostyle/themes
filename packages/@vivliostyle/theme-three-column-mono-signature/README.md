# @vivliostyle/theme-three-column-mono-signature

AB判・3段組のAPIリファレンス向けテーマ。等幅のシグネチャ見出し・2列の引数表・淡青地のコード例を1エントリとして積み、小口に縦書きの章柱を置く。エントリはページをまたいで3段に流れる。

## 原稿の書き方

- 1 章 = 1 ファイルとし、frontmatter に `class: chapter` と柱に出す `title` を書く。
- 小口の章柱に出す章題は `<aside class="chapter-tab">章題</aside>` を本文先頭に置く。この要素自体は本文には流れず、`第<章番号>章　<章題>` として章柱に出る。
- エントリの見出しは `## signature(...) → 型 {#api-xxx}`。
- 他エントリへの参照は `[→ 名前](#api-xxx){data-ref=api}` (「→ 名前（p.12）」と展開)。地の文の中でページだけ添えるときは `名前<a href="#api-xxx" data-ref="api-page"></a>` を使う。ページ番号は `target-counter()` で解決されるので手書きしない。
- 図は `![キャプション](fig.svg){#fig-xxx}`。番号「図1-2」は章番号と図番号から生成される。参照は `<a href="#fig-xxx" data-ref="fig"></a>`。
- 空のアンカーの直後に欧文語が続くときは、VFM が空白を落とすので `&nbsp;` を置く。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-three-column-mono-signature',
};
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                          | 既定値                | 説明                               |
| ----------------------------- | --------------------- | ---------------------------------- |
| `--vs-font-family`            | `'Noto Sans JP', ...` | 本文書体                           |
| `--vs--monospace-font-family` | `'Roboto Mono', ...`  | シグネチャ・コードの等幅書体       |
| `--vs-color-foreground`             | `#1f1f1f`             | 本文の文字色                       |
| `--vs-theme-three-column-mono-signature--accent-color`           | `#0066cc`             | 見出し・章柱・リンクのアクセント色 |
| `--vs-color-foreground-alt`       | `#4a4a4a`             | 表見出し(th)の淡色                 |
| `--vs-theme-three-column-mono-signature--color-rule`      | `#c8ccd2`             | エントリ区切り罫の色               |
| `--vs-theme-three-column-mono-signature--color-code-bg`   | `#eef4fb`             | コード例の地色                     |
| `--vs-columns`                | `3`                   | 段数                               |

生成内容の変数:

| 変数                                | 既定値                                                         | 説明                           |
| ----------------------------------- | -------------------------------------------------------------- | ------------------------------ |
| `--vs-theme-three-column-mono-signature--chapter-tab-content`   | `'第' counter(vs-counter-chapter) '章　' string(chapter-name)` | 小口の章柱の内容               |
| `--vs-theme-three-column-mono-signature--api-page-call-content` | `'（p.' target-counter(attr(href), page) '）'`                 | エントリ参照に添えるページ番号 |

柱とノンブルは `--vs-page--mbox-top-*-content`、章柱の帯は `--vs-page--mbox-right-*` で変更できる。
