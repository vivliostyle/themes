// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  theme: ['theme-all.css', 'example/example.css'],
  entry: ['example/default.md'],
  output: [
    'book.pdf',
    {
      path: './book',
      format: 'webpub',
    },
  ],
});
