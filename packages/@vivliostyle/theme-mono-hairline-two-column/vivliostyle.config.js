// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'RF IC高密度2段スペック',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/adi-rf-compact.md'],
  output: 'book.pdf',
});
