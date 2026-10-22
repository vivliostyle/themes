// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'Principles of Microeconomic Analysis',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/econ-data-graph.md'],
  output: 'book.pdf',
});
