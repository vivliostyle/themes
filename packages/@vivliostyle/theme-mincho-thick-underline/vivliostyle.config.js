// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '国内研究会レポート形式',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/domestic-research-report.md'],
  output: 'book.pdf',
});
