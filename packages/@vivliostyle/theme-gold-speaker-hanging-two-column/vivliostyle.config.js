// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '週刊ツール沼ラジオ',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/podcast-transcript-dialogue.md'],
  output: 'book.pdf',
});
