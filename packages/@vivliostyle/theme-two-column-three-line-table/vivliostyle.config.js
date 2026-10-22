// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: '学術論文集（B5、英語、2段、公式スタイル）',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/academic-paper-collection.md'],
  output: 'book.pdf',
});
