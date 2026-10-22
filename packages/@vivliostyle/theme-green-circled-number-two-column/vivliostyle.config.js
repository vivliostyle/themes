// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: 'コンパクトお弁当本',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/bento-compact.md', 'example/bento-tips.md'],
  output: 'book.pdf',
});
