// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: 'コンパクトお弁当本',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: [
    'templates/default/bento-compact.md',
    'templates/default/bento-tips.md',
  ],
  output: 'book.pdf',
});
