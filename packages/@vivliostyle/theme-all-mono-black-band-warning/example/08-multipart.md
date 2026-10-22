---
title: "Multipart Uploads"
lang: en
class: chapter
---

# Multipart Uploads

Objects larger than the 512 MiB single-request limit are written in
parts. An upload is opened against a key, parts are sent in any order
and from any number of clients, and a completion call stitches them
into one version.

```
POST   /v1/objects/{key}/uploads          -> upload_id
PUT    /v1/uploads/{upload_id}/parts/1    -> part etag
PUT    /v1/uploads/{upload_id}/parts/2    -> part etag
POST   /v1/uploads/{upload_id}/complete   -> object version
```

Nothing is visible at the key until completion, and an upload that is
never completed is billed for the bytes it holds. Section <a href="08-multipart.html#post-uploadsupload_idcomplete" data-ref="sec"></a>&nbsp;removes
one; the lifecycle rule in section <a href="09-lifecycle.html#put-vaultsvaultlifecycle" data-ref="sec"></a>&nbsp;removes them in bulk.

## POST /objects/<span>{key}</span>/uploads

Opens a multipart upload against a key and returns its identifier. The
content type and the user metadata of the finished object are fixed
here, not at completion time.

### Request Parameters

<div class="params">

| Name            | Type   | Required | Description                       |
| --------------- | ------ | -------- | --------------------------------- |
| key             | string | yes      | Destination key, in the path      |
| X-Kumoha-Vault  | string | no       | Vault that receives the object    |
| Content-Type    | string | yes      | MIME type of the finished object  |
| storage_class   | string | no       | Class for the finished object     |
| X-Kumoha-Meta-* | string | no       | User-defined metadata (0 or more) |

</div>

```
POST /v1/objects/backups%2F2026-07-01.tar/uploads HTTP/1.1
Host: jp-east-1.api.kumoha.example
Authorization: Bearer km_live_x9f3d2c1a7b8e6f4d9c0b3a2e1f...
X-Kumoha-Vault: finance-archive
Content-Type: application/x-tar
X-Kumoha-Meta-Project: finance
```

### Response

```
{
  "upload_id": "up_01JZ8WB2Y4E8H2L5N8Q0S3V",
  "vault": "finance-archive",
  "key": "backups/2026-07-01.tar",
  "content_type": "application/x-tar",
  "storage_class": "STANDARD",
  "part_size_min": 8388608,
  "part_size_max": 1073741824,
  "part_number_max": 10000,
  "created_at": "2026-07-01T09:30:02Z",
  "expires_at": "2026-07-08T09:30:02Z"
}
```

<div class="status">

| Status Code | Name                   | Description                                   |
| ----------- | ---------------------- | --------------------------------------------- |
| 201         | Created                | Upload opened; use upload_id for every part.  |
| 400         | Bad Request            | object.key_invalid, or unknown storage class. |
| 403         | Forbidden              | Key is not granted upload.write.              |
| 415         | Unsupported Media Type | Content-Type header is absent.                |
| 500         | Internal Server Error  | An unexpected error occurred.                 |

</div>

## PUT /uploads/<span>{upload_id}</span>/parts/<span>{n}</span>

Uploads one part. Parts may be sent in parallel and out of order.
Sending a part number twice replaces the earlier part; the etag of the
last write is the one that counts.

### Request Parameters

<div class="params">

| Name              | Type    | Required | Description                     |
| ----------------- | ------- | -------- | ------------------------------- |
| upload_id         | string  | yes      | Upload identifier, in the path  |
| n                 | integer | yes      | Part number, 1 to 10000         |
| Content-Length    | integer | yes      | 8 MiB to 1 GiB, except the last |
| X-Kumoha-Checksum | string  | no       | sha256 of this part's bytes     |

</div>

```
PUT /v1/uploads/up_01JZ8WB2Y4E8H2L5N8Q0S3V/parts/2 HTTP/1.1
Host: jp-east-1.api.kumoha.example
Authorization: Bearer km_live_x9f3d2c1a7b8e6f4d9c0b3a2e1f...
Content-Length: 67108864
X-Kumoha-Checksum: sha256:1d4c7f0a3e6b9d2c5f8a1b4e7c0d3a6f...
Expect: 100-continue
```

### Response

```
{
  "upload_id": "up_01JZ8WB2Y4E8H2L5N8Q0S3V",
  "part_number": 2,
  "size": 67108864,
  "etag": "6b1f4d8a0c3e7b2f5a9d1c4e8b0f3a7d",
  "checksum": "sha256:1d4c7f0a3e6b9d2c5f8a1b4e7c0d3a6f...",
  "received_at": "2026-07-01T09:31:44Z"
}
```

<div class="status">

| Status Code | Name                  | Description                                     |
| ----------- | --------------------- | ----------------------------------------------- |
| 200         | OK                    | Part stored; keep the etag for completion.      |
| 400         | Bad Request           | upload.part_too_small, or checksum mismatch.    |
| 404         | Not Found             | upload.not_found in this vault.                 |
| 410         | Gone                  | upload.expired after 7 days without completion. |
| 413         | Payload Too Large     | Part exceeds the 1 GiB part limit.              |
| 500         | Internal Server Error | An unexpected error occurred.                   |

</div>

## GET /uploads/<span>{upload_id}</span>/parts

Lists the parts Kumoha currently holds for an upload, in part-number
order. Use it after a client crash to decide which parts still need to
be sent.

### Request Parameters

<div class="params">

| Name      | Type    | Required | Description                    |
| --------- | ------- | -------- | ------------------------------ |
| upload_id | string  | yes      | Upload identifier, in the path |
| limit     | integer | no       | 1 to 1000. Default 1000.       |
| cursor    | string  | no       | Cursor from a previous page    |

</div>

### Response

```
{
  "upload_id": "up_01JZ8WB2Y4E8H2L5N8Q0S3V",
  "parts": [
    { "part_number": 1, "size": 67108864,
      "etag": "0a3d6f9c2b5e8a1d4f7c0b3e6a9d2f5c" },
    { "part_number": 2, "size": 67108864,
      "etag": "6b1f4d8a0c3e7b2f5a9d1c4e8b0f3a7d" }
  ],
  "uploaded_size": 134217728,
  "truncated": false,
  "next_cursor": null,
  "expires_at": "2026-07-08T09:30:02Z"
}
```

<div class="status">

| Status Code | Name                  | Description                                     |
| ----------- | --------------------- | ----------------------------------------------- |
| 200         | OK                    | Part listing returned, possibly empty.          |
| 404         | Not Found             | upload.not_found in this vault.                 |
| 410         | Gone                  | upload.expired after 7 days without completion. |
| 500         | Internal Server Error | An unexpected error occurred.                   |

</div>

## POST /uploads/<span>{upload_id}</span>/complete

Assembles the parts into a single object version. The part list must
name every part, in ascending order, with the etag returned when the
part was stored.

### Request Parameters

<div class="params">

| Name      | Type   | Required | Description                            |
| --------- | ------ | -------- | -------------------------------------- |
| upload_id | string | yes      | Upload identifier, in the path         |
| parts     | array  | yes      | Objects of part_number and etag        |
| checksum  | string | no       | sha256 of the assembled object         |
| If-Match  | string | no       | Complete only if the key still matches |

</div>

```
POST /v1/uploads/up_01JZ8WB2Y4E8H2L5N8Q0S3V/complete HTTP/1.1
Host: jp-east-1.api.kumoha.example
Authorization: Bearer km_live_x9f3d2c1a7b8e6f4d9c0b3a2e1f...
Content-Type: application/json
Content-Length: 214

{
  "parts": [
    { "part_number": 1, "etag": "0a3d6f9c2b5e8a1d4f7c0b3e6a9d2f5c" },
    { "part_number": 2, "etag": "6b1f4d8a0c3e7b2f5a9d1c4e8b0f3a7d" }
  ]
}
```

<div class="warning">
<h4>⚠ WARNING</h4>

Completion is not atomic with respect to the parts: Kumoha releases
every part as soon as the version is written. A retry after a 200 has
no parts left to assemble and answers upload.not_found.

</div>

### Response

```
{
  "key": "backups/2026-07-01.tar",
  "vault": "finance-archive",
  "etag": "3f7a0d2c5b8e1a4d7f0c3b6e9a2d5f8c-2",
  "version_id": "v01_01JZ8WC4Z6G0J3M6P9R2T5W",
  "size": 134217728,
  "content_type": "application/x-tar",
  "storage_class": "STANDARD",
  "part_count": 2,
  "created_at": "2026-07-01T09:34:10Z"
}
```

The etag of a multipart object carries a hyphen and the part count. It
is not the sha256 of the bytes; compare the checksum field instead.

<div class="status">

| Status Code | Name                  | Description                                        |
| ----------- | --------------------- | -------------------------------------------------- |
| 200         | OK                    | Object written; parts have been released.          |
| 400         | Bad Request           | Part list is out of order or names a missing part. |
| 404         | Not Found             | upload.not_found, already completed or aborted.    |
| 409         | Conflict              | upload.checksum_mismatch on the assembled object.  |
| 410         | Gone                  | upload.expired after 7 days without completion.    |
| 500         | Internal Server Error | An unexpected error occurred.                      |

</div>

## DELETE /uploads/<span>{upload_id}</span>

Aborts an upload and releases its parts. Aborting is the only way to
stop paying for parts of an upload that will never complete, short of
waiting seven days for it to expire.

```
DELETE /v1/uploads/up_01JZ8WB2Y4E8H2L5N8Q0S3V HTTP/1.1
Host: jp-east-1.api.kumoha.example
Authorization: Bearer km_live_x9f3d2c1a7b8e6f4d9c0b3a2e1f...
```

A successful abort returns 204 with no body. Parts already in flight
are discarded when they arrive, and the part upload answers 404 with
upload.not_found.

<div class="status">

| Status Code | Name                  | Description                        |
| ----------- | --------------------- | ---------------------------------- |
| 204         | No Content            | Upload aborted and parts released. |
| 403         | Forbidden             | Key is not granted upload.write.   |
| 404         | Not Found             | upload.not_found in this vault.    |
| 500         | Internal Server Error | An unexpected error occurred.      |

</div>

## Resuming an Interrupted Upload

A client that loses its part table can rebuild it, because the upload
holds everything except which byte range each part came from. Keep the
upload_id and the part boundaries; everything else is recoverable.

1. List the parts with section <a href="08-multipart.html#get-uploadsupload_idparts" data-ref="sec"></a>&nbsp;and note the part numbers.
2. Re-send the parts that are missing, at the same boundaries.
3. Complete with the etags from the listing, not from the retries.

```
$ kmh upload parts up_01JZ8WB2Y4E8H2L5N8Q0S3V
  1  67108864  0a3d6f9c2b5e8a1d4f7c0b3e6a9d2f5c
  2  67108864  6b1f4d8a0c3e7b2f5a9d1c4e8b0f3a7d
  4  67108864  d2f5a8c1e4b7d0a3f6c9b2e5a8d1f4c7
$ kmh upload resume up_01JZ8WB2Y4E8H2L5N8Q0S3V --from backup.tar
  part 3 missing, re-sending bytes 134217728-201326591
  complete: v01_01JZ8WC4Z6G0J3M6P9R2T5W
```

Boundaries must line up exactly. A part re-sent at a different offset
is accepted, because Kumoha does not know where the bytes came from,
and the assembled object then fails its checksum at completion.
