// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'バレットジャーナル',
  theme: ['theme.css'],
  entry: [
    'templates/default/index.md',
    'templates/default/key.md',
    'templates/default/monthly-log.md',
    'templates/default/daily-log-08.md',
    'templates/default/daily-log-09.md',
    'templates/default/daily-log-10.md',
    'templates/default/reading-list.md',
    'templates/default/north-bed.md',
  ],
  output: 'book.pdf',
});
