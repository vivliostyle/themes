// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  title: {{json (proper title)}},
  author: {{json author}},
  language: "ja",
  size: "A4",
  theme: {{#if theme}}{{json theme}}{{else}}"@vivliostyle/theme-academic"{{/if}},
  entry: [
    "fet.md",
    "microcomputer.md",
  ],
});
