// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'ACM SIGCHI拡張アブストラクト',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/acm-extended.md'],
  output: 'book.pdf',
});
