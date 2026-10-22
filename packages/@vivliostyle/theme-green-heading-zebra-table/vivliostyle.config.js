// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'マネー本のデータテーブル型',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/data-finance.md'],
  output: 'book.pdf',
});
