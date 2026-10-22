---
title: "Overview"
lang: en
class: chapter
---

# Overview

Kumoha Storage keeps immutable blobs, called objects, inside named
containers, called vaults. Every object is reachable over HTTPS with a
single key, and every write produces a new version that can be read
back until a lifecycle rule removes it.

## About This Reference

This booklet documents revision 1.8.2 of the Kumoha Storage HTTP API,
version v1, as deployed to region jp-east-1 on 2026-07-01. Endpoints
released after that date are not described here.

Every endpoint section follows the same shape: a one-paragraph summary,
a request parameter table, a wire-level request example, the response
body, and the status codes the endpoint may return. Endpoint-specific
error codes are listed with each endpoint; the full index is in
<a href="10-appendix.html#apx-errors" data-ref="apx"></a>.

## The Object Model

<div class="params">

| Term          | Description                                              |
| ------------- | -------------------------------------------------------- |
| project       | Billing and quota boundary. Owns vaults and API keys.    |
| vault         | Named container for objects. Lives in exactly 1 region.  |
| object        | Byte sequence plus metadata, addressed by a key.         |
| key           | UTF-8 path-like name, unique within a vault.             |
| version       | Immutable snapshot of an object, created on every write. |
| storage class | Durability and retrieval tier applied per object.        |

</div>

A vault name is chosen at creation and cannot be changed. Keys may
contain slashes, but Kumoha stores them as flat strings: a slash has no
meaning beyond being a byte in the key. Listing operations accept a
prefix and an optional delimiter to recover a directory-like view.

## Base URL and Regions

All requests go to a versioned base URL. The global host resolves to
the region that owns the vault named by the request; a regional host
skips that lookup and fails fast if the vault lives elsewhere.

```
https://api.kumoha.example/v1
https://jp-east-1.api.kumoha.example/v1
```

<div class="params">

| Region ID  | Location  | Regional host                 |
| ---------- | --------- | ----------------------------- |
| jp-east-1  | Tokyo     | jp-east-1.api.kumoha.example  |
| jp-west-2  | Osaka     | jp-west-2.api.kumoha.example  |
| jp-north-1 | Sapporo   | jp-north-1.api.kumoha.example |
| apac-se-1  | Singapore | apac-se-1.api.kumoha.example  |
| eu-west-3  | Dublin    | eu-west-3.api.kumoha.example  |

</div>

## Notation

Path segments in braces are placeholders: <span>{key}</span> stands for
a percent-encoded object key, <span>{vault}</span> for a vault name.
Header and field names are written exactly as they appear on the wire;
Kumoha header names are case-insensitive but are shown in the canonical
mixed case used by the console and the SDKs.

Bearer tokens, checksums and request identifiers in the examples are
truncated with an ellipsis where the full value adds nothing. Sizes are
binary: KiB is 1024 bytes, MiB is 1024 KiB.

<div class="warning">
<h4>⚠ WARNING</h4>

Examples in this booklet are written against region jp-east-1 with a
live key. Running them against a production vault will create, replace
or delete real objects. Use a `km_test_` key while reading along.

</div>

## Anatomy of an Example

Request examples are raw HTTP/1.1 as sent to the regional host, with
the request line, headers, a blank line, and the body. Response
examples show only the decoded JSON body; response headers are listed
separately in section <a href="05-common.html#common-response-headers" data-ref="sec"></a>&nbsp;because they are the same for every endpoint.

```
GET /v1/objects/report-2026.json HTTP/1.1
Host: jp-east-1.api.kumoha.example
Authorization: Bearer km_live_x9f3d2c1a7b8e6f4d9c0b3a2e1f...
X-Kumoha-Vault: finance-archive
```

## Client Libraries

The libraries below are maintained alongside the service and track the
revisions in <a href="10-appendix.html#apx-revisions" data-ref="apx"></a>. They differ only in surface: every one of them
sends the requests printed in this booklet, and none of them hides a
status code.

<div class="params">

| Language   | Package       | Notes                             |
| ---------- | ------------- | --------------------------------- |
| Go         | kumoha-go     | Streams parts without buffering.  |
| Python     | kumoha        | Sync and async clients.           |
| TypeScript | kumoha-client | Runs in Node and in the browser.  |
| Rust       | kumoha        | No async runtime is assumed.      |
| Shell      | kmh           | The console CLI. Reads a profile. |

</div>

Every library takes the key from the KUMOHA_API_KEY environment
variable when none is passed, and every one of them retries 429, 503
and 504 with the backoff described in section <a href="05-common.html#rate-limits-and-retries" data-ref="sec"></a>.

```
$ export KUMOHA_API_KEY=km_live_x9f3d2c1a7b8e6f4d9c0b3a2e1f...
$ kmh vault use finance-archive
$ kmh put report-2026.json --meta project=finance
report-2026.json  20481 bytes  v01_01JZ3F4K8Q6M9D5V7S1T2YB
```
