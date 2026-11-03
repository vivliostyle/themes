# @vivliostyle/theme-three-column-title-bar-frame

3段組の超高密度な学会講演要旨集向けテーマ。白抜きタイトルバーとキーワードラベル、全周の枠罫、末尾の謝辞・注意事項ボックスを組む。

## 使い方

```css
@import '@vivliostyle/theme-three-column-title-bar-frame';
```

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。

| 変数                                   | 既定値                               | 説明                                       |
| -------------------------------------- | ------------------------------------ | ------------------------------------------ |
| `--vs-theme-three-column-title-bar-frame--color-accent`             | `--vs-color-foreground-alt` と同じ | タイトルバー・枠罫・強調文字のアクセント色 |
| `--vs-theme-three-column-title-bar-frame--entry-marker-size-inline` | `5mm`                                | 演題番号の枠幅 (題名のぶら下げ量)          |

## 原稿の書きかた

- 要旨 1 件が `## 題名` (h2)。演題番号は書かずカウンタに任せる。
- 各要旨の参考文献は `### 参考文献` (h3)。h3 には番号を付けない。
- セッションの開催情報は `<header>` に置き、セッション名は `<p class="session-title">` にする。この文字列が柱の右側に流れる。柱の左側は frontmatter の `title` (`env(doc-title)`)。
- 謝辞・注意事項・連絡先は末尾の `<footer>` に置く。`<footer>` の直前に見出しテキストの無い `##` の行を置くと、直前の演題のセクションが閉じる。
