module.exports = {
  port: 5222,
  open: 'external',
  host: 'dev.localhost',
  server: {
    baseDir: './dist/moralis-angular-app',
    middleware: {
      1: require('compression')()
    }
  }
};
