const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('./utils');

module.exports = {
  entry: {
    main:resolve('sdk/index.js'),
  },
  output: {
    path: resolve('server/sdk'),
    publicPath: '/',
    filename: '[name].[hash].js',
  },
  resolve: {
    modules: [resolve('node_modules')],
    extensions: [
      '.js',
    ],
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: resolve('sdk'),
        exclude: /node_modules/,
      },
    ],
  },
  performance: {
    hints: false,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'sdk',
          test: /[\\/]sdk[\\/]/,
          chunks: 'initial',
          priority: -1,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'dev'),
    }),
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true
      },
      filename: 'index.html',
      template: resolve('demo/index.html'),
      inject: 'head'
    }),
  ],
};
