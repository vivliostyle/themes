// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'RF IC高密度2段スペック',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/adi-rf-compact.md'],
  output: 'book.pdf',
});
