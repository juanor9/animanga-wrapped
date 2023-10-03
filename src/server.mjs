import express from 'express';
import next from 'next';
import https from 'https';
import fs from 'fs';
import apiMiddleware from './middleware/malAPIProxy.mjs';
import netMiddleware from './middleware/malNetProxy.mjs';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use('/api', apiMiddleware);
  server.use('/net', netMiddleware);

  server.all('*', (req, res) => handle(req, res));

  const PORT = 3000;

  https.createServer({
    key: fs.readFileSync('./localhost+2-key.pem'),
    cert: fs.readFileSync('./localhost+2.pem'),
  }, server).listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on https://localhost:${PORT}`);
  });
});
