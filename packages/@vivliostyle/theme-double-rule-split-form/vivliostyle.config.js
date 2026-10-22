// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '複合帳票（領収+納品）',
  theme: ['theme.css'],
  entry: [
    'templates/default/estimate.md',
    'templates/default/order-confirmation.md',
    'templates/default/combined-receipt-delivery.md',
    'templates/default/invoice.md',
  ],
  output: 'book.pdf',
});
