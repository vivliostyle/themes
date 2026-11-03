---
title: "差分応答の分割単位の見直し"
lang: ja
class: chapter
---

# 差分応答の分割単位の見直し {#adr-range-split}

---

ステータス：承認済　2026-01-20（<a href="adr-minimal-05.html#adr-chunking" data-ref="adr"></a>を置換）

## 背景

<a href="adr-minimal-05.html#adr-chunking" data-ref="adr"></a>のバイト長による分割は切断からの再開ができず、移動体回線の60拠点で取り直しが繰り返された。

<a href="adr-minimal-06.html#adr-apply-failure" data-ref="adr"></a>で適用の単位を1リビジョンと定めたため、分割の単位もこれに揃えるのが素直である。

## 決定

分割の単位をバイト長からリビジョン範囲へ変える。1応答は最大200リビジョンを含み、範囲の終端で必ず区切る。

- 単位：200リビジョンごと。バイト長では区切らない
- 続き：`GET /v1/config/diff?from=4213`
- 圧縮：gzipは据え置き。トークンは廃止する

```http title="範囲分割の応答"
HTTP/1.1 200 OK
Content-Encoding: gzip
X-Config-Range: 4014-4213
```

<div class="note">

範囲の既定値200は、移行の直後に観測した1日あたりのリビジョン数から決めた。運用の実績を見て見直す。

</div>

## 影響

各応答が範囲の終端で閉じるため、切断しても届いた範囲までは適用できる。

- 取り直しは範囲の単位で済み、先頭からの再取得はなくなる
- 拠点は自身のリビジョンだけで続きを取得でき、トークンを持たない
- <a href="adr-minimal-05.html#adr-chunking" data-ref="adr"></a>のトークンは移行の完了から90日で受け付けを止める
- 1応答が大きくなる拠点は、範囲を分けて数回に受け取る

<p class="xref">→<a href="adr-minimal-05.html#adr-chunking" data-ref="adr"></a>を置換</p>
