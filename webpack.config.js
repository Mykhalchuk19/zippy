const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '/src'),
  dist: path.join(__dirname, '/dist'),
  assets: 'assets/',
  style: 'style/',
};

const PAGES_DIR = PATHS.src;

module.exports = {
  entry: __dirname + '/src/app/index.js', // webpack entry point. Module to start building dependency graph
  output: {
    path: __dirname + '/dist', // Folder to store generated bundle
    filename: 'bundle.js', // Name of generated bundle after build
    chunkFilename: 'js/[name].chunk.js',
    //publicPath: '/', // public URL of the output directory when referenced in a browser
  },
  resolve: {
    alias: {
      '~': PATHS.src,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      /*filename: '[name].css',
      chunkFilename: '[id].css',*/
      filename: `[name].css`,
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
      { from: `${PATHS.src}/${PATHS.assets}video`, to: `${PATHS.assets}video` },
    ]),
  ],
  module: {
    // where we defined file patterns and their loaders
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: [/node_modules/],
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
        test: /\.(css|s(a|c)ss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader?sourceMap=true', 'sass-loader'],
      },
      /* {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'dist/assets/fonts/[name].[ext]',
          },
        },
      },*/
      /*{
        test: /\.(ico|jpg|jpeg|png|gif|webp|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },*/
      {
        //fonts
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        // images / icons
        test: /\.(png|jpg|gif|svg|mp4)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
  devServer: {
    // configuration for webpack-dev-server
    contentBase: './src/public', //source of static assets
    port: 7700, // port to run dev-server
  },
};
