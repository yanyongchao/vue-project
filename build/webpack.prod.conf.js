const merge = require('webpack-merge')
// const path = require('path')
const baseConf = require('./webpack.base.conf')
const Webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TimePlugin = require('../plugin/TimePlugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

// 测量各个插件和loader所花费的时间
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const smp = new SpeedMeasurePlugin()
// const resolve = dir => path.resolve(__dirname, dir)

module.exports = smp.wrap(merge(baseConf, {
  mode: 'production',
  devtool: 'none', // none或者source-map
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
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          minChunks: 1,
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial'
        },
        // elementUI: {
        //   name: 'chunk-elementUI', // 单独将 elementUI 拆包
        //   priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
        //   test: /[\\/]node_modules[\\/]element-ui[\\/]/
        // },
        common: {
          name: 'common',
          minChunks: 2, // 最小共用次数
          priority: 5,
          reuseExistingChunk: true
        }
      }
    },
    // runtimeChunk 的作用是将包含 chunk 映射关系的列表从 main.js 中抽离出来，在配置了 splitChunk 时，记得配置 runtimeChunk.
    runtimeChunk: {
      name: 'manifest'
    }
  },
  // 配置如何显示性能提示
  performance: {
    // 可选 warning、error、false
    // false：性能设置,文件打包过大时，不报错和警告，只做提示
    // warning：显示警告，建议用在开发环境
    // error：显示错误，建议用在生产环境，防止部署太大的生产包，从而影响网页性能
    hints: false
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('production')
    }),
    new HardSourceWebpackPlugin(),
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: productionGzipExtensions,
      threshold: 10240,
      minRatio: 0.8
    }),
    new TimePlugin()
  ]
}))