// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '美しいAPIリファレンス',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/api-reference.md'],
  output: 'book.pdf',
});
