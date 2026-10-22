// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'マネー本のデータテーブル型',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/data-finance.md'],
  output: 'book.pdf',
});
