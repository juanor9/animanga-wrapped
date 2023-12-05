/* eslint-disable import/no-anonymous-default-export */
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (req, res, next) {
  console.log('Received request at', req.url);

  const proxy = createProxyMiddleware({
    target: 'https://myanimelist.net',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
    onProxyRes(proxyRes, req, res) {
      let body = [];
      proxyRes.on('data', (chunk) => {
        body.push(chunk);
      });
      proxyRes.on('end', () => {
        body = Buffer.concat(body).toString();
        console.log(`Response from MyAnimeList for ${req.url}:`, proxyRes.statusCode, body);
      });
    },
  });

  console.log('Proxying request to', `https://myanimelist.net${req.url.replace('/api', '')}`);
  proxy(req, res, next);
}
