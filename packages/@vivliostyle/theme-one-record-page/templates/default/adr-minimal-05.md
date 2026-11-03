---
title: "差分応答の分割方式"
lang: ja
class: chapter
---

# 差分応答の分割方式 {#adr-chunking}

---

ステータス：置換済　2025-12-02（<a href="adr-minimal-07.html#adr-range-split" data-ref="adr"></a>が置換）

## 背景

<a href="adr-minimal-04.html#adr-storage" data-ref="adr"></a>の差分配信APIは、拠点が申告したリビジョンから最新までをまとめて返す。移行の直後は差分が大きく、応答が数MBに達する拠点があった。

移動体回線の60拠点では取得に数分を要し、次の取得と重なることがあった。

## 決定

応答を512KiBごとに区切り、gzipで圧縮して返す。続きは応答が示すトークンで取得する。

- 分割：本文512KiBごと
- 圧縮：gzip。既定で有効
- 続き：`GET /v1/config/diff?next=<token>`

```http title="分割応答のヘッダー"
HTTP/1.1 206 Partial Content
Content-Encoding: gzip
X-Config-Next: 8f21c4
```

## 結果

分割そのものは働き、1回あたりの取得は短くなった。ただし切断時の扱いに難が残り、移行の終わりまでに解けなかった。

- 切断すると途中から再開できず、先頭から取り直す
- トークンの寿命が短く、再接続までに失効する拠点があった
- 区切りがリビジョンの途中に来るため、届いた分を適用できない
- 圧縮の効きは拠点差が大きく、取得時間の見積りが立てにくい

<div class="note">

本記録は<a href="adr-minimal-07.html#adr-range-split" data-ref="adr"></a>により置換された。新規の実装は<a href="adr-minimal-07.html#adr-range-split" data-ref="adr"></a>に従うこと。

旧トークンの受け付けは、<a href="adr-minimal-07.html#adr-range-split" data-ref="adr"></a>の移行が終わるまで続ける。

</div>

<p class="xref">→<a href="adr-minimal-07.html#adr-range-split" data-ref="adr"></a>を参照</p>
