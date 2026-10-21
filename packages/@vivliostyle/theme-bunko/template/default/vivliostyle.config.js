// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  title: {{json (proper title)}},
  author: {{json author}},
  language: "ja",
  size: "148mm,210mm",
  theme: {{#if theme}}{{json theme}}{{else}}"@vivliostyle/theme-bunko"{{/if}},
  entry: [
    "bunko.md",
  ],
});
