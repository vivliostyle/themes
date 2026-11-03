---
title: "Versioning and Lifecycle"
lang: en
class: chapter
---

# Versioning and Lifecycle

In a versioned vault every write keeps the version it replaced. Reads
without a version_id always see the newest one; everything older is
non-current and stays until a lifecycle rule expires it.

## GET /objects/<span>{key}</span>/versions

Lists the versions of one key, newest first, including delete markers.
The current version is the first entry unless the key has been deleted,
in which case it is the first entry after the marker.

### Request Parameters

<div class="params">

| Name           | Type    | Required | Description                 |
| -------------- | ------- | -------- | --------------------------- |
| key            | string  | yes      | Object key, percent-encoded |
| X-Kumoha-Vault | string  | no       | Vault holding the object    |
| limit          | integer | no       | 1 to 1000. Default 100.     |
| cursor         | string  | no       | Cursor from a previous page |

</div>

```
GET /v1/objects/report-2026.json/versions?limit=3 HTTP/1.1
Host: jp-east-1.api.kumoha.example
Authorization: Bearer km_live_x9f3d2c1a7b8e6f4d9c0b3a2e1f...
X-Kumoha-Vault: finance-archive
```

### Response

```
{
  "key": "report-2026.json",
  "vault": "finance-archive",
  "versions": [
    {
      "version_id": "v01_01JZ3F4K8Q6M9D5V7S1T2YB",
      "current": true,
      "delete_marker": false,
      "size": 20481,
      "etag": "9f8a6d3b2c1e7a5d4f6c3b2a1e9d7c0b",
      "storage_class": "STANDARD",
      "created_at": "2026-07-01T09:14:00Z"
    },
    {
      "version_id": "v01_01JZ0P8N2H5K9C3F7B1D4XA",
      "current": false,
      "delete_marker": false,
      "size": 20390,
      "etag": "2e5b8d1f4a7c0e3b6d9f2a5c8e1b4d7f",
      "storage_class": "KASUMI",
      "created_at": "2026-06-01T09:12:57Z"
    }
  ],
  "truncated": false,
  "next_cursor": null,
  "count": 2
}
```

<div class="status">

| Status Code | Name                  | Description                                     |
| ----------- | --------------------- | ----------------------------------------------- |
| 200         | OK                    | Version listing returned.                       |
| 403         | Forbidden             | Key is not granted object.read.                 |
| 404         | Not Found             | object.not_found, and no versions remain.       |
| 409         | Conflict              | Versioning has never been enabled on the vault. |
| 500         | Internal Server Error | An unexpected error occurred.                   |

</div>

## POST /objects/<span>{key}</span>/restore

Brings a SHIMO object back within reach of GET for a fixed number of
days. The restored copy is a temporary read cache: the object stays in
SHIMO, and the copy disappears when the window closes.

### Request Parameters

<div class="params">

| Name           | Type    | Required | Description                      |
| -------------- | ------- | -------- | -------------------------------- |
| key            | string  | yes      | Object key, percent-encoded      |
| X-Kumoha-Vault | string  | no       | Vault holding the object         |
| version_id     | string  | no       | Restore this version, not latest |
| days           | integer | yes      | 1 to 30. Length of the window.   |
| tier           | string  | no       | standard or express              |

</div>

```
POST /v1/objects/2024%2Fledger.tar/restore HTTP/1.1
Host: jp-east-1.api.kumoha.example
Authorization: Bearer km_live_x9f3d2c1a7b8e6f4d9c0b3a2e1f...
X-Kumoha-Vault: finance-archive
Content-Type: application/json
Content-Length: 38

{
  "days": 7,
  "tier": "express"
}
```

### Response

```
{
  "key": "2024/ledger.tar",
  "vault": "finance-archive",
  "version_id": "v01_01JY4B7C0F3H6K9M2P5R8T",
  "restore": {
    "state": "in_progress",
    "tier": "express",
    "requested_at": "2026-07-01T09:40:00Z",
    "available_after": "2026-07-01T10:55:00Z",
    "expires_at": "2026-07-08T10:55:00Z"
  }
}
```

Repeating the request while a restore is running extends the window
and answers 200 with the same available_after. Repeating it with a
different tier is rejected.

<div class="status">

| Status Code | Name                  | Description                                      |
| ----------- | --------------------- | ------------------------------------------------ |
| 200         | OK                    | Restore started, or the window was extended.     |
| 400         | Bad Request           | days out of range, or unknown tier.              |
| 403         | Forbidden             | Key is not granted lifecycle.write.              |
| 404         | Not Found             | object.not_found, or object.version_not_found.   |
| 409         | Conflict              | Object is not in SHIMO, or the tier was changed. |
| 500         | Internal Server Error | An unexpected error occurred.                    |

</div>

## PUT /vaults/<span>{vault}</span>/lifecycle

Replaces the whole rule set of a vault. There is no partial update:
send every rule you want to keep, or send an empty array to stop all
automatic transitions and expirations.

### Request Parameters

<div class="params">

| Name  | Type   | Required | Description                              |
| ----- | ------ | -------- | ---------------------------------------- |
| vault | string | yes      | Vault name, in the path                  |
| rules | array  | yes      | Up to 20 rules. Empty array clears them. |

</div>

Each rule needs an id that is unique within the vault, and exactly one
action: transition, expiration, noncurrent_expiration or
upload_expiration. Rules with overlapping prefixes and the same action
are rejected with lifecycle.rule_conflict.

```
PUT /v1/vaults/finance-archive/lifecycle HTTP/1.1
Host: jp-east-1.api.kumoha.example
Authorization: Bearer km_live_x9f3d2c1a7b8e6f4d9c0b3a2e1f...
Content-Type: application/json
Content-Length: 472

{
  "rules": [
    {
      "id": "cool-after-30",
      "prefix": "2026/",
      "enabled": true,
      "transition": { "after_days": 30, "storage_class": "KASUMI" }
    },
    {
      "id": "archive-after-180",
      "prefix": "2026/",
      "enabled": true,
      "transition": { "after_days": 180, "storage_class": "SHIMO" }
    },
    {
      "id": "trim-history",
      "enabled": true,
      "noncurrent_expiration": { "after_days": 90, "keep_versions": 5 }
    },
    {
      "id": "abort-stale-uploads",
      "enabled": true,
      "upload_expiration": { "after_days": 3 }
    }
  ]
}
```

<div class="warning">
<h4>⚠ WARNING</h4>

Rules are evaluated once a day and delete without asking. A rule whose
prefix is wider than you intended can empty a vault overnight; test it
on a `km_test_` vault before sending it to a live one.

</div>

### Response

```
{
  "vault": "finance-archive",
  "rules": 4,
  "next_evaluation_at": "2026-07-02T15:00:00Z",
  "updated_at": "2026-07-01T09:44:21Z"
}
```

<div class="status">

| Status Code | Name                  | Description                                     |
| ----------- | --------------------- | ----------------------------------------------- |
| 200         | OK                    | Rule set replaced.                              |
| 400         | Bad Request           | lifecycle.too_many_rules, or an unknown action. |
| 403         | Forbidden             | Key is not granted lifecycle.write.             |
| 404         | Not Found             | vault.not_found in this project.                |
| 409         | Conflict              | lifecycle.rule_conflict between two rules.      |
| 500         | Internal Server Error | An unexpected error occurred.                   |

</div>

## Storage Classes

<div class="params">

| Class    | Read latency      | Minimum billed | Restore needed |
| -------- | ----------------- | -------------- | -------------- |
| STANDARD | immediate         | none           | no             |
| KASUMI   | immediate         | 30 days        | no             |
| SHIMO    | 3 to 12 h, or 1 h | 90 days        | yes            |

</div>

KASUMI, the thin-mist class, is for objects that are read a few times
a year: reads cost more per request but storage costs less. SHIMO, the
frost class, is offline; a GET against it fails until a restore has
completed, at the standard tier in 3 to 12 hours and at the express
tier within the hour.

Deleting or replacing an object before its minimum billed period ends
is charged for the remainder of that period. A transition from KASUMI
to SHIMO restarts the clock at 90 days.
