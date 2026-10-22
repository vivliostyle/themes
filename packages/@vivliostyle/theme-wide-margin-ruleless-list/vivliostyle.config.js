// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'カフェメニュー・ホワイトスペース設計',
  theme: ['theme.css'],
  entry: ['templates/default/cafe-minimal-white.md'],
  output: 'book.pdf',
});
