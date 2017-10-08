var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//
// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: "./build/",
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /.jsx?$|.tsx?$/,
      loader: 'awesome-typescript-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /.css$/,
      loader: 'style-loader!css-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),

      title: "Energie (dev)",
      appMountId: 'app'
    }),
    new CheckerPlugin()
  ],

  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx', '.json']
  }
}
