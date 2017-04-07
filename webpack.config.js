const webpack = require('webpack');
const path = require('path');

module.exports = {
  // Path to client-side JS folder where my entry point is located
  context: path.join(__dirname, 'src'),
  // File that we want to include in our build
  entry: ['./index.jsx'],
  // What Webpack will name the file it builds (bundle.js)
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  // How modules should be handled before being added to the bundle
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  },
  // Let Webpack know where to find our loaders and npm packages
  resolveLoader: {
    modules: [path.resolve(__dirname, "index"), "node_modules"]
  },
  resolve: {
    modules: [path.resolve(__dirname, "index"), "node_modules"]
  }
}