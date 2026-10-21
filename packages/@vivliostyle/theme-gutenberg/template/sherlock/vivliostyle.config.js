// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  title: {{json (proper title)}},
  author: {{json author}},
  language: "en",
  size: "A5",
  toc: {
    title: "Contents",
  },
  theme: { specifier: {{#if theme}}{{json theme}}{{else}}"@vivliostyle/theme-gutenberg"{{/if}}, import: "sherlock.css" },
  entry: [
    "cover.md",
    "copyright.md",
    { rel: "contents" },
    "ch01.md",
    "ch02.md",
    "ch03.md",
    "ch04.md",
    "ch05.md",
    "ch06.md",
    "ch07.md",
    "ch08.md",
    "ch09.md",
    "ch10.md",
    "ch11.md",
    "ch12.md",
    "contentinfo.md",
  ],
});
