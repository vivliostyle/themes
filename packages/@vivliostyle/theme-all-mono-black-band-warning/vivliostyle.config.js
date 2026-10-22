// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'A5判コード中心モノスペース仕様書',
  theme: ['theme.css', 'example/example.css'],
  entry: [
    'example/01-cover.md',
    'example/02-contents.md',
    'example/03-overview.md',
    'example/04-authentication.md',
    'example/05-common.md',
    'example/06-vaults.md',
    'example/07-objects.md',
    'example/08-multipart.md',
    'example/09-lifecycle.md',
    'example/10-appendix.md',
    'example/11-colophon.md',
  ],
  output: 'book.pdf',
});
