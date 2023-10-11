import healthcheck from './healthcheck/index.mjs';
// import user from './api/user';
// import authLocal from './auth/local';

function routes(app) {
  app.use('/api/healthcheck', healthcheck);

  // app.use('/api/users', user);

  // auth routes
  // app.use('/auth/local', authLocal);
  // report errors
}

export default routes;
