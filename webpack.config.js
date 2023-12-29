const HtmlWebpackPlugin = require('html-webpack-plugin');
const { join } = require('path');

const outputPath = join(process.cwd(), '/dist');

module.exports = {
  mode: 'development',
  entry: {
    'app': ['./src/index.tsx'],
  },
  output: {
    path: outputPath,
    filename: '[name].bundle.js',
    publicPath: '/', // this is important for client-side routing
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
  devServer: {
    static: outputPath,
    compress: true,
    port: 8099,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
  ],
};
