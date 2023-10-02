import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (req, res, next) {
  // console.log("Received request at", req.url);

  const proxy = createProxyMiddleware({
    target: 'https://api.myanimelist.net',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
    onProxyRes: function (proxyRes, req, res) {
      let body = [];
      proxyRes.on('data', (chunk) => {
        body.push(chunk);
      });
      proxyRes.on('end', () => {
        body = Buffer.concat(body).toString();
        console.log(`Response from APIMyAnimeList for ${req.url}:`, proxyRes.statusCode, body);
      });
    }
  });

  // console.log("Proxying request to", 'https://api.myanimelist.net' + req.url.replace('/api', ''));
  proxy(req, res, next);
};
