// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: 'A4判広版対談形式',
  theme: ['theme.css', 'example/example.css'],
  entry: [
    'example/01-cover.md',
    'example/02-contents.md',
    'example/03-intro.md',
    'example/04-night-1.md',
    'example/05-night-2.md',
    'example/06-night-3.md',
    'example/07-night-4.md',
    'example/08-colophon.md',
  ],
  output: 'book.pdf',
});
