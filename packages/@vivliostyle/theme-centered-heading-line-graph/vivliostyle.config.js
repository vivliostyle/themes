// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'Principles of Microeconomic Analysis',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/econ-data-graph.md'],
  output: 'book.pdf',
});
