// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '新書判エッセイ形ガイド',
  theme: ['theme.css', 'example/example.css'],
  entry: [
    'example/essay-bunko.md',
    'example/essay-bunko-02.md',
    'example/essay-bunko-03.md',
    'example/essay-bunko-04.md',
    'example/essay-bunko-05.md',
    'example/essay-bunko-06.md',
  ],
  output: 'book.pdf',
});
