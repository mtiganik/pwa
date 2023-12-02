'use strict';

const {WebpackPluginServe: Serve} = require('webpack-plugin-serve');
const path = require('path');

const options = {
  compress: true,
  client: {
    silent: false,
  },
  port: 8099,
  host: 'localhost', 
  static: ['./dist', './public'],
};

module.exports = {
  mode: 'development',
  entry: {
    'app': [
      './src/index.tsx',
      // './src/app.ts',
      // 'webpack-plugin-serve/client',
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
  },
  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.tsx?$/,
      },
    ],
  },
  plugins: [
    new Serve(options),
  ],
};
