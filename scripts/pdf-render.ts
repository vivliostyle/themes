import * as fs from 'node:fs';

import type { Canvas, SKRSContext2D } from '@napi-rs/canvas';
import { createCanvas, DOMMatrix } from '@napi-rs/canvas';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import type { PDFDocumentProxy } from 'pdfjs-dist/legacy/build/pdf.mjs';

// pdf.js paints patterns with the global DOMMatrix, which it can only polyfill
// from node-canvas, not from @napi-rs/canvas.
// oxlint-disable-next-line typescript/no-unsafe-type-assertion
globalThis.DOMMatrix ??= DOMMatrix as unknown as typeof globalThis.DOMMatrix;

type CanvasFactoryInstance<T = { canvas: Canvas; context: SKRSContext2D }> = {
  [K in keyof T]: T[K] | null;
};

// https://github.com/mozilla/pdf.js/blob/master/src/display/base_factory.js#L51
const canvasFactory = {
  create(width: number, height: number): CanvasFactoryInstance {
    if (width <= 0 || height <= 0) {
      throw new Error('Invalid canvas size');
    }
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    return { canvas, context };
  },
  reset(
    canvasAndContext: CanvasFactoryInstance,
    width: number,
    height: number,
  ): void {
    if (!canvasAndContext.canvas) {
      throw new Error('Canvas is not specified');
    }
    if (width <= 0 || height <= 0) {
      throw new Error('Invalid canvas size');
    }
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  },
  destroy(canvasAndContext: CanvasFactoryInstance): void {
    if (!canvasAndContext.canvas) {
      throw new Error('Canvas is not specified');
    }
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  },
};

export function openPdf(input: string): Promise<PDFDocumentProxy> {
  const data = new Uint8Array(fs.readFileSync(input));
  return pdfjs.getDocument({ data, canvasFactory, verbosity: 0 }).promise;
}

export async function renderPage(
  pdfDocument: PDFDocumentProxy,
  pageNumber: number,
  scale: number,
): Promise<Canvas> {
  const page = await pdfDocument.getPage(pageNumber);
  const viewport = page.getViewport({ scale });

  const canvas = createCanvas(viewport.width, viewport.height);
  const canvasContext = canvas.getContext('2d');
  await page.render({
    // @napi-rs/canvas implements enough of the 2D context for pdf.js, but
    // the two context types are unrelated as far as TypeScript is concerned.
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    canvasContext: canvasContext as unknown as CanvasRenderingContext2D,
    viewport,
  }).promise;
  return canvas;
}
