import * as middleware from 'next-intl/middleware';
console.log('Exports:', Object.keys(middleware));
console.log('Default export:', middleware.default);
console.log('Type of default:', typeof middleware.default);
