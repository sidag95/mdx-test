import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config.js';

const compiler = Webpack(config);
const devServerOptions = { ...config.devServer, open: true };
const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  console.log('Starting server...');
  await server.start();
};

runServer();
