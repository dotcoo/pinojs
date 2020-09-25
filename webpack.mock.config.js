const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
  mode: 'development',
  entry: {
    'pino.mock': path.join(__dirname, './src/mock/index.js'),
    'pino.mock.min': path.join(__dirname, './src/mock/index.js'),
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    globalObject: 'this',
    library: 'pinomock',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  plugins: [],
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
};

if (process.env.NODE_ENV === 'development') {
  config.entry = path.join(__dirname, './test/dev.js');
  config.plugins.push(new HtmlPlugin({
    template: './test/dev.html',
    filename: 'index.html',
  }));
}

module.exports = config;
