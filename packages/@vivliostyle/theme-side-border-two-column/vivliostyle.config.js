// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '勘定科目一覧表（青色申告用）',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/chart-of-accounts-blue-return.md'],
  output: 'book.pdf',
});
