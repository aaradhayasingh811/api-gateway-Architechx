const { createProxyMiddleware } = require('http-proxy-middleware');
const breaker = require('../utility/circuitBreaker');

function setupProxies(app) {
  app.use('/layout', createProxyMiddleware({
    target: process.env.LAYOUT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/layout': '/api/v1' },
    onError: (err, req, res) => {
      console.error('Layout Service Error:', err.message);
      res.status(502).json({ error: 'Layout service unavailable' });
    },
  }));

  app.use('/auth', createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/auth': '/api/v1' },
    onError: (err, req, res) => {
      console.error('Auth Service Error:', err.message);
      res.status(502).json({ error: 'Auth service unavailable' });
    },
  }));

  app.use('/user', createProxyMiddleware({
    target: process.env.USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/user': '/api/v1' },
    onError: (err, req, res) => {
      console.error('User Service Error:', err.message);
      res.status(502).json({ error: 'User service unavailable' });
    },
  }));

  app.use('/export', createProxyMiddleware({
    target: process.env.EXPORT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/export': '/api/v1' },
    onError: (err, req, res) => {
      console.error('Export Service Error:', err.message);
      res.status(502).json({ error: 'Export service unavailable' });
    },
  }));
}

module.exports = setupProxies;
