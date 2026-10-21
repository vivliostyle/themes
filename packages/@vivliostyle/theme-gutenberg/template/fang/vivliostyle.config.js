// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  title: {{json (proper title)}},
  author: {{json author}},
  language: "en",
  size: "A5",
  theme: { specifier: {{#if theme}}{{json theme}}{{else}}"@vivliostyle/theme-gutenberg"{{/if}}, import: "fang.css" },
  entry: [
    "cover.md",
    "copyright.md",
    { path: "toc.md", rel: "contents" },
    "ch01.md",
    "ch02.md",
    "ch03.md",
    "ch04.md",
    "ch05.md",
    "contentinfo.md",
  ],
});
