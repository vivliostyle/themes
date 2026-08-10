// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  theme: ['../theme-base', 'theme.css'],
  size: '182mm,257mm',
  entry: ['example/techbook.md'],
  output: [
    'book.pdf',
    {
      path: './book',
      format: 'webpub',
    },
  ],
});
