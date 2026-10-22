// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '高校化学実験安全指導ページ',
  theme: ['theme.css'],
  entry: ['templates/default/chemistry-experiment-safety.md'],
  output: 'book.pdf',
});
