---
title: "常時接続によるpush配信"
lang: ja
class: chapter
---

# 常時接続によるpush配信 {#adr-push-delivery}

---

ステータス：却下　2025-09-16

## 背景

構成の変更を計測端末1,200拠点へ即時に反映するため、中継から常時接続を張る案が出た。

## 決定

常時接続によるpush配信は採用しない。

- 拠点の大半は事業者網のNAT配下にある
- 1,200接続を終端する中継層が新たに要る
- 即時性の要求は最大5分の遅延で満たせる

## 影響

- 伝送方式は<a href="adr-minimal-03.html#adr-transport" data-ref="adr"></a>で定める
- 反映の遅れを運用手引きに明記する
- 緊急時の即時取得は手作業で促す

<p class="xref">→<a href="adr-minimal-03.html#adr-transport" data-ref="adr"></a>を参照</p>
