const path = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyPlugin = require('copy-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  entry: {
    main: ['@babel/polyfill', resolve('../src/index.js')]
  },
  output: {
    path: resolve('../dist'),
    filename: 'js/[name].[chunkhash].js',
    publicPath: '/'
  },
  
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js',
      '@': resolve('../src')
    },
    extensions: ['*', '.js', '.json', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader', 
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          {
            loader: 'postcss-loader'
          },
          'less-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.jsx?/,
        use: 'babel-loader',
        include: resolve('../src'),
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, '../src')], // 指定检查的目录
        options: { fix: true } // 这里的配置项参数将会被传递到 eslint 的 CLIEngine   
      },
      {
        test: /\.(jpg|png|bmp|gif|svg)/,
        use: [
          {
            loader: 'url-loader',
            options: { 
              limit: 4096,
              outputPath: 'images',
              publicPath: '/images' 
            }
          }
        ]
      }   
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('../src/index.html'),
      filename: 'index.html',
      chunks: ['main']
    }),
    new MiniCssExtractPlugin({
      filename: isProd ? 'css/[name].[contenthash:8].css' : 'css/[name].css',
      chunkFilename: isProd ? 'css/[id].[contenthash:8].css' : 'css/[id].css'
    }),
    new Webpack.ProvidePlugin({
      Vue: 'vue'
    }),
    new ProgressBarPlugin({
      format: `build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
      clear: false,
      width: 60
    }),
    new VueLoaderPlugin(),
    new Webpack.DllReferencePlugin({ // 引用dllplugin
      manifest: path.join(__dirname, 'vue_dll_manifest.json')
    }),
    new CopyPlugin([
      {
        from: resolve('../static'),
        to: resolve('../dist/static')
      }
    ])
  ]
}