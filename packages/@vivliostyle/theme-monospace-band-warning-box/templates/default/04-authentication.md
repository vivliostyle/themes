---
title: "Authentication"
lang: en
class: chapter
---

# Authentication

Kumoha authenticates every request with a bearer API key. There is no
request signing, no session and no refresh flow: the key in the
Authorization header is the whole of the credential.

## API Keys

A key is 64 characters of base62 behind a prefix that names the
environment it belongs to. Keys are issued from the console, are shown
once, and are bound to one project and one home vault.

<div class="params">

| Prefix      | Environment | Description                              |
| ----------- | ----------- | ---------------------------------------- |
| `km_live_`  | production  | Operates on real vaults and is billed.   |
| `km_test_`  | sandbox     | Isolated vaults, purged every 24 hours.  |
| `km_probe_` | monitoring  | Read-only, exempt from the request rate. |

</div>

The home vault of a key is the vault used when a request omits the
X-Kumoha-Vault header. A key may address any other vault in the same
project as long as its scopes allow it.

## The Authorization Header

Send the key as a bearer credential. Kumoha rejects the request before
routing if the header is absent, malformed, or carries a scheme other
than Bearer.

```
GET /v1/vaults HTTP/1.1
Host: jp-east-1.api.kumoha.example
Authorization: Bearer km_live_x9f3d2c1a7b8e6f4d9c0b3a2e1f...
X-Kumoha-Trace: cli-20260701-0007
```

<div class="warning">
<h4>⚠ WARNING</h4>

Kumoha never accepts an API key in the query string, and requests that
carry one are rejected with auth.invalid_key even if the key is valid.
Query strings are retained in the access log for 30 days.

</div>

## Scopes

Each key carries a set of scopes. A request that touches a resource
outside its scopes fails with 403 and auth.scope_denied, and the
response names the scope that was required.

<div class="params">

| Scope           | Grants                                               |
| --------------- | ---------------------------------------------------- |
| vault.read      | GET /vaults and GET /vaults/<span>{vault}</span>     |
| vault.write     | POST /vaults and DELETE /vaults/<span>{vault}</span> |
| object.read     | GET and HEAD on objects, and object listings         |
| object.write    | PUT and COPY on objects                              |
| object.delete   | DELETE on objects and on object versions             |
| upload.write    | The whole multipart upload sequence                  |
| lifecycle.write | Lifecycle rules on a vault, and restore requests     |
| key.admin       | Rotation and revocation of the project's keys        |

</div>

## Authentication Failures

Failures are reported with the standard error body described in
section <a href="05-common.html#error-response-format" data-ref="sec"></a>. The message is safe to log; it never repeats the
credential that was presented.

```
HTTP/1.1 403 Forbidden
Content-Type: application/json
X-Kumoha-Request-Id: req_01JZ8W4M7C2P5R9T1V3X6Y

{
  "error": {
    "code": "auth.scope_denied",
    "message": "Key km_live_x9f3...1f is not granted object.write.",
    "field": null,
    "required_scope": "object.write",
    "request_id": "req_01JZ8W4M7C2P5R9T1V3X6Y",
    "doc_url": "https://docs.kumoha.example/e/auth.scope_denied"
  }
}
```

<div class="status">

| Status Code | Name         | Description                                      |
| ----------- | ------------ | ------------------------------------------------ |
| 401         | Unauthorized | auth.missing_credentials, auth.invalid_key       |
| 401         | Unauthorized | auth.expired_key: past its rotation deadline.    |
| 403         | Forbidden    | auth.scope_denied, auth.key_disabled             |
| 403         | Forbidden    | auth.region_not_allowed: key pinned to a region. |

</div>

## Rotation

Keys do not expire on their own, but a project may set a rotation
deadline. Once the deadline passes, the key answers 401 with
auth.expired_key on every request, including reads.

1. Issue the replacement key with the same scopes and home vault.
2. Deploy it, then watch X-Kumoha-Key-Fingerprint in the access log
   until the old fingerprint stops appearing.
3. Disable the old key. It answers 403 with auth.key_disabled and can
   be re-enabled for 14 days.
4. Delete it. Deletion is immediate and cannot be undone.
