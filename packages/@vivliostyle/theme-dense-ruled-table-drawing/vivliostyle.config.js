// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'ボタン電池コンパクト仕様',
  theme: ['theme.css'],
  entry: ['example/battery-compact-format.md'],
  output: 'book.pdf',
});
