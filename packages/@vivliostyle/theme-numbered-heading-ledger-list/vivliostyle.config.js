// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '同窓会名簿',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/alumni-directory.md'],
  output: 'book.pdf',
});
