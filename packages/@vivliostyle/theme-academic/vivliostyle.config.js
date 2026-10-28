// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  title: 'vivliostyle-theme-academic のサンプル',
  language: 'ja',
  size: 'A4',
  theme: ['theme.css'],
  entry: [
    {
      path: 'templates/default/fet.md',
    },
    {
      path: 'templates/default/microcomputer.md',
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
