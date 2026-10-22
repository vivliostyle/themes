// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '予実管理レポート(予算対実績)',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/budget-vs-actual.md'],
  output: 'book.pdf',
});
