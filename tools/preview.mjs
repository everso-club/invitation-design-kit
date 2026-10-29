#!/usr/bin/env node
/**
 * Preview a design in the browser, on the real invitation renderer.
 *
 *   npm run preview -- <id>              designs/<id> (or examples/<id>, or a path)
 *   npm run preview -- <id> --port 5300
 *   npm run preview -- <id> --no-open    don't open a browser tab
 *
 * Serves the prebuilt preview app (preview/app), the engine's own artwork
 * (preview/invite-templates) and your design folder, and reloads the page
 * whenever a file in the folder changes. Nothing leaves your computer
 * except font requests to Google Fonts.
 */
import { createReadStream, existsSync, readFileSync, statSync, watch } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, sep } from 'node:path';
import { spawn } from 'node:child_process';
import { KIT, c, findDesign, option, positional, readDesign, rel, run } from './lib/kit.mjs';

const APP = join(KIT, 'preview/app');
const ENGINE_FILES = join(KIT, 'preview/invite-templates');
const LOCAL = '/invite-templates/__local/';
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.mp3': 'audio/mpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
};
// Reload the board when a design file changes (iframes reload with it).
const RELOAD = '<script>if(window.top===window){new EventSource("/__reload").onmessage=()=>location.reload()}</script>';

/** Serve `file` if it's inside `root`; false when it isn't there. */
function sendFile(res, root, relPath, cache) {
  const file = normalize(join(root, relPath));
  if (!file.startsWith(root + sep) || !existsSync(file) || statSync(file).isDirectory()) return false;
  res.writeHead(200, {
    'Content-Type': MIME[extname(file).toLowerCase()] || 'application/octet-stream',
    'Content-Length': statSync(file).size,
    'Cache-Control': cache,
  });
  createReadStream(file).pipe(res);
  return true;
}

function openBrowser(url) {
  const [cmd, args] = process.platform === 'darwin' ? ['open', [url]]
    : process.platform === 'win32' ? ['cmd', ['/c', 'start', '', url]]
      : ['xdg-open', [url]];
  spawn(cmd, args, { stdio: 'ignore', detached: true }).on('error', () => {}).unref();
}

run(async () => {
  const folder = findDesign(positional()[0], 'Usage: npm run preview -- <id>');
  const spec = readDesign(folder);
  if (!existsSync(join(APP, 'index.html'))) {
    console.error(`\n${c.red('✗')} The preview app is missing (preview/app). Download the kit again.\n`);
    process.exit(1);
  }
  const html = readFileSync(join(APP, 'index.html'), 'utf8').replace('</body>', `${RELOAD}</body>`);
  const clients = new Set();

  const server = createServer((req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (path === '/__reload') {
      res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-store', Connection: 'keep-alive' });
      res.write(': connected\n\n');
      clients.add(res);
      req.on('close', () => clients.delete(res));
      return;
    }
    if (path.startsWith(LOCAL) && sendFile(res, folder, path.slice(LOCAL.length), 'no-store')) return;
    if (path.startsWith('/invite-templates/') && !path.startsWith(LOCAL) && sendFile(res, ENGINE_FILES, path.slice('/invite-templates/'.length), 'max-age=3600')) return;
    if (path.startsWith('/assets/') && sendFile(res, APP, path.slice(1), 'max-age=31536000, immutable')) return;
    if (path === '/' || path.startsWith('/__design-preview')) {
      res.writeHead(200, { 'Content-Type': MIME['.html'], 'Cache-Control': 'no-store' });
      return res.end(html);
    }
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('not found');
  });

  // Debounced: editors often write a file in several steps.
  let timer;
  watch(folder, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => clients.forEach((r) => r.write('data: reload\n\n')), 150);
  });

  // Use the requested port, or the next free one.
  let port = Number(option('port', 5199));
  const listen = () => server.listen(port, '127.0.0.1');
  server.on('error', (e) => {
    if (e.code !== 'EADDRINUSE' || port > Number(option('port', 5199)) + 20) throw e;
    port++;
    listen();
  });
  server.on('listening', () => {
    const url = `http://localhost:${port}/__design-preview`;
    console.log(`\n${c.bold(spec.name || spec.id)} ${c.dim(`· ${rel(folder)}`)}\n→ ${c.bold(url)}\n${c.dim('Saving any file in the folder reloads the page. Ctrl+C to stop.')}\n`);
    if (!process.argv.includes('--no-open')) openBrowser(url);
  });
  listen();
});
