# @vivliostyle/theme-chapter-badge-column-rule

実用ガイドブック向けの2段組テーマ。ゴシック本文に章番号バッジ・段間罫・情報ボックス・料金表を組み合わせ、図版とDATA欄、コースのフローを配置する。

## 使い方

```css
@import '@vivliostyle/theme-chapter-badge-column-rule';
```

## 原稿の書き方

章 (`#`) と小見出し (`##`) の番号はカウンタで自動的に付く。原稿には番号を書かない。

```md
# 章題<span class="subhead">欧文サブ</span>

## 小見出し {#sec-id}

## データ欄 {.data-box}

## コース {.course}

## 料金表 {.fee}
```

- DATA欄・コース・料金表の定型枠 (`{.data-box}` / `{.course}` / `{.fee}`) は小見出しの番号を消費しない。
- そのほかに番号を付けたくない見出しは `## 見出し ##` と閉じ `#` を付ける (節にならないので番号を消費しない)。
- 図には `![キャプション](fig.svg){#fig-map}` のように id を付け、本文からは `<a href="#fig-map" data-ref="fig"></a>` で参照する。図番号は自動で付く。
- 「→ P.**」の相互参照は `<p class="ref"><a href="#sec-id" data-ref="page"></a></p>`。参照先のページ番号が自動で入る。
- 柱には `vivliostyle.config.js` の `title` (シリーズ名) が出る。

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。

| 変数                               | 既定値                                                      | 説明                                               |
| ---------------------------------- | ----------------------------------------------------------- | -------------------------------------------------- |
| `--vs-theme-chapter-badge-column-rule--color-accent`         | `--vs-color-foreground-alt` と同じ | 章番号バッジ・段間罫・情報ボックス枠のアクセント色 |
| `--vs-theme-chapter-badge-column-rule--font-caption`         | `'M PLUS 1p', ...`                                          | データ欄・表の書体                                 |
