const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (apiBasePath, target) =>{
  console.log(`Proxying requests from ${apiBasePath} to ${target}`) ;
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${apiBasePath}`]: "", 
    },
  });
}
