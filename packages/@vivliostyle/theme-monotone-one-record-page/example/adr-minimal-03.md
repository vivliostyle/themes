---
title: "構成配信の伝送方式"
lang: ja
class: chapter
---

# 構成配信の伝送方式 {#adr-transport}

---

ステータス：承認済　2025-09-30

## 背景

<a href="adr-minimal-02.html#adr-push-delivery" data-ref="adr"></a>で常時接続によるpushを却下した。拠点側から取りに行く方式を前提に、間隔と経路を定める。

拠点の回線は上りも下りも細く、うち60拠点は従量制の移動体回線である。

## 決定

拠点エージェントがHTTPSで5分ごとに取得する。自身のリビジョンを添えた条件付き要求とし、更新がなければ本文を返さない。

- 間隔：300秒。前後30秒の揺らぎを加える
- 経路：HTTPS。中継はリバースプロキシ1段
- 更新なし：204を返し、本文は送らない

```ini title="拠点エージェントの設定"
interval = 300s
jitter   = 30s
endpoint = https://cfg.nagiwa.example/v1
```

<div class="note">

揺らぎを加えるのは、停電からの復旧時に1,200拠点の要求が同時刻へ集まるのを避けるためである。

間隔の変更は、中継の受け口を増やさずに済む範囲で行う。

</div>

## 影響

更新の有無にかかわらず、拠点は5分ごとに中継へ要求を出す。

- 更新のない間の応答は本文を持たず、従量制回線の負担は小さい
- 中継が受ける要求は毎分240件程度に収まる
- 揺らぎの分、反映は最大5分30秒遅れる
- 取得する差分の形式と正本の所在は<a href="adr-minimal-04.html#adr-storage" data-ref="adr"></a>で定める

<p class="xref">→<a href="adr-minimal-04.html#adr-storage" data-ref="adr"></a>を参照</p>
