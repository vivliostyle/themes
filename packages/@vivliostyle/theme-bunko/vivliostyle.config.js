// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  theme: ['../theme-base', 'theme.css'],
  entry: ['example/bunko.md'],
  size: '148mm,210mm',
  output: [
    'book.pdf',
    {
      path: './book',
      format: 'webpub',
    },
  ],
});
