---
"@vivliostyle/theme-base": patch
---

Removed the unused `--vs-page--cover-break-before` and `--vs-page--cover-break-after` variables. They were declared on `:root` but never read by any rule, so setting them never had any effect and there is nothing to migrate. To control page breaks around a cover, set `break-before` / `break-after` on the cover element itself.
