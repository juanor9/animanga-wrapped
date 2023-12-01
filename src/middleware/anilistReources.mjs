/* eslint-disable no-console */
import { createProxyMiddleware } from 'http-proxy-middleware';

const MALProxy = (req, res, next) => {
  const proxy = createProxyMiddleware({
    target: 'https://s4.anilist.co/',
    changeOrigin: true,
    pathRewrite: { '^/api/al/sources': '' },
    onProxyRes(proxyRes) {
      let body = [];
      proxyRes.on('data', (chunk) => {
        body.push(chunk);
      });
      proxyRes.on('end', () => {
        body = Buffer.concat(body).toString();
        console.log(`Response from APIMyAnimeList for ${req.url}:`, proxyRes.statusCode, body);
      });
    },
  });

  console.log('Proxying request to', `https://s4.anilist.co/${req.url.replace('/api', '')}`);
  proxy(req, res, next);
};

export default MALProxy;
