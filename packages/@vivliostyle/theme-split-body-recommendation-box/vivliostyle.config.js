// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '診療ガイドライン（標準2段型）',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/clinical-guideline-standard.md'],
  output: 'book.pdf',
});
