const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 3101);
const ROOT = path.resolve(__dirname, '..');
const MANIFEST = path.join(
  ROOT,
  'public',
  'assets',
  'sample-story',
  'manifest.sample.json',
);
const UI = path.join(__dirname, 'template-tools-ui.html');

const send = (res, status, body, type = 'text/plain; charset=utf-8') => {
  res.writeHead(status, { 'Content-Type': type });
  res.end(body);
};

const server = http.createServer((req, res) => {
  if (!req.url) {
    send(res, 404, 'Not found');
    return;
  }

  if (req.url === '/' || req.url === '/index.html') {
    send(res, 200, fs.readFileSync(UI, 'utf8'), 'text/html; charset=utf-8');
    return;
  }

  if (req.url === '/api/manifest' && req.method === 'GET') {
    send(res, 200, fs.readFileSync(MANIFEST, 'utf8'), 'application/json');
    return;
  }

  if (req.url === '/api/manifest' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        fs.writeFileSync(MANIFEST, JSON.stringify(parsed, null, 2) + '\n');
        send(res, 200, JSON.stringify({ ok: true }), 'application/json');
      } catch (error) {
        send(res, 400, JSON.stringify({ ok: false, error: String(error) }), 'application/json');
      }
    });
    return;
  }

  send(res, 404, 'Not found');
});

server.listen(PORT, () => {
  console.log(`Template correction tool: http://localhost:${PORT}/`);
});
