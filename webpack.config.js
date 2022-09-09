const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
    video: path.resolve(__dirname, 'video/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].bundle.js',
  },
  module: {
    rules: [
      { test: /\.svg$/, use: 'svg-inline-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: { loader: 'file-loader' },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          // Disables attributes processing
          sources: false,
          minimize: false,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Portfolio',
      filename: 'portfolio.html',
      template: 'src/template.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      title: 'Portfolio',
      filename: 'video.html',
      template: 'src/video.html',
      chunks: ['video'],
    }),
    new CopyPlugin({
      patterns: [{ from: 'vanillajs' }],
    }),
    new CopyPlugin({
      patterns: [{ from: 'redirects' }],
    }),
  ],
  devtool: 'source-map',
  devServer: {
    static: { directory: path.resolve(__dirname, 'dist') },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
};
