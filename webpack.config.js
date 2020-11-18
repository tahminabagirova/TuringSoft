const path = require('path');
const webpack = require('webpack');
const hbs = require('./build-utils/handlebars.js');

// plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

// variables
const IS_PROD = process.env.NODE_ENV === "production";
const DIR_PROJECT = 'src';
const DIR_DIST = 'build';

module.exports = {
  mode: IS_PROD ? "production" : "development",
  context: path.resolve(__dirname, 'src'),
  entry: [
    './js/app.js',
    './styles/style.scss',
  ],
  output: {
    path: path.resolve(__dirname, DIR_DIST),
    filename: 'js/[name].js',
    publicPath: ''
  },
  devServer: {
    disableHostCheck: true,   // That solved it
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      // {
      //   test: /\.(png|jpg|gif|bmp|jpeg)$/,
      //   loader: 'file-loader?limit=100000',
      //   options: {
      //     name: 'images/[name].[hash].[ext]',
      //     outputPath: 'images/',
      //     useRelativePath: true // IS_PROD
      //   }
      // },
      {
        test: /\.(png|jpg|gif|bmp|jpeg)$/,
        loader: 'file-loader?limit=100000',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/',
          publicPath: '../assets/',
          useRelativePath: true // IS_PROD
        }
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          helperDirs: hbs.vars.helpers,
          partialDirs: hbs.vars.partials
        }
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          // fallback to style-loader in development
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: '../fonts'
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    ],
  },
  // watch: true,
  plugins: [
    new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'}),
    new SpritesmithPlugin({
      src: {
          cwd: path.resolve(__dirname, DIR_PROJECT, 'styles/icons'),
          glob: '*.png'
      },
      target: {
          image: path.resolve(__dirname, DIR_PROJECT, 'static/assets/sprite.png'),
          css: path.resolve(__dirname, DIR_PROJECT, 'styles/molecules/sprite.scss')
      },
      apiOptions: {
          cssImageRef: IS_PROD ? "/assets/sprite.png" : "/src/static/assets/sprite.png"
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin([{
      from: 'static',
    }, ]),
    ...hbs.content.pages
  ]
};
