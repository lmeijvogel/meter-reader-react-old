var path = require('path');
var webpack = require('webpack');

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
    }]
  },
  plugins: [
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    function() {
      this.plugin("done", function(stats) {
        require("fs").writeFileSync(
          path.join(__dirname, "..", "stats.json"),
          JSON.stringify(stats.toJson().assetsByChunkName.main));
      });
    }
  ],
}
