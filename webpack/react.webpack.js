const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rootPath = path.resolve(__dirname, '..')
const port = process.env.PORT || 4000;
const publicPath = `http://localhost:${port}/`;

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    mainFields: ['main', 'module', 'browser']
  },
  entry: path.resolve(rootPath, 'src', 'App.tsx'),
  target: 'electron-renderer',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
    ]
  },
  devServer: {
    contentBase: path.join(rootPath, 'dist/renderer'),
    compress: true,
    hot: true,
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    path: path.resolve(rootPath, 'dist/renderer'),
    filename: 'js/[name].js',
    publicPath: './'
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin()
  ]
}
