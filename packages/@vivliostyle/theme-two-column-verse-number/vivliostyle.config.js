// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '聖書・2段組節番号型',
  theme: ['theme.css', 'example/example.css'],
  entry: [
    'example/bible-two-column.md',
    'example/bible-two-column-02.md',
    'example/bible-two-column-03.md',
    'example/bible-two-column-04.md',
    'example/bible-two-column-05.md',
    'example/bible-two-column-06.md',
    'example/bible-two-column-07.md',
    'example/bible-two-column-08.md',
    'example/bible-two-column-09.md',
  ],
  output: 'book.pdf',
});
