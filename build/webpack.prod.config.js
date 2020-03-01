const merge = require('webpack-merge');
const mainConfig = require('./webpack.main.config');
const { resolve } = require('./utils');

const prodConfig = {
  mode: 'production',
  devtool: false,
}

module.exports = merge(mainConfig, prodConfig)