// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: '数式・疑似コード・アルゴリズム解析本',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/algorithm-math-code.md'],
  output: 'book.pdf',
});
