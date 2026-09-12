// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  theme: '.',
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
