// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '定款（一般社団法人型）',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/articles-of-association-standard.md'],
  output: 'book.pdf',
});
