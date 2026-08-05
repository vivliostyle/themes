import fs from 'node:fs';
import http from 'node:http';
import path, { basename, dirname, join, relative, resolve } from 'node:path';

import { stringify } from '@vivliostyle/vfm';
import chalk from 'chalk';
import chokidar from 'chokidar';
import { Command } from 'commander';
import getPort from 'get-port';
import resolvePkg from 'resolve-pkg';
import serve from 'serve-handler';

interface PreviewOptions {
  layout?: string;
}

function serveStatic(
  port: number,
  root: string,
  headers: Record<string, string> = {},
): void {
  http
    .createServer((req, res) => {
      for (const [name, value] of Object.entries(headers)) {
        res.setHeader(name, value);
      }
      void serve(req, res, { public: root });
    })
    .listen(port);
}

async function preview(argv: PreviewOptions, input: string[]): Promise<void> {
  const stylePath = input[0];
  if (!stylePath) {
    console.log(
      'vivliostyle-theme-scripts <stylePath> [--layout <layout.html>]',
    );
    process.exit(1);
  }
  const layout = argv.layout;

  const baseDir = process.cwd();

  // asset server
  const assetPort = await getPort();
  const assetRoot = path.resolve(import.meta.dirname, '../assets');
  const assetPrefix = `http://localhost:${assetPort}`;
  serveStatic(assetPort, assetRoot, { 'Access-Control-Allow-Origin': '*' });

  // vivliostyle viewer
  const viewerPort = await getPort();
  const viewerPkg = resolvePkg('@vivliostyle/viewer', { cwd: baseDir });
  if (!viewerPkg) {
    console.log('Could not resolve @vivliostyle/viewer');
    process.exit(1);
  }
  const viewerRoot = join(viewerPkg, 'lib');
  const viewerPrefix = `http://localhost:${viewerPort}`;
  serveStatic(viewerPort, viewerRoot);

  // source server
  const sourcePort = await getPort();
  const sourceRoot = baseDir;
  const sourcePrefix = `http://localhost:${sourcePort}`;
  serveStatic(sourcePort, sourceRoot, {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store',
  });

  let layoutURL = layout
    ? `${sourcePrefix}/${layout}`
    : `${assetPrefix}/default.html`;

  const styleURL = `${sourcePrefix}/${stylePath}`;

  function recompile(sourcePath: string, tmpHTMLPath: string): void {
    const convertedHTML = stringify(fs.readFileSync(sourcePath, 'utf8'));
    fs.writeFileSync(tmpHTMLPath, convertedHTML);
    console.log(`${chalk.yellow('[vfm]')} compiled`, tmpHTMLPath);
  }

  if (layout?.endsWith('.md')) {
    const layoutDir = dirname(resolve(layout));
    const tmpHTMLName = basename(layout, '.md') + '.html';
    const tmpHTMLPath = relative(baseDir, join(layoutDir, tmpHTMLName));

    chokidar
      .watch('**', {
        ignored: (p: string) => {
          return /node_modules|\.git/v.test(p);
        },
        cwd: layoutDir,
      })
      .on('change', (changed) => {
        if (!changed || !/\.(md|markdown)$/iv.test(changed)) {
          return;
        }
        recompile(layout, tmpHTMLPath);
      });
    recompile(layout, tmpHTMLPath);

    layoutURL = `${sourcePrefix}/${tmpHTMLPath}`;
  }

  const entrypoint = `${viewerPrefix}/#src=${layoutURL}&style=${styleURL}&bookMode=true&spread=false`;
  console.log(
    `open preview in the browser and test your theme ([ctrl+c] to quit)
  ${chalk.bold.green(entrypoint)}
  `,
  );
}

export default function makeCommand(): InstanceType<typeof Command> {
  const command = new Command('preview');
  command
    .description('clone a repository into a newly created directory')
    .option('-l, --layout <layout>', 'HTML Layout')
    .action(preview);
  return command;
}
