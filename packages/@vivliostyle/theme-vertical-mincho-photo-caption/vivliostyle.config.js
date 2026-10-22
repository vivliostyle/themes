// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '潮風の記憶',
  theme: ['theme.css'],
  entry: [
    'example/00-titlepage.md',
    { path: 'example/01-contents.md', rel: 'contents' },
    'example/02-birth-house.md',
    'example/03-shigihama.md',
    'example/04-seizaisho.md',
    'example/05-kisha.md',
    'example/06-tokai.md',
    'example/07-kazoku.md',
    'example/08-shiokaze.md',
    'example/09-afterword.md',
  ],
  output: 'book.pdf',
});
