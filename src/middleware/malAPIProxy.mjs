/* eslint-disable no-console */
import { createProxyMiddleware } from 'http-proxy-middleware';

const MALProxy = (req, res, next) => {
  const proxy = createProxyMiddleware({
    target: 'https://api.myanimelist.net',
    changeOrigin: true,
    pathRewrite: { '^/api/mal': '' },
    onProxyRes(proxyRes) {
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
};

export default MALProxy;
