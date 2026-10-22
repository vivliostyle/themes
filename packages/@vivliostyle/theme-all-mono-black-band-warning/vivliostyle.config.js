// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'en',
  title: 'A5判コード中心モノスペース仕様書',
  theme: ['theme.css', 'templates/default/example.css'],
  entry: [
    'templates/default/01-cover.md',
    'templates/default/02-contents.md',
    'templates/default/03-overview.md',
    'templates/default/04-authentication.md',
    'templates/default/05-common.md',
    'templates/default/06-vaults.md',
    'templates/default/07-objects.md',
    'templates/default/08-multipart.md',
    'templates/default/09-lifecycle.md',
    'templates/default/10-appendix.md',
    'templates/default/11-colophon.md',
  ],
  output: 'book.pdf',
});
