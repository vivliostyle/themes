// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: '企業研究論文フォーマット',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/corporate-research-paper.md'],
  output: 'book.pdf',
});
