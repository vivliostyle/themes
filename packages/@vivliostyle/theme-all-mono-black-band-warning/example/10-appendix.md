---
title: "Appendices"
lang: en
---

# Limits and Quotas {#apx-limits .appendix}

Every limit below is per project unless the row says otherwise. Limits
marked as adjustable are raised from the console; the rest are
structural and no ticket will move them.

<div class="params">

| Subject                      | Limit          | Adjustable |
| ---------------------------- | -------------- | ---------- |
| Object key length            | 1024 bytes     | no         |
| Object size, single request  | 512 MiB        | no         |
| Object size, multipart       | 5 TiB          | no         |
| Part size                    | 8 MiB to 1 GiB | no         |
| Parts per upload             | 10000          | no         |
| Metadata entries per object  | 32             | no         |
| Metadata bytes per object    | 8 KiB          | no         |
| Vaults per project           | 100            | yes        |
| Lifecycle rules per vault    | 20             | yes        |
| Versions kept per key        | 1000           | yes        |
| Read requests per vault, /s  | 3000           | yes        |
| Write requests per vault, /s | 800            | yes        |
| Entries per listing page     | 1000           | no         |
| Cursor lifetime              | 1 h            | no         |
| Idempotency window           | 24 h           | no         |
| Multipart upload lifetime    | 7 days         | no         |
| Restore window, SHIMO        | 1 to 30 days   | no         |
| Vault name hold after delete | 30 days        | no         |

</div>

Exceeding a rate limit is a 429 and is safe to retry; exceeding a
stored quota is a 507 and is not. Storage quota is measured against
billed bytes, so objects still inside their minimum billed period count
even after they are deleted.

# Error Code Index {#apx-errors .appendix}

Codes are stable. Prose is not: match on the code, and treat the
message as something to put in a log rather than something to parse.

<div class="params long">

| Code                         | Status | Meaning                            |
| ---------------------------- | ------ | ---------------------------------- |
| auth.missing_credentials     | 401    | No Authorization header.           |
| auth.invalid_key             | 401    | Unknown key, or wrong scheme.      |
| auth.expired_key             | 401    | Past its rotation deadline.        |
| auth.key_disabled            | 403    | Disabled; restorable for 14 days.  |
| auth.scope_denied            | 403    | Key lacks the required scope.      |
| auth.region_not_allowed      | 403    | Key is pinned to another region.   |
| request.malformed_json       | 400    | Body is not valid JSON.            |
| request.malformed_header     | 400    | Header value failed to parse.      |
| request.unknown_field        | 400    | Body carries an unknown field.     |
| request.header_too_long      | 400    | A header exceeds 8 KiB.            |
| request.body_too_large       | 413    | Body exceeds the endpoint limit.   |
| request.unsupported_media    | 415    | Content-Type absent or refused.    |
| request.idempotency_conflict | 409    | Token replayed with another body.  |
| vault.not_found              | 404    | No such vault in this project.     |
| vault.name_invalid           | 400    | Name breaks the naming rules.      |
| vault.name_taken             | 409    | Name is in use or is held.         |
| vault.not_empty              | 409    | Vault holds objects or uploads.    |
| vault.limit_reached          | 403    | 100 vaults per project.            |
| vault.region_mismatch        | 409    | Regional host owns another region. |
| object.not_found             | 404    | No current version at this key.    |
| object.version_not_found     | 404    | No such version_id for this key.   |
| object.key_too_long          | 400    | Key exceeds 1024 bytes.            |
| object.key_invalid           | 400    | Key is not valid UTF-8.            |
| object.precondition_failed   | 412    | If-Match or If-None-Match failed.  |
| object.restore_required      | 409    | SHIMO object is not restored.      |
| object.restore_in_progress   | 409    | Restore is running; tier is fixed. |
| object.class_not_allowed     | 400    | Unknown or refused storage class.  |
| upload.not_found             | 404    | Unknown, completed or aborted.     |
| upload.expired               | 410    | Older than 7 days.                 |
| upload.part_too_small        | 400    | Part below 8 MiB and not the last. |
| upload.part_out_of_range     | 400    | Part number outside 1 to 10000.    |
| upload.checksum_mismatch     | 409    | Assembled bytes fail the checksum. |
| lifecycle.rule_conflict      | 409    | Two rules overlap on one action.   |
| lifecycle.too_many_rules     | 400    | More than 20 rules in one vault.   |
| quota.rate_limited           | 429    | Request rate exceeded, retry.      |
| quota.storage_exceeded       | 507    | Project storage quota is full.     |
| server.internal_error        | 500    | Unexpected failure; report the id. |
| server.unavailable           | 503    | Region draining; retry elsewhere.  |
| server.timeout               | 504    | Storage layer did not answer.      |

</div>

# Revision History {#apx-revisions .appendix}

<div class="params">

| Revision | Date       | Change                                   |
| -------- | ---------- | ---------------------------------------- |
| 1.8.2    | 2026-07-01 | Express restore tier; this edition.      |
| 1.8.0    | 2026-05-14 | Part listing added to multipart uploads. |
| 1.7.1    | 2026-03-02 | retry_after_ms added to the error body.  |
| 1.7.0    | 2026-01-20 | Idempotency tokens on every write.       |
| 1.6.0    | 2025-10-08 | SHIMO class and the restore endpoint.    |
| 1.5.2    | 2025-08-19 | Listing page limit raised to 1000.       |
| 1.5.0    | 2025-06-01 | Copy endpoint; cross-region copies.      |
| 1.4.0    | 2025-04-15 | Vault lifecycle rules.                   |
| 1.0.0    | 2024-11-05 | First public revision of v1.             |

</div>

Revisions are additive within v1: a field is never removed and a code
never changes meaning. Fields that are to disappear are frozen instead,
documented as deprecated for two revisions, and then answered with a
constant value until v2.
