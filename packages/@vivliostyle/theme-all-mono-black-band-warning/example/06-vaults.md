---
title: "Vault Operations"
lang: en
class: chapter
---

# Vault Operations

A vault is created in one region and stays there. Names are global to
the project, are between 3 and 63 characters, and may contain lowercase
letters, digits and single hyphens.

## GET /vaults

Lists the vaults of the project that the API key belongs to, in
creation order, oldest first. Vaults in every region are returned
regardless of which regional host served the request.

### Request Parameters

<div class="params">

| Name   | Type    | Required | Description                         |
| ------ | ------- | -------- | ----------------------------------- |
| limit  | integer | no       | 1 to 1000. Default 100.             |
| cursor | string  | no       | Cursor from a previous page.        |
| prefix | string  | no       | Return only names with this prefix. |
| region | string  | no       | Return only vaults in this region.  |

</div>

```
GET /v1/vaults?prefix=finance&limit=2 HTTP/1.1
Host: jp-east-1.api.kumoha.example
Authorization: Bearer km_live_x9f3d2c1a7b8e6f4d9c0b3a2e1f...
X-Kumoha-Trace: cli-20260701-0011
```

### Response

```
{
  "vaults": [
    {
      "name": "finance-archive",
      "region": "jp-east-1",
      "versioning": "enabled",
      "default_storage_class": "STANDARD",
      "object_count": 184203,
      "size": 4820139553,
      "lifecycle_rules": 3,
      "created_at": "2025-04-18T02:31:00Z",
      "description": "Monthly reports and the sheets behind them"
    },
    {
      "name": "finance-scratch",
      "region": "jp-west-2",
      "versioning": "disabled",
      "default_storage_class": "KASUMI",
      "object_count": 71,
      "size": 90112,
      "lifecycle_rules": 1,
      "created_at": "2026-02-02T11:07:41Z",
      "description": null
    }
  ],
  "truncated": false,
  "next_cursor": null,
  "count": 2
}
```

<div class="status">

| Status Code | Name                  | Description                            |
| ----------- | --------------------- | -------------------------------------- |
| 200         | OK                    | Listing returned, possibly empty.      |
| 400         | Bad Request           | limit out of range, or cursor expired. |
| 401         | Unauthorized          | Missing or invalid authentication.     |
| 403         | Forbidden             | Key is not granted vault.read.         |
| 500         | Internal Server Error | An unexpected error occurred.          |

</div>

## POST /vaults

Creates a vault. The name is permanent; the region is permanent; every
other field can be changed later from the console or by a lifecycle
request.

### Request Parameters

<div class="params">

| Name                  | Type   | Required | Description                                                                                 |
| --------------------- | ------ | -------- | ------------------------------------------------------------------------------------------- |
| name                  | string | yes      | 3 to 63 chars, lowercase.                                                                   |
| region                | string | yes      | Region ID from section <a href="03-overview.html#base-url-and-regions" data-ref="sec"></a>. |
| versioning            | string | no       | enabled or disabled.                                                                        |
| default_storage_class | string | no       | Class given to new objects.                                                                 |
| description           | string | no       | Free text, up to 256 chars.                                                                 |

</div>

```
POST /v1/vaults HTTP/1.1
Host: jp-east-1.api.kumoha.example
Authorization: Bearer km_live_x9f3d2c1a7b8e6f4d9c0b3a2e1f...
X-Kumoha-Idempotency: idm_01JZ8W6R4F8J3L5N7Q9S1U
Content-Type: application/json
Content-Length: 168

{
  "name": "finance-archive-2027",
  "region": "jp-east-1",
  "versioning": "enabled",
  "default_storage_class": "STANDARD",
  "description": "Opens with the 2027 fiscal year"
}
```

<div class="warning">
<h4>⚠ WARNING</h4>

A vault name cannot be reused for 30 days after the vault is deleted,
and a name that has ever held an object is never released to another
project. Choose names you can live with.

</div>

### Response

```
{
  "name": "finance-archive-2027",
  "region": "jp-east-1",
  "versioning": "enabled",
  "default_storage_class": "STANDARD",
  "object_count": 0,
  "size": 0,
  "lifecycle_rules": 0,
  "created_at": "2026-07-01T09:02:14Z",
  "description": "Opens with the 2027 fiscal year"
}
```

<div class="status">

| Status Code | Name                  | Description                                  |
| ----------- | --------------------- | -------------------------------------------- |
| 201         | Created               | Vault created in the requested region.       |
| 400         | Bad Request           | vault.name_invalid, or unknown region.       |
| 403         | Forbidden             | vault.limit_reached: 100 vaults per project. |
| 409         | Conflict              | vault.name_taken, or idempotency conflict.   |
| 500         | Internal Server Error | An unexpected error occurred.                |

</div>

## GET /vaults/<span>{vault}</span>

Returns one vault with its counters. Counters are refreshed every 60
seconds, so object_count and size lag writes; they are meant for
dashboards, not for reconciliation.

### Request Parameters

<div class="params">

| Name  | Type    | Required | Description                              |
| ----- | ------- | -------- | ---------------------------------------- |
| vault | string  | yes      | Vault name, in the path.                 |
| stats | boolean | no       | Include per-class breakdown. Default no. |

</div>

```
GET /v1/vaults/finance-archive?stats=true HTTP/1.1
Host: jp-east-1.api.kumoha.example
Authorization: Bearer km_live_x9f3d2c1a7b8e6f4d9c0b3a2e1f...
```

### Response

```
{
  "name": "finance-archive",
  "region": "jp-east-1",
  "versioning": "enabled",
  "default_storage_class": "STANDARD",
  "object_count": 184203,
  "size": 4820139553,
  "lifecycle_rules": 3,
  "created_at": "2025-04-18T02:31:00Z",
  "description": "Monthly reports and the sheets behind them",
  "stats": {
    "STANDARD": { "objects": 12044, "size": 1980114432 },
    "KASUMI":   { "objects": 71922, "size": 1440071168 },
    "SHIMO":    { "objects": 100237, "size": 1399953953 }
  },
  "counters_as_of": "2026-07-01T09:13:00Z"
}
```

<div class="status">

| Status Code | Name                  | Description                      |
| ----------- | --------------------- | -------------------------------- |
| 200         | OK                    | Vault returned.                  |
| 403         | Forbidden             | Key is not granted vault.read.   |
| 404         | Not Found             | vault.not_found in this project. |
| 500         | Internal Server Error | An unexpected error occurred.    |

</div>

## DELETE /vaults/<span>{vault}</span>

Deletes an empty vault. A vault holding objects, non-current versions
or unfinished multipart uploads is refused; empty it first, or pass
force and accept what that means.

### Request Parameters

<div class="params">

| Name  | Type    | Required | Description                          |
| ----- | ------- | -------- | ------------------------------------ |
| vault | string  | yes      | Vault name, in the path.             |
| force | boolean | no       | Delete contents as well. Default no. |

</div>

```
DELETE /v1/vaults/finance-scratch HTTP/1.1
Host: jp-west-2.api.kumoha.example
Authorization: Bearer km_live_x9f3d2c1a7b8e6f4d9c0b3a2e1f...
X-Kumoha-Idempotency: idm_01JZ8W7T5G9K4M6P8R0T2V
```

<div class="warning">
<h4>⚠ WARNING</h4>

force deletes every object, every non-current version and every open
upload in the vault, without a listing and without a confirmation
step. There is no undelete, and support cannot restore the contents.

</div>

### Response

A successful delete returns 204 with no body. The vault disappears from
listings at once; its name is held for 30 days.

<div class="status">

| Status Code | Name                  | Description                            |
| ----------- | --------------------- | -------------------------------------- |
| 204         | No Content            | Vault deleted.                         |
| 403         | Forbidden             | Key is not granted vault.write.        |
| 404         | Not Found             | vault.not_found in this project.       |
| 409         | Conflict              | vault.not_empty and force was not set. |
| 500         | Internal Server Error | An unexpected error occurred.          |

</div>
