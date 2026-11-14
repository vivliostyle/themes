---
"@vivliostyle/theme-base": patch
---

Lower the specificity of the section `break-before` and `break-after` rules, and of the table of contents rules, so that a theme can override them with a selector such as `section.level2` or `[role='doc-toc'] ol`. The table of contents rules matched `#toc` and so outweighed any selector without an ID.
