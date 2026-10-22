// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'バレットジャーナル',
  theme: ['theme.css'],
  entry: [
    'example/index.md',
    'example/key.md',
    'example/monthly-log.md',
    'example/daily-log-08.md',
    'example/daily-log-09.md',
    'example/daily-log-10.md',
    'example/reading-list.md',
    'example/north-bed.md',
  ],
  output: 'book.pdf',
});
