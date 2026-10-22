// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '決算短信・速報（B5カラー強調）',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/earnings-brief-compact.md'],
  output: 'book.pdf',
});
