// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '同窓会名簿',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/alumni-directory.md'],
  output: 'book.pdf',
});
