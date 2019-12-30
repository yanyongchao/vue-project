const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const chalk = require('chalk')

const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  entry: {
    main: ['@babel/polyfill', resolve('src/index.js')]
  },
  output: {
    path: resolve('dist'),
    filename: 'js/[name].[chunkhash:8].js',
    publicPath: '/'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true
      }),
      //压缩css资源的
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp:/\.css$/g,
        //cssnano是PostCSS的CSS优化和分解插件。cssnano采用格式很好的CSS，并通过许多优化，以确保最终的生产环境尽可能小。
        cssProcessor:require('cssnano')
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          }, 
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.jsx?/,
        use: 'babel-loader',
        include: resolve('src'),
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [ path.resolve(__dirname, 'src') ], // 指定检查的目录
        options: { fix: true } // 这里的配置项参数将会被传递到 eslint 的 CLIEngine   
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('src/index.html'),
      filename: 'index.html',
      chunks: ['main']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css'
    }),
    new CleanWebpackPlugin(),
    new ProgressBarPlugin({
      format: `build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
      clear: false,
      width: 60
    }),
  ],
  devServer: {
    contentBase: resolve('dist'),
    host: 'localhost',
    compress: true,
    port: 3000
  }
}