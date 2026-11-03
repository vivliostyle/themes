---
title: "Requests and Responses"
lang: en
class: chapter
---

# Requests and Responses

Everything in this chapter applies to every endpoint in chapters 4 to 7. The endpoint sections list only what they add to it.

## Common Request Headers

<div class="params">

| Name                 | Required | Description                                                                                                |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| Authorization        | yes      | Bearer API key. See section <a href="04-authentication.html#the-authorization-header" data-ref="sec"></a>. |
| X-Kumoha-Vault       | no       | Target vault. Default: key home vault.                                                                     |
| X-Kumoha-Region      | no       | Target region. Default: vault region.                                                                      |
| X-Kumoha-Idempotency | no       | Client token, 26 chars, 24 h window.                                                                       |
| X-Kumoha-Trace       | no       | Client trace id, echoed in responses.                                                                      |
| X-Kumoha-Meta-*      | no       | User metadata on write operations.                                                                         |
| Content-Type         | on write | MIME type of the request body.                                                                             |
| Content-Length       | on write | Size of the request body in bytes.                                                                         |

</div>

Requests larger than 8 MiB should be sent with `Expect: 100-continue`.
Kumoha answers 100 Continue only after the credential, the scopes and
the vault have been checked, which turns a rejected upload into two
round trips instead of a wasted body.

## Common Response Headers

<div class="params">

| Name                   | Description                                      |
| ---------------------- | ------------------------------------------------ |
| X-Kumoha-Request-Id    | Identifier of this request. Quote it in tickets. |
| X-Kumoha-Version-Id    | Version the response describes, when applicable. |
| X-Kumoha-Storage-Class | Storage class of the object.                     |
| X-Kumoha-Checksum      | Algorithm-prefixed checksum of the object body.  |
| X-Kumoha-Rate-Remain   | Requests left in the current rate window.        |
| X-Kumoha-Rate-Reset    | Seconds until the rate window rolls over.        |
| X-Kumoha-Trace         | Echo of the request trace id, if one was sent.   |
| ETag                   | Strong entity tag. Equal to the object etag.     |

</div>

## Error Response Format

Every error, from 400 through 504, carries the same JSON document. The
Content-Type is always application/json even when the endpoint returns
object bytes on success.

```
{
  "error": {
    "code": "object.key_too_long",
    "message": "Object key is 1104 bytes; the limit is 1024.",
    "field": "key",
    "request_id": "req_01JZ8W4M7C2P5R9T1V3X6Y",
    "retry_after_ms": null,
    "doc_url": "https://docs.kumoha.example/e/object.key_too_long"
  }
}
```

<div class="params">

| Field          | Type    | Description                                 |
| -------------- | ------- | ------------------------------------------- |
| code           | string  | Stable identifier in domain.reason form.    |
| message        | string  | English prose. May change between releases. |
| field          | string  | Offending parameter, or null.               |
| request_id     | string  | Same value as X-Kumoha-Request-Id.          |
| retry_after_ms | integer | Suggested wait before retrying, or null.    |
| doc_url        | string  | Permalink to the entry in the error index.  |

</div>

Match on code, never on message or on the status code alone: several
distinct codes share 409, and the prose is rewritten whenever it is
found to be unclear.

## Status Codes

<div class="status">

| Status Code | Name                   | Description                                       |
| ----------- | ---------------------- | ------------------------------------------------- |
| 200         | OK                     | Request succeeded; a body is returned.            |
| 201         | Created                | A vault or an upload was created.                 |
| 204         | No Content             | Request succeeded; no body is returned.           |
| 206         | Partial Content        | A byte range was returned.                        |
| 304         | Not Modified           | Conditional read matched the cached version.      |
| 400         | Bad Request            | Invalid request headers, parameters or body.      |
| 401         | Unauthorized           | Missing or invalid authentication.                |
| 403         | Forbidden              | Insufficient permissions for the operation.       |
| 404         | Not Found              | Vault, key, version or upload does not exist.     |
| 409         | Conflict               | Request could not be completed due to a conflict. |
| 410         | Gone                   | The multipart upload has expired.                 |
| 412         | Precondition Failed    | A conditional header did not match.               |
| 413         | Payload Too Large      | Body exceeds the single-request limit.            |
| 415         | Unsupported Media Type | Content-Type is absent or not accepted.           |
| 429         | Too Many Requests      | Request rate exceeded for this vault.             |
| 500         | Internal Server Error  | An unexpected error occurred.                     |
| 503         | Service Unavailable    | Region is draining; retry on another host.        |
| 504         | Gateway Timeout        | Storage layer did not answer in time.             |
| 507         | Insufficient Storage   | Project storage quota is exhausted.               |

</div>

## Conditional Requests

Reads accept `If-None-Match` and writes accept `If-Match`, both taking
an object etag. Kumoha compares strong etags only; weak comparison is
rejected with request.malformed_header.

```
PUT /v1/objects/report-2026.json HTTP/1.1
Host: jp-east-1.api.kumoha.example
Authorization: Bearer km_live_x9f3d2c1a7b8e6f4d9c0b3a2e1f...
X-Kumoha-Vault: finance-archive
If-Match: "9f8a6d3b2c1e7a5d4f6c3b2a1e9d7c0b"
Content-Type: application/json
Content-Length: 112
```

A failed precondition on a write costs nothing: the body is drained and
discarded, and no version is created.

## Pagination

Listings return at most 1000 entries and a cursor. Pass the cursor back
in the `cursor` query parameter to continue; a listing is finished when
`next_cursor` is null. Cursors are opaque and expire after one hour.

```
{
  "objects": [ ... ],
  "truncated": true,
  "next_cursor": "cur_01JZ8W5Q3E7H2K4M6P8R0T",
  "count": 1000
}
```

## Rate Limits and Retries

Rate is counted per vault, per region, in a rolling one-second window:
3000 reads and 800 writes. Exceeding it returns 429 with
quota.rate_limited and a retry_after_ms of at least 50.

<div class="warning">
<h4>⚠ WARNING</h4>

Retry 429, 503 and 504 with exponential backoff and full jitter, and
never faster than retry_after_ms. Fixed-interval retries from a fleet
re-form into a thundering herd and keep the vault throttled.

</div>

## Idempotency

Send X-Kumoha-Idempotency on any write that a retry might duplicate.
Kumoha stores the outcome for 24 hours and replays it, including the
original status code, for every request that repeats the token.

A token replayed with a different body is a conflict, not a replay, and
fails with 409 and request.idempotency_conflict. Tokens are scoped to
the vault, so the same token may be reused in another vault.

```
POST /v1/vaults HTTP/1.1
Host: jp-east-1.api.kumoha.example
Authorization: Bearer km_live_x9f3d2c1a7b8e6f4d9c0b3a2e1f...
X-Kumoha-Idempotency: idm_01JZ8W6R4F8J3L5N7Q9S1U
Content-Type: application/json
Content-Length: 168
```

A replayed response carries X-Kumoha-Idempotency-Replay: true, and its
request id is the one from the first attempt, not from the retry. Both
values are worth logging: they are what distinguishes a retry that was
absorbed from a write that happened twice.

## Reporting a Problem

Every response, successful or not, carries X-Kumoha-Request-Id. It is
the only identifier that resolves to a single request in the service
logs, and it is kept for 30 days.

```
HTTP/1.1 500 Internal Server Error
Content-Type: application/json
X-Kumoha-Request-Id: req_01JZ8WD6B8F2K5N8Q1T4W7
X-Kumoha-Trace: batch-20260701-0042

{
  "error": {
    "code": "server.internal_error",
    "message": "The request could not be completed. Report the id.",
    "field": null,
    "request_id": "req_01JZ8WD6B8F2K5N8Q1T4W7",
    "retry_after_ms": 2000,
    "doc_url": "https://docs.kumoha.example/e/server.internal_error"
  }
}
```

Send the request id, the code, and the wall-clock time with the time
zone. Do not send the API key: support cannot use it, and a key that
has appeared in a ticket is disabled on sight.
