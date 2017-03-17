var path = require('path');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var webpackConfig = {
  entry: './lib/',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-amap.js',
    library: 'ReactAMAP',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
        exclude: /node_modules/,
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
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  },
  plugins: []
};

if (process.env.NODE_ENV === 'production') {
  webpackConfig.output.filename = 'react-amap.min.js';
  webpackConfig.plugins.push(new UglifyJSPlugin());
}

module.exports = webpackConfig;
