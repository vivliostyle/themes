// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  theme: 'theme.css',
  entry: ['example/slide.md'],
  size: '210mm,148mm',
  output: [
    'book.pdf',
    {
      path: './book',
      format: 'webpub',
    },
  ],
});
