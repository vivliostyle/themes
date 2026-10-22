// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: '統計学年報シンプル版',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/annals-stat.md'],
  output: 'book.pdf',
});
