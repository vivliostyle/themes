// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: '機械学習ノートブック コード埋め込み説明型',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/machine-learning-notebook.md'],
  output: 'book.pdf',
});
