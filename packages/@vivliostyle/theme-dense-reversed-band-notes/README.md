# @vivliostyle/theme-dense-reversed-band-notes

A4判・高密度な横書き2段組の学術批評誌テーマ。段を横断する白抜きの章見出し帯、番号付き節見出し、巻末の全幅3段組み注釈欄を組む。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-dense-reversed-band-notes',
};
```

## 原稿の書き方

- `# 章題` — 章番号は `vs-counter-sec-h1` が自動で振り、ページを改める。柱には「第N章　章題」が出る。
- `## 節題` — 「章.節」の番号が自動で付く。序・結など番号を振らない章・節は閉じ `#` を付けて `# 序　余白という主題 #` / `## 記録されざるものへ ##` と書く (VFM がセクションに包まないので番号が付かない)。番号を振らない章は section で包まれないぶん、本文全体を `<div class="chapter">` … `</div>` で括って 2 段組と改ページを掛ける。
- 章への参照は `<a href="#ch-id" data-ref="sec"></a>` と書くと「第一章」と組まれる。参照先の見出しには `# 章題 {#ch-id}` で id を付ける。
- 巻末注は VFM の `[^1]` 記法。注への相互参照は `<a href="#fn54" data-ref="note"></a>` と書くと「［→注54］」と組まれる。
- 空要素の参照の直後に語が続く場合は、VFM が空白を落とすため `&nbsp;` を置く (句読点が続く場合は不要)。

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

配色は `--vs-color-foreground`（文字色）・`--vs-color-background`（地色）・`--vs-color-foreground-alt`（アクセント色）の 3 色から導いている。既定値の「`A` × `B` n%」は `color-mix(in oklab, var(A), var(B) n%)` の略で、元になる色を上書きすれば淡色の地や罫の色も追従する。

| 変数                               | 既定値                 | 説明                                         |
| ---------------------------------- | ---------------------- | -------------------------------------------- |
| `--vs-color-foreground-alt` | `#34495e` | アクセント色 |
| `--vs-theme-dense-reversed-band-notes--color-accent`         | `--vs-color-foreground-alt` と同じ | 章見出し帯・柱・ノンブルの濃紺灰色           |
| `--vs-theme-dense-reversed-band-notes--color-foreground-secondary`          | `--vs-color-foreground-alt` × `--vs-color-background` 35% | 引用罫・注記・相互参照の淡色                 |
| `--vs-color-border`           | `--vs-color-foreground-alt` × `--vs-color-background` 65% | 段間罫・注領域の区切り罫の色                 |
| `--vs--blockquote-text-color`          | `--vs-color-foreground` × `--vs-color-background` 15% | 引用文の文字色                               |
| `--vs-font-family-alt`           | `'IBM Plex Sans', ...` | 節番号・参照番号・注番号の欧文書体           |
| `--vs-theme-dense-reversed-band-notes--running-publication`  | `env(doc-title)`       | 地の柱に出す誌名。誌名がある場合は上書きする |
| `--vs-theme-dense-reversed-band-notes--endnote-call-content` | `'［→注' ... '］'`     | 巻末注への相互参照の表記                     |
| `--vs-font-family`                 | `'Noto Sans JP', ...`  | 本文書体                                     |
| `--vs-color-foreground`                  | `#202326` | 本文の文字色                                 |
| `--vs-color-background`            | `#f7f5ef` | 地色                                         |

地の柱 (誌名とノンブル) は小口側の `--vs-page--mbox-bottom-outside-content` で指定しているので、右ページでは右下、左ページでは左下に置かれる。片面で右下に固定したい場合は `--vs-page--mbox-bottom-right-content` で上書きする。
