const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    allowedHosts: "all",
    client: {
      webSocketURL: {
        hostname: 'localhost',
        pathname: '/ws',
        port: 8080,
        protocol: 'ws',
      }
    }
  },
  transpileDependencies: true,
  lintOnSave: false,
});
