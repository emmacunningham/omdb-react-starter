var path     = require('path');
var webpack  = require('webpack');

var config   = require('./config');
var manifest = require('./manifest');

var CONTEXT = __dirname;
var PORT    = config.PORT;

module.exports = {
  context: CONTEXT,
  entry: ['whatwg-fetch', 'babel-polyfill', './ui/entry.js'],
  output: {
    path: path.resolve(CONTEXT, 'public/dist'),
    publicPath: 'http://localhost:' + PORT + '/dist/',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0'],
          plugins: ['transform-decorators-legacy']
        }
      }, {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: ['transform-decorators-legacy']
        }
      }, {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devServer: {
    contentBase: 'public',
    inline: true,
    port: PORT,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DllReferencePlugin({ context: CONTEXT, manifest: manifest }),
  ]
}
