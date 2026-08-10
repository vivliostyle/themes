// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  title: 'vivliostyle-theme-academic のサンプル',
  language: 'ja',
  size: 'A4',
  theme: ['../theme-base', 'theme.css'],
  entry: [
    {
      path: 'example/fet.md',
    },
    {
      path: 'example/microcomputer.md',
    },
  ],
  output: [
    'book.pdf',
    {
      path: './book',
      format: 'webpub',
    },
  ],
});
