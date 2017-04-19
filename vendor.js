var webpack = require('webpack');
var path    = require('path');

var config  = require('./config');

var PORT = config.PORT;

var vendor = [
  'babel-polyfill',
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'redux',
  'redux-saga',
  'redux-saga/effects',
  'whatwg-fetch'
]

if (process.env.NODE_ENV === 'develop') {
  vendor.push('webpack-dev-server/client?http://localhost:' + PORT);
}

module.exports = {
  entry: {
    vendor: vendor
  },
  output: {
    filename: 'vendor.js',
    path: path.join(__dirname, 'public/dist'),
    library: 'vendor',
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'vendor',
      path: path.join(__dirname, 'manifest.json')
    })
  ]
};
