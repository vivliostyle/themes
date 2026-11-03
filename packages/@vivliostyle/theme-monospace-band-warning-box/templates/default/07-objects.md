---
title: "Object Operations"
lang: en
class: chapter
---

# Object Operations

Object endpoints act on the vault named by X-Kumoha-Vault, or on the
home vault of the API key when the header is absent. The key travels in
the path and must be percent-encoded; a slash inside a key is encoded
as %2F, because Kumoha keys are flat strings and not paths.

## GET /objects/<span>{key}</span>

Returns the bytes of the current version of an object, or of the
version named by version_id. The response body is the object itself;
its metadata comes back in headers.

### Request Parameters

<div class="params">

| Name           | Type   | Required | Description                       |
| -------------- | ------ | -------- | --------------------------------- |
| key            | string | yes      | Object key, percent-encoded       |
| X-Kumoha-Vault | string | no       | Vault holding the object          |
| version_id     | string | no       | Read this version, not the latest |
| Range          | string | no       | Byte range, single range only     |
| If-None-Match  | string | no       | Return 304 when the etag matches  |

</div>

```
GET /v1/objects/report-2026.json HTTP/1.1
Host: jp-east-1.api.kumoha.example
Authorization: Bearer km_live_x9f3d2c1a7b8e6f4d9c0b3a2e1f...
X-Kumoha-Vault: finance-archive
Range: bytes=0-2047
If-None-Match: "9f8a6d3b2c1e7a5d4f6c3b2a1e9d7c0b"
```

### Response

Objects in the SHIMO class are not readable until they are restored;
see section <a href="09-lifecycle.html#post-objectskeyrestore" data-ref="sec"></a>. Reading one returns 409 and object.restore_required
without consuming the request from the read rate.

```
HTTP/1.1 206 Partial Content
Content-Type: application/json
Content-Length: 2048
Content-Range: bytes 0-2047/20481
ETag: "9f8a6d3b2c1e7a5d4f6c3b2a1e9d7c0b"
Last-Modified: Wed, 01 Jul 2026 09:14:00 GMT
X-Kumoha-Version-Id: v01_01JZ3F4K8Q6M9D5V7S1T2YB
X-Kumoha-Storage-Class: STANDARD
X-Kumoha-Checksum: sha256:8b6f0e9a8d2c1b7e6f4a3c2d1e9b0a7c...
X-Kumoha-Meta-Project: finance
X-Kumoha-Request-Id: req_01JZ8W4M7C2P5R9T1V3X6Y
```

<div class="status">

| Status Code | Name                  | Description                                    |
| ----------- | --------------------- | ---------------------------------------------- |
| 200         | OK                    | Whole object returned.                         |
| 206         | Partial Content       | Requested byte range returned.                 |
| 304         | Not Modified          | If-None-Match matched the current etag.        |
| 403         | Forbidden             | Key is not granted object.read.                |
| 404         | Not Found             | object.not_found, or object.version_not_found. |
| 409         | Conflict              | object.restore_required for a SHIMO object.    |
| 500         | Internal Server Error | An unexpected error occurred.                  |

</div>

## PUT /objects/<span>{key}</span>

Uploads or replaces an object identified by {key} in Kumoha Storage.
If the object already exists, it will be overwritten. The entire new
object must be sent in the request body.

### Request Parameters

<div class="params">

| Name            | Type    | Required | Description                       |
| --------------- | ------- | -------- | --------------------------------- |
| key             | string  | yes      | Object key (max 1024 bytes)       |
| X-Kumoha-Vault  | string  | no       | Vault that receives the object    |
| X-Kumoha-Region | string  | no       | Target region identifier          |
| Content-Type    | string  | yes      | MIME type of the request body     |
| Content-Length  | integer | yes      | Size of the request body in bytes |
| X-Kumoha-Meta-* | string  | no       | User-defined metadata (0 or more) |

</div>

```
PUT /v1/objects/report-2026.json HTTP/1.1
Host: api.kumoha.example
Authorization: Bearer km_live_x9f3d2c1a7b8e6f4d9c0b3a2e1f...
X-Kumoha-Vault: finance-archive
X-Kumoha-Region: jp-east-1
Content-Type: application/json
Content-Length: 112
X-Kumoha-Meta-Project: finance
X-Kumoha-Meta-Owner: team-analytics
X-Kumoha-Meta-Tags: report,monthly,2026
Expect: 100-continue

{
  "title": "Monthly Financial Report",
  "generated_at": "2026-07-01T09:00:00Z",
  "data": {
    "revenue": 1234567.89,
    "currency": "JPY"
  }
}
```

<div class="warning">
<h4>⚠ WARNING</h4>

PUT will overwrite the existing object if the key already exists.
This operation is irreversible. Ensure that you intend to replace
the object before sending the request.

</div>

### Response

If the request succeeds, the API returns 200 OK and a JSON document
describing the stored object.

```
{
  "key": "report-2026.json",
  "vault": "finance-archive",
  "etag": "9f8a6d3b2c1e7a5d4f6c3b2a1e9d7c0b",
  "version_id": "v01_01JZ3F4K8Q6M9D5V7S1T2YB",
  "size": 20481,
  "content_type": "application/json",
  "region": "jp-east-1",
  "storage_class": "STANDARD",
  "created_at": "2026-07-01T09:14:00Z",
  "updated_at": "2026-07-01T09:14:00Z",
  "owner": "team-analytics",
  "metadata": {
    "project": "finance",
    "tags": "report,monthly,2026"
  },
  "checksum": "sha256:8b6f0e9a8d2c1b7e6f4a3c2d1e9b0a7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0"
}
```

<div class="status">

| Status Code | Name                  | Description                                        |
| ----------- | --------------------- | -------------------------------------------------- |
| 200         | OK                    | Object stored successfully.                        |
| 400         | Bad Request           | Invalid request headers or body.                   |
| 401         | Unauthorized          | Missing or invalid authentication.                 |
| 403         | Forbidden             | Insufficient permissions for the operation.        |
| 404         | Not Found             | Specified key not found (for conditional headers). |
| 409         | Conflict              | Request could not be completed due to a conflict.  |
| 500         | Internal Server Error | An unexpected error occurred.                      |

</div>

## HEAD /objects/<span>{key}</span>

Returns the headers that GET would return, with no body. Use it to
read metadata, to test existence, and to learn the size of an object
before deciding how to fetch it.

### Request Parameters

<div class="params">

| Name           | Type   | Required | Description                       |
| -------------- | ------ | -------- | --------------------------------- |
| key            | string | yes      | Object key, percent-encoded       |
| X-Kumoha-Vault | string | no       | Vault holding the object          |
| version_id     | string | no       | Describe this version, not latest |

</div>

```
HEAD /v1/objects/report-2026.json HTTP/1.1
Host: jp-east-1.api.kumoha.example
Authorization: Bearer km_live_x9f3d2c1a7b8e6f4d9c0b3a2e1f...
X-Kumoha-Vault: finance-archive
```

### Response

```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 20481
ETag: "9f8a6d3b2c1e7a5d4f6c3b2a1e9d7c0b"
X-Kumoha-Version-Id: v01_01JZ3F4K8Q6M9D5V7S1T2YB
X-Kumoha-Storage-Class: STANDARD
X-Kumoha-Version-Count: 4
X-Kumoha-Request-Id: req_01JZ8W8V6H0M5P7R9T1W3Y
```

HEAD never carries an error body, so the code that a GET would have
returned is repeated in the X-Kumoha-Error-Code header on any status
of 400 or above.

<div class="status">

| Status Code | Name                  | Description                                    |
| ----------- | --------------------- | ---------------------------------------------- |
| 200         | OK                    | Headers returned; no body, as specified.       |
| 403         | Forbidden             | Key is not granted object.read.                |
| 404         | Not Found             | object.not_found, or object.version_not_found. |
| 500         | Internal Server Error | An unexpected error occurred.                  |

</div>

## DELETE /objects/<span>{key}</span>

Deletes an object. In a vault with versioning enabled the current
version is retired behind a delete marker and stays readable by
version_id; elsewhere the bytes go at once.

### Request Parameters

<div class="params">

| Name           | Type   | Required | Description                     |
| -------------- | ------ | -------- | ------------------------------- |
| key            | string | yes      | Object key, percent-encoded     |
| X-Kumoha-Vault | string | no       | Vault holding the object        |
| version_id     | string | no       | Delete one version permanently  |
| If-Match       | string | no       | Delete only if the etag matches |

</div>

```
DELETE /v1/objects/report-2026.json?version_id=v01_01JZ3F4K8Q6M9D5V7S1T2YB HTTP/1.1
Host: jp-east-1.api.kumoha.example
Authorization: Bearer km_live_x9f3d2c1a7b8e6f4d9c0b3a2e1f...
X-Kumoha-Vault: finance-archive
```

<div class="warning">
<h4>⚠ WARNING</h4>

A DELETE that names version_id is not reversible, even in a versioned
vault: it removes that version's bytes rather than adding a delete
marker. Omit version_id unless you mean to erase history.

</div>

### Response

A successful delete returns 204 with no body. The delete marker, if one
was written, is reported in X-Kumoha-Version-Id.

<div class="status">

| Status Code | Name                  | Description                                    |
| ----------- | --------------------- | ---------------------------------------------- |
| 204         | No Content            | Object or version deleted.                     |
| 403         | Forbidden             | Key is not granted object.delete.              |
| 404         | Not Found             | object.not_found, or object.version_not_found. |
| 412         | Precondition Failed   | If-Match did not match the current etag.       |
| 500         | Internal Server Error | An unexpected error occurred.                  |

</div>

## GET /objects

Lists the current versions of the objects in a vault, in key order.
With a delimiter, keys that share a segment collapse into a single
entry in prefixes, which is how a directory listing is built.

### Request Parameters

<div class="params">

| Name           | Type    | Required | Description                       |
| -------------- | ------- | -------- | --------------------------------- |
| X-Kumoha-Vault | string  | no       | Vault to list                     |
| prefix         | string  | no       | Return only keys with this prefix |
| delimiter      | string  | no       | Collapse keys after this string   |
| start_after    | string  | no       | Resume in key order after this    |
| limit          | integer | no       | 1 to 1000. Default 100.           |
| cursor         | string  | no       | Cursor from a previous page       |

</div>

```
GET /v1/objects?prefix=2026%2F&delimiter=%2F&limit=3 HTTP/1.1
Host: jp-east-1.api.kumoha.example
Authorization: Bearer km_live_x9f3d2c1a7b8e6f4d9c0b3a2e1f...
X-Kumoha-Vault: finance-archive
```

### Response

```
{
  "objects": [
    {
      "key": "2026/report-2026.json",
      "size": 20481,
      "etag": "9f8a6d3b2c1e7a5d4f6c3b2a1e9d7c0b",
      "version_id": "v01_01JZ3F4K8Q6M9D5V7S1T2YB",
      "storage_class": "STANDARD",
      "updated_at": "2026-07-01T09:14:00Z"
    },
    {
      "key": "2026/report-2026.sig",
      "size": 512,
      "etag": "4c2b7e1a9d3f6b8c0e5a7d2f4b6c8e0a",
      "version_id": "v01_01JZ3F5M0R7N2E6W8T3U4ZC",
      "storage_class": "KASUMI",
      "updated_at": "2026-07-01T09:14:03Z"
    }
  ],
  "prefixes": [
    "2026/quarterly/",
    "2026/sources/"
  ],
  "truncated": true,
  "next_cursor": "cur_01JZ8W5Q3E7H2K4M6P8R0T",
  "count": 2
}
```

<div class="status">

| Status Code | Name                  | Description                            |
| ----------- | --------------------- | -------------------------------------- |
| 200         | OK                    | Listing returned, possibly empty.      |
| 400         | Bad Request           | limit out of range, or cursor expired. |
| 403         | Forbidden             | Key is not granted object.read.        |
| 404         | Not Found             | vault.not_found in this project.       |
| 500         | Internal Server Error | An unexpected error occurred.          |

</div>

## POST /objects/<span>{key}</span>/copy

Copies an object server-side into the key in the path. Source and
destination may sit in different vaults of the same project, and in
different regions, in which case the copy is charged as egress.

### Request Parameters

<div class="params">

| Name               | Type   | Required | Description                    |
| ------------------ | ------ | -------- | ------------------------------ |
| key                | string | yes      | Destination key, in the path   |
| source_vault       | string | yes      | Vault holding the source       |
| source_key         | string | yes      | Key of the source object       |
| source_version_id  | string | no       | Copy this version, not latest  |
| metadata_directive | string | no       | copy or replace. Default copy. |
| storage_class      | string | no       | Class for the destination copy |

</div>

```
POST /v1/objects/2026%2Freport-2026.json/copy HTTP/1.1
Host: jp-east-1.api.kumoha.example
Authorization: Bearer km_live_x9f3d2c1a7b8e6f4d9c0b3a2e1f...
X-Kumoha-Vault: finance-archive
Content-Type: application/json
Content-Length: 174

{
  "source_vault": "finance-scratch",
  "source_key": "draft/report-2026.json",
  "metadata_directive": "replace",
  "storage_class": "STANDARD",
  "metadata": {
    "project": "finance",
    "tags": "report,monthly,2026"
  }
}
```

### Response

```
{
  "key": "2026/report-2026.json",
  "vault": "finance-archive",
  "etag": "9f8a6d3b2c1e7a5d4f6c3b2a1e9d7c0b",
  "version_id": "v01_01JZ8WA0X2C6F1J4M7P9S2U",
  "size": 20481,
  "storage_class": "STANDARD",
  "copied_from": {
    "vault": "finance-scratch",
    "key": "draft/report-2026.json",
    "version_id": "v01_01JZ7Q2B5D8G3K6N9R1T4W"
  },
  "created_at": "2026-07-01T09:21:37Z"
}
```

<div class="status">

| Status Code | Name                  | Description                                      |
| ----------- | --------------------- | ------------------------------------------------ |
| 200         | OK                    | Copy completed and a new version was written.    |
| 400         | Bad Request           | Unknown metadata_directive or storage class.     |
| 403         | Forbidden             | object.read on source or object.write on dest.   |
| 404         | Not Found             | Source vault, key or version does not exist.     |
| 413         | Payload Too Large     | Source exceeds the 512 MiB single-request limit. |
| 500         | Internal Server Error | An unexpected error occurred.                    |

</div>
