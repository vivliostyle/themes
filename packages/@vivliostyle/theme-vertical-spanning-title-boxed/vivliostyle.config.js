// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '文藝春秋風特集ページ',
  theme: ['theme.css'],
  entry: ['templates/default/bungeishunju-vertical.md'],
  output: 'book.pdf',
});
