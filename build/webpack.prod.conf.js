const merge = require('webpack-merge')
const baseConf = require('./webpack.base.conf')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(baseConf, {
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
  plugins: [
    new CleanWebpackPlugin()
  ]
})