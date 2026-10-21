// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  title: {{json (proper title)}},
  author: {{json author}},
  language: "ja",
  size: "182mm,257mm",
  theme: {{#if theme}}{{json theme}}{{else}}"@vivliostyle/theme-techbook"{{/if}},
  entry: [
    "techbook.md",
  ],
});
