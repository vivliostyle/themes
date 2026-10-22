// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '診療ガイドライン（標準2段型）',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/clinical-guideline-standard.md'],
  output: 'book.pdf',
});
