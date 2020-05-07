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
    main: [resolve('../src/index.js')]
  },
  output: {
    path: resolve('../dist'),
    filename: isProd ? 'js/[name].[chunkhash:8].js' : 'js/[name].[hash:8].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js',
      '@': resolve('../src')
    },
    extensions: ['*', '.js', '.json', '.vue'],
    // 这样引组件的时候，就可以直接引用，如import Dialog from 'dialog'，会去寻找 ./src/components/dialog
    modules: ['./src/components', 'node_modules']
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
        include: resolve('../src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader'
          },
          {
            loader: 'thread-loader',
            options: {
              workers: 3
            }
          },
          {
            loader: 'babel-loader'
            // include: resolve('../src'),
            // exclude: /node_modules/
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, '../src')], // 指定检查的目录
        options: { fix: true } // 这里的配置项参数将会被传递到 eslint 的 CLIEngine   
      },
      {
        test: /\.(jpg|png|bmp|gif|svg|gpeg)/,
        use: [
          {
            loader: 'url-loader',
            options: { 
              limit: 4096,
              name: '[name].[hash:8].[ext]',
              outputPath: 'images',
              publicPath: '/images',
              esModule: false
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
      // 为什么用contenthash，js使用chunkhash，当js变化是，所关联的css的hash也会变，但是用contenthash就不会变
      filename: isProd ? 'css/[name].[contenthash:8].css' : 'css/[name].css',
      chunkFilename: isProd ? 'css/[id].[contenthash:8].css' : 'css/[id].css'
    }),
    new Webpack.ProvidePlugin({
      // 不用在导入vue，就可以使用Vue
      Vue: ['vue/dist/vue.esm.js', 'default']
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

/**
 * loader 转化器
 * loader顺序：从右往左，从下到上
 * loader分类(enforce)：前置loader(pre) 后置loader(post) 普通loader(normal)
 */