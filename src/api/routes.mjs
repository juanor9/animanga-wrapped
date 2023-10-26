import healthcheck from './healthcheck/index.mjs';
import user from './user/index.mjs';
// import authLocal from './auth/local';

function routes(app) {
  app.use('/api/healthcheck', healthcheck);

  app.use('/api/user', user);

  // auth routes
  // app.use('/auth/local', authLocal);
  // report errors
}

export default routes;
