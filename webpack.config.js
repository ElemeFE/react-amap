var path = require('path');

module.exports = {
  entry: {
    amap:'./lib/AMap.js',
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'AMap',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
        exclude:/node_modules/,
        query: {
          limit: 10000,
          name: '[name].[ext]'
        }
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  }
};