// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  title: {{json (proper title)}},
  author: {{json author}},
  language: "ja",
  readingProgression: "rtl",
  theme: {{#if theme}}{{json theme}}{{else}}"@vivliostyle/theme-epub3j"{{/if}},
  entry: [
    "p-titlepage.md",
    "p-caution.md",
    { path: "p-toc.md", rel: "contents" },
    "p-001.md",
    "p-002.md",
    "p-cyushaku.md",
    "p-colophon.md",
  ],
  cover: "assets/cover.jpg",
});
