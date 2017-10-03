var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: "./build/",
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
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
    })
  ],
}
