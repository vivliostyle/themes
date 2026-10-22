// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '新書判エッセイ形ガイド',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: [
    'templates/default/essay-bunko.md',
    'templates/default/essay-bunko-02.md',
    'templates/default/essay-bunko-03.md',
    'templates/default/essay-bunko-04.md',
    'templates/default/essay-bunko-05.md',
    'templates/default/essay-bunko-06.md',
  ],
  output: 'book.pdf',
});
