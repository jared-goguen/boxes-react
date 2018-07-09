let path = require('path');
let webpack = require('webpack');

module.exports = {
  target: 'web',
  mode: 'development',
  entry: {
    app: './src/index.js'
  },
  devServer: {
    contentBase: './public',
    hot: true
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { 
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader"}
        ]
      }
    ]
  }
};