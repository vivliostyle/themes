// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'ACM TOPLAS言語システム誌',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/acm-toplas.md'],
  output: 'book.pdf',
});
