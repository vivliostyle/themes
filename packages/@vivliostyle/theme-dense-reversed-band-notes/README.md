# @vivliostyle/theme-dense-reversed-band-notes

高密度な横書き2段組の学術批評誌テーマ。段を横断する白抜きの章見出し帯、番号付き節見出し、巻末の全幅3段組み注釈欄を組む。

## 使い方

```css
@import '@vivliostyle/theme-dense-reversed-band-notes';
```

## 原稿の書き方

- `# 章題` — 章番号は `vs-counter-sec-h1` が自動で振り、ページを改める。柱には「第N章　章題」が出る。
- `## 節題` — 「章.節」の番号が自動で付く。序・結など番号を振らない章・節は閉じ `#` を付けて `# 序　余白という主題 #` / `## 記録されざるものへ ##` と書く (VFM がセクションに包まないので番号が付かない)。番号を振らない章は section で包まれないぶん、本文全体を `<div class="chapter">` … `</div>` で括って 2 段組と改ページを掛ける。
- 章への参照は `<a href="#ch-id" data-ref="sec"></a>` と書くと「第一章」と組まれる。参照先の見出しには `# 章題 {#ch-id}` で id を付ける。
- 巻末注は VFM の `[^1]` 記法。注への相互参照は `<a href="#fn54" data-ref="note"></a>` と書くと「［→注54］」と組まれる。
- 空要素の参照の直後に語が続く場合は、VFM が空白を落とすため `&nbsp;` を置く (句読点が続く場合は不要)。

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略。

| 変数                               | 既定値                 | 説明                                         |
| ---------------------------------- | ---------------------- | -------------------------------------------- |
| `--vs-theme-dense-reversed-band-notes--color-accent`         | `--vs-color-foreground-alt` と同じ | 章見出し帯・柱・ノンブルの濃紺灰色           |
| `--vs-theme-dense-reversed-band-notes--color-foreground-secondary`          | `--vs-color-foreground-alt` × `--vs-color-background` 35% | 引用罫・注記・相互参照の淡色                 |
| `--vs-theme-dense-reversed-band-notes--running-publication`  | `env(doc-title)`       | 地の柱に出す誌名。誌名がある場合は上書きする |
