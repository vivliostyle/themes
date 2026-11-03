# @vivliostyle/theme-title-band-dropcap-profile

エッセイアンソロジー向けテーマ。ページ全周の枠罫、色ベタ帯の白抜き大題、ドロップキャップ、小口側の著者プロフィール欄で1篇を組む。篇はページを改めて始まり、本文はページをまたいで流れる。

## 使い方

```css
@import '@vivliostyle/theme-title-band-dropcap-profile';
```

## 原稿の書き方

- 1篇 = 1 entry (md ファイル)。`# 篇の大題` が色ベタ帯に、その直後の段落が著者名になる。どちらも柱へ流れる。
- 部扉は frontmatter に `class: part` を書く。大題の前に「第N部　」が base のドキュメントカウンタ (`vs-counter-part`) から付く。
- 著者プロフィールは `<aside class="sidebar">`。著者名の直後に置くと篇頭ページの小口側に回り込む。
- ドロップキャップは本文冒頭の1字を `<span class="dropcap">窓</span>` で囲む。
- 柱は篇頭ページのみ叢書名 (`--vs-theme-title-band-dropcap-profile--running-publication`)、以降のページは「大題　　著者名」。ノンブルは地の中央に自動で入る。
- 目次のページ番号は `<a class="toc-page" href="別ファイル.html#id"></a>` の `target-counter()` から生成する (VFM は `.md` リンクを書き換えないので `.html` で書く)。

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。

| 変数                                                        | 既定値                             | 説明                                         |
| ----------------------------------------------------------- | ---------------------------------- | -------------------------------------------- |
| `--vs-theme-title-band-dropcap-profile--color-accent`        | `--vs-color-foreground-alt` と同じ | 枠罫・大題帯・ドロップキャップのローズレッド |
| `--vs-theme-title-band-dropcap-profile--running-publication` | `env(pub-title)`                   | 篇頭ページの柱に出す叢書名                   |
