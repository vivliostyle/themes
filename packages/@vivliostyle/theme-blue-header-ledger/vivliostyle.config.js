// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '銀行口座取引明細書｜つばさ野銀行',
  theme: ['theme.css'],
  entry: ['example/bank-statement.md'],
  output: 'book.pdf',
});
