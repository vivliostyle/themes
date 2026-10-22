// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'カフェメニュー・ホワイトスペース設計',
  theme: ['theme.css'],
  entry: ['example/cafe-minimal-white.md'],
  output: 'book.pdf',
});
