var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: "./dist/",
    filename: 'bundle-[hash].js',
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
    new CleanWebpackPlugin(['dist'], {
      paths: ['./dist'],
      exclude: ['login.html'],
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
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),

      title: "Energie",
      appMountId: 'app'
    })

  ],
}
