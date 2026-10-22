// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: '北米APA論文様式（第7版）',
  theme: ['theme.css'],
  entry: ['templates/default/apa-7th-edition-thesis.md'],
  output: 'book.pdf',
});
