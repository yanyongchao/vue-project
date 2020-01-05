const path = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const chalk = require('chalk')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  entry: {
    main: resolve('src/index.js')
  },
  output: {
    path: resolve('dist'),
    filename: 'js/[name].[hash:8].js',
    publicPath: '/'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true
      }),
      // 压缩css资源的
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        // cssnano是PostCSS的CSS优化和分解插件。cssnano采用格式很好的CSS，并通过许多优化，以确保最终的生产环境尽可能小。
        cssProcessor: require('cssnano')
      })
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js',
      '@': resolve('src')
    },
    extensions: ['*', '.js', '.json', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader', 
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
        include: resolve('src'),
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, 'src')], // 指定检查的目录
        options: { fix: true } // 这里的配置项参数将会被传递到 eslint 的 CLIEngine   
      },
      {
        test: /\.(jpg|png|bmp|gif|svg)/,
        use: [
          {
            loader: 'url-loader',
            options: { 
              limit: 4096,
              outputPath: 'images', // 输出到某个文件夹
              publicPath: '/images' 
            }
          }
        ]
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
    new Webpack.NamedModulesPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin()
  ],
  devServer: {
    contentBase: resolve('dist'),
    host: 'localhost',
    compress: true,
    port: 3000
  }
}

/**
 * loader 转化器
 * loader顺序：从右往左，从下到上
 * loader分类(enforce)：前置loader(pre) 后置loader(post) 普通loader(normal)
 */