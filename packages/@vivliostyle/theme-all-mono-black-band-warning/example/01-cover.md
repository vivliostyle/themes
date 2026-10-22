---
title: "Kumoha Storage API Reference"
lang: en
class: cover
---

# Kumoha Storage

<p class="cover-sub">API REFERENCE</p>

<p class="cover-edition">HTTP API v1 / revision 1.8.2 / 2026-07 edition</p>

```
$ curl -X PUT https://api.kumoha.example/v1/objects/report-2026.json \
       -H "Authorization: Bearer km_live_x9f3d2c1a7b8e6f4d9c0b3a2e1f..." \
       -H "X-Kumoha-Vault: finance-archive" \
       -H "Content-Type: application/json" \
       --data-binary @report-2026.json
```

<div class="cover-box">
<h4>WHAT THIS BOOKLET COVERS</h4>

Every endpoint of the Kumoha Storage HTTP API as published on
2026-07-01: vaults, objects, multipart uploads, versioning and
lifecycle, with the complete error code index in <a href="10-appendix.html#apx-errors" data-ref="apx"></a>.

</div>

<p class="cover-imprint">KUMOHA KENKYUKAI<br />TECHNICAL BOOK MARKET 15 / 2026-07</p>
