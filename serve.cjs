const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3020;
const DIR = path.join(__dirname, 'public');

const TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

http.createServer((req, res) => {
  let p = req.url === '/' ? '/index.html' : req.url;
  // Strip query strings
  p = p.split('?')[0];
  const fp = path.join(DIR, p);
  
  fs.readFile(fp, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(fp).toLowerCase();
    res.writeHead(200, {
      'Content-Type': TYPES[ext] || 'application/octet-stream',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`HB Tier List → http://localhost:${PORT}`);
});
