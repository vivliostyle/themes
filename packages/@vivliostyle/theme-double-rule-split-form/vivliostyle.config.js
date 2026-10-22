// @ts-check
import { defineConfig } from '@vivliostyle/cli';

export default defineConfig({
  language: 'ja',
  title: '複合帳票（領収+納品）',
  theme: ['theme.css'],
  entry: [
    'example/estimate.md',
    'example/order-confirmation.md',
    'example/combined-receipt-delivery.md',
    'example/invoice.md',
  ],
  output: 'book.pdf',
});
