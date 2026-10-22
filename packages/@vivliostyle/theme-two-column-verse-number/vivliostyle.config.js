// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '聖書・2段組節番号型',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: [
    'templates/default/bible-two-column.md',
    'templates/default/bible-two-column-02.md',
    'templates/default/bible-two-column-03.md',
    'templates/default/bible-two-column-04.md',
    'templates/default/bible-two-column-05.md',
    'templates/default/bible-two-column-06.md',
    'templates/default/bible-two-column-07.md',
    'templates/default/bible-two-column-08.md',
    'templates/default/bible-two-column-09.md',
  ],
  output: 'book.pdf',
});
