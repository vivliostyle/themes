// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '現金出納帳（日記式 横書き）',
  theme: ['theme.css'],
  entry: ['example/cash-ledger-horizontal.md'],
  output: 'book.pdf',
});
