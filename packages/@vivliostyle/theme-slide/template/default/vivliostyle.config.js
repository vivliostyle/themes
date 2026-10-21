// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  title: {{json (proper title)}},
  author: {{json author}},
  language: "ja",
  size: "210mm,148mm",
  theme: {{#if theme}}{{json theme}}{{else}}"@vivliostyle/theme-slide"{{/if}},
  entry: [
    "slide.md",
  ],
});
