/* eslint-disable no-console */
import express from 'express';
import next from 'next';
import https from 'https';
import fs from 'fs';
import apiMiddleware from '../middleware/malAPIProxy.mjs';
import netMiddleware from '../middleware/malNetProxy.mjs';
import configDb from './config/database.mjs';
import configExpress from './config/express.mjs';
import routes from './routes.mjs';

const dev = process.env.NODE_ENV !== 'production';
const secondPort = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  configExpress(server);
  configDb();
  routes(server);
  server.use('/api/mal', apiMiddleware);
  server.use('/net', netMiddleware);

  server.all('*', (req, res) => handle(req, res));

  https.createServer({
    key: fs.readFileSync('./localhost+2-key.pem'),
    cert: fs.readFileSync('./localhost+2.pem'),
  }, server).listen(secondPort, (err) => {
    if (err) throw err;
    console.log(`> Ready on https://localhost:${secondPort}`);
  });
});
