// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: '情報科学の実装型教科書',
  theme: ['theme.css', 'example/example.css'],
  entry: ['example/cs-programming-sidenotes.md'],
  output: 'book.pdf',
});
