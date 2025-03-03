const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-optional-chaining'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      "util": require.resolve("util/"),
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "querystring": require.resolve("querystring-es3"),
      "url": require.resolve("url/"),
      "assert": require.resolve("assert/"),
      "buffer": require.resolve("buffer/"),
      "path": require.resolve("path-browserify"),
      "https": require.resolve("https-browserify"),
      "http": require.resolve("stream-http"),
      "zlib": require.resolve("browserify-zlib"),
      "vm": require.resolve("vm-browserify"), // Add this line
      "fs": false,
      "net": false,
      "tls": false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public/images', to: 'images' },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8080,
    hot: true,
    historyApiFallback: true,
  },
};