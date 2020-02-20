const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
  mode: 'development',
  entry: {
    'pino': path.join(__dirname, './src/index.js'),
    'pino.min': path.join(__dirname, './src/index.js'),
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    library: 'pino',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
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
  config.entry = path.join(__dirname, './test/test.js');
  config.plugins.push(new HtmlWebpackPlugin({
    template: './test/test.html',
    filename: 'index.html',
  }));
}

module.exports = config;
