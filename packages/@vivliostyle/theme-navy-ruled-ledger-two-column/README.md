# @vivliostyle/theme-navy-ruled-ledger-two-column

US letter・左右2段の貨物船航海日誌テーマ。ネイビーの番号付き見出しと罫囲みのレジャー式テーブルで、ワッチ単位の気象・航海データを刻む。

## 組み方

- 日誌の表題は `# 表題 #` (閉じ `#`) で書く。セクション化されないので記録番号を消費しない。
- `## 見出し` = 1 記録。改頁して起こし、中身は 2 段に流れる。量が増えれば次頁へ続く。`### 見出し` (船長所見など) は記録の枝番になる。
- 柱の左は `env(pub-title)` (vivliostyle.config.js の `title`)、右は原稿の `<p class="voyage">…</p>` から取る。どちらも版面には出ない。
- 記録の諸元行は `<p class="meta">DATE: … · MASTER: …</p>`、署名欄は `<p class="sign">SIGNED, MASTER</p>`。
- 表は `<figure class="tbl" id="…"><figcaption>表題</figcaption>` で包む。欄記号 (A・B…) は記録ごとに自動で振られるので表題に書かない。段を抜いて全幅に置きたい表は `class="tbl wide"`。
- 文章が入る欄は Markdown の左寄せ指定 (`| :--- |`) で示す。その欄だけ等幅をやめて地の文で組む。
- 合計・平均行は見出し語を `**Daily Mean**` のように太字にすると、上に区切り罫が入る。
- 参照は `<a href="#id" data-ref="sec"></a>` / `data-ref="tbl"`。直後に語が続くときは `&nbsp;` を置く (VFM が空要素直後の空白を落とすため)。

## 使い方

```js
// vivliostyle.config.js
export default {
  theme: '@vivliostyle/theme-navy-ruled-ledger-two-column',
};
```

## カスタマイズ

このテーマは [@vivliostyle/theme-base](../theme-base/README.md) の CSS 変数で構成されている。`:root` で `--vs-*` 変数を上書きしてカスタマイズできる。

| 変数                            | 既定値                 | 説明                                 |
| ------------------------------- | ---------------------- | ------------------------------------ |
| `--vs-font-family`              | `'Zilla Slab', ...`    | 本文書体                             |
| `--vs--heading-font-family`     | `'Roboto Slab', ...`   | 見出し・柱の表示書体                 |
| `--vs--monospace-font-family`   | `'IBM Plex Mono', ...` | テーブル数値の等幅書体               |
| `--vs-color-foreground`               | `#1c1c1c`              | 本文の文字色                         |
| `--vs-color-background`         | `#faf7f0`              | 地色                                 |
| `--vs-theme-navy-ruled-ledger-two-column--color-accent`      | `#1e5a96`              | 見出し・柱罫・テーブル外枠のネイビー |
| `--vs-theme-navy-ruled-ledger-two-column--color-tint`        | `#e8eff6`              | テーブルヘッダーの淡青地色           |
| `--vs-theme-navy-ruled-ledger-two-column--record-columns`    | `2`                    | 1 記録を流す段数                     |
| `--vs-theme-navy-ruled-ledger-two-column--record-column-gap` | `6mm`                  | 段間                                 |
