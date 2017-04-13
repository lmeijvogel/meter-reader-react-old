var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: "./build/",
    filename: 'bundle-[hash].js'
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
    new CleanWebpackPlugin(['build'], {
      paths: ['./build'],
      exclude: ['api', 'login.html'],
      verbose: false,
      dry: false
    }),
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(), // Minify everything
    new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
    new HtmlWebpackPlugin()

  ],
}
