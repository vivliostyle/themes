// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '古語辞典 縦組み高密度版',
  theme: ['theme.css', 'example/example.css'],
  entry: [
    'example/classical-japanese-kogo.md',
    'example/classical-japanese-kogo-02.md',
  ],
  output: 'book.pdf',
});
