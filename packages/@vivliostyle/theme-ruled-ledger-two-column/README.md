# @vivliostyle/theme-ruled-ledger-two-column

左右2段の日誌テーマ。番号付き見出しと罫囲みのレジャー式テーブルで、時間帯ごとの記録を刻む。

## 組み方

- 日誌の表題は `# 表題 #` (閉じ `#`) で書く。セクション化されないので記録番号を消費しない。
- `## 見出し` = 1 記録。改頁して起こし、中身は 2 段に流れる。量が増えれば次頁へ続く。`### 見出し` (所見など) は記録の枝番になる。
- 柱の左は `env(pub-title)` (vivliostyle.config.js の `title`)、右は原稿の `<p class="voyage">…</p>` から取る。どちらも版面には出ない。
- 記録の諸元行は `<p class="meta">DATE: … · MASTER: …</p>`、署名欄は `<p class="sign">SIGNED, MASTER</p>`。
- 表は `<figure class="tbl" id="…"><figcaption>表題</figcaption>` で包む。欄記号 (A・B…) は記録ごとに自動で振られるので表題に書かない。段を抜いて全幅に置きたい表は `class="tbl wide"`。
- 文章が入る欄は Markdown の左寄せ指定 (`| :--- |`) で示す。その欄だけ等幅をやめて地の文で組む。
- 合計・平均行は見出し語を `**Daily Mean**` のように太字にすると、上に区切り罫が入る。
- 参照は `<a href="#id" data-ref="sec"></a>` / `data-ref="tbl"`。直後に語が続くときは `&nbsp;` を置く (VFM が空要素直後の空白を落とすため)。

## 使い方

```css
@import '@vivliostyle/theme-ruled-ledger-two-column';
```

## カスタマイズ

`:root` で以下の変数を上書きしてカスタマイズできる。

| 変数                            | 既定値                 | 説明                                 |
| ------------------------------- | ---------------------- | ------------------------------------ |
| `--vs-theme-ruled-ledger-two-column--color-accent`      | `--vs-color-foreground-alt` と同じ | 見出し・柱罫・テーブル外枠のネイビー |
