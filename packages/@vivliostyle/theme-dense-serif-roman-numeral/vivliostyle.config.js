// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: '物理誌PRL風簡潔論文',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: ['templates/default/aps-prl-physics.md'],
  output: 'book.pdf',
});
