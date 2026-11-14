import * as fs from 'node:fs';

import type { Canvas } from '@napi-rs/canvas';
import { createCanvas } from '@napi-rs/canvas';

import { openPdf, renderPage } from './pdf-render.ts';

async function pdfToImg(
  input: string,
  {
    pageNumbers = [1],
    scale = 2,
  }: { pageNumbers?: number[]; scale?: number } = {},
) {
  const pdfDocument = await openPdf(input);

  const renderedPages: Canvas[] = [];
  for (const pageNumber of pageNumbers) {
    renderedPages.push(await renderPage(pdfDocument, pageNumber, scale));
  }
  // concatenate images
  const { width, height } = renderedPages[0];
  const canvas = createCanvas(width * renderedPages.length, height);
  const ctx = canvas.getContext('2d');
  for (let i = 0; i < renderedPages.length; i++) {
    ctx.drawImage(renderedPages[i], i * width, 0);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.strokeRect(i * width, 0, width, height);
  }
  return canvas.encode('webp');
}

async function main() {
  // @vivliostyle/theme-academic
  {
    const img = await pdfToImg(
      'packages/@vivliostyle/theme-academic/book.pdf',
      {
        pageNumbers: [1, 3, 4],
      },
    );
    fs.writeFileSync('docs/assets/captures/theme-academic.webp', img);
  }
  // @vivliostyle/theme-base
  {
    const img = await pdfToImg('packages/@vivliostyle/theme-base/book.pdf', {
      pageNumbers: [2, 5, 7],
    });
    fs.writeFileSync('docs/assets/captures/theme-base.webp', img);
  }
  // @vivliostyle/theme-bunko
  {
    const img = await pdfToImg('packages/@vivliostyle/theme-bunko/book.pdf', {
      pageNumbers: [2, 1],
    });
    fs.writeFileSync('docs/assets/captures/theme-bunko.webp', img);
  }
  // @vivliostyle/theme-epub3j
  {
    const img = await pdfToImg('packages/@vivliostyle/theme-epub3j/book.pdf', {
      pageNumbers: [7, 6, 1],
    });
    fs.writeFileSync('docs/assets/captures/theme-epub3j.webp', img);
  }
  // @vivliostyle/theme-gutenberg
  {
    const alice = await pdfToImg(
      'packages/@vivliostyle/theme-gutenberg/alice.pdf',
      {
        pageNumbers: [1, 5, 6],
      },
    );
    fs.writeFileSync('docs/assets/captures/theme-gutenberg-alice.webp', alice);
    const fang = await pdfToImg(
      'packages/@vivliostyle/theme-gutenberg/fang.pdf',
      {
        pageNumbers: [1, 4, 6],
      },
    );
    fs.writeFileSync('docs/assets/captures/theme-gutenberg-fang.webp', fang);
    const sherlock = await pdfToImg(
      'packages/@vivliostyle/theme-gutenberg/sherlock.pdf',
      {
        pageNumbers: [1, 5, 6],
      },
    );
    fs.writeFileSync(
      'docs/assets/captures/theme-gutenberg-sherlock.webp',
      sherlock,
    );
  }
  // @vivliostyle/theme-slide
  {
    const img = await pdfToImg('packages/@vivliostyle/theme-slide/book.pdf', {
      pageNumbers: [1, 3],
    });
    fs.writeFileSync('docs/assets/captures/theme-slide.webp', img);
  }
  // @vivliostyle/theme-techbook
  {
    const img = await pdfToImg(
      'packages/@vivliostyle/theme-techbook/book.pdf',
      {
        pageNumbers: [1, 2],
      },
    );
    fs.writeFileSync('docs/assets/captures/theme-techbook.webp', img);
  }
}

await main();
