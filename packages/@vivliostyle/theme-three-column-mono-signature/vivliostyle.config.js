// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '美しいAPIリファレンス',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/api-reference.md'],
  output: 'book.pdf',
});
