---
"@vivliostyle/theme-base": major
---

Named pages for common document roles are now assigned with `:is(html, body):is(.<name>, [role='doc-<name>'])`. The `chapter` / `part` document counters accept the DPUB-ARIA roles (`doc-chapter`, `doc-part`) in addition to the classes, and the table-of-contents and cover detectors match `html` as well as `body`, so their named pages also reach the first page of the document.

BREAKING CHANGE: A `role="doc-*"` attribute on an element inside the document no longer switches the named page; put the class or the role on `html` or `body`. A mid-document cover keeps its own element-level hook (`.cover` / `section:has(> .cover:first-child)`).
