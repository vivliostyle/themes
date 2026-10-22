// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '学術批評誌（A4、密な2段、サイドノート）',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/academic-critique.md'],
  output: 'book.pdf',
});
