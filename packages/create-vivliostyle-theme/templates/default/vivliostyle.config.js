// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  theme: ['node_modules/@vivliostyle/theme-base', '.'],
  entry: ['example/default.md'],
  workspaceDir: '.vivliostyle',
  output: [
    'book.pdf',
    {
      path: './book',
      format: 'webpub',
    },
  ],
});
