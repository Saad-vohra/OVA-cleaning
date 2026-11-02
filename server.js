const http = require('http');
const fs = require('fs');
const path = require('path');

const DEFAULT_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm'
};

function safeResolve(urlPath) {
  // strip query strings or hash
  const cleanPath = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  let relativePath = cleanPath;
  if (relativePath === '/' || relativePath === '') {
    relativePath = '/index.html';
  }
  const resolvedPath = path.normalize(path.join(ROOT_DIR, relativePath));
  if (!resolvedPath.startsWith(ROOT_DIR)) {
    return null; // prevent directory traversal
  }
  return resolvedPath;
}

const server = http.createServer((req, res) => {
  const filePath = safeResolve(req.url);

  if (!filePath) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    let target = filePath;
    if (err) {
      // Try appending .html
      if (fs.existsSync(filePath + '.html')) {
        target = filePath + '.html';
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        const notFoundPath = path.join(ROOT_DIR, 'page-404.html');
        if (fs.existsSync(notFoundPath)) {
          fs.createReadStream(notFoundPath).pipe(res);
        } else {
          res.end('<h1>404 Not Found</h1>');
        }
        return;
      }
    } else if (stats.isDirectory()) {
      target = path.join(filePath, 'index.html');
      if (!fs.existsSync(target)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Directory listing disabled');
        return;
      }
    }

    const ext = path.extname(target).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(target);
    stream.on('error', (streamErr) => {
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
      }
      res.end('500 Internal Server Error');
    });
    stream.pipe(res);
  });
});

function startServer(port) {
  server.listen(port, () => {
    console.log(`====================================================`);
    console.log(`  OVA CLEANING - Local Development Server Started`);
    console.log(`  URL: http://localhost:${port}`);
    console.log(`  Serving: ${ROOT_DIR}`);
    console.log(`  Press Ctrl + C to stop`);
    console.log(`====================================================`);
  });

  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', e);
    }
  });
}

startServer(DEFAULT_PORT);

