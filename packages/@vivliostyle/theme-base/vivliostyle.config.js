// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  theme: 'example/example.css',
  entry: [
    { rel: 'contents' },
    'example/01_typography.md',
    'example/02_figures-and-tables.md',
    'example/03_code-and-math.md',
  ],
  toc: {
    sectionDepth: 2,
  },
  output: [
    'book.pdf',
    {
      path: './book',
      format: 'webpub',
    },
  ],
});
