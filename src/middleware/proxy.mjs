/* eslint-disable import/no-anonymous-default-export */
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (req, res, next) {

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
      });
    },
  });

  proxy(req, res, next);
}
