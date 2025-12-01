import * as server from 'next-intl/server';
console.log('Exports:', Object.keys(server));
// Check getRequestConfig
// It might be a named export in the namespace, or on default
console.log('getRequestConfig:', server.getRequestConfig);
if (server.default) {
  console.log('Default export keys:', Object.keys(server.default));
  console.log('Default.getRequestConfig:', server.default.getRequestConfig);
}
