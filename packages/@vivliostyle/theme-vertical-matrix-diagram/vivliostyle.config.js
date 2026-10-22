// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '変化適応の経営戦略',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/business-shinsho-diagrams.md'],
  output: 'book.pdf',
});
