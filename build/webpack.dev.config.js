const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const mainConfig = require('./webpack.main.config');
const { resolve } = require('./utils');

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new FriendlyErrorsPlugin(),
  ],
  devServer: {
    proxy: {
      '/query': 'http://182.92.99.233:8001'
    }
  }
}

module.exports = merge(mainConfig, devConfig)