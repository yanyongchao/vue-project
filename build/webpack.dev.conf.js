const path = require('path')
const merge = require('webpack-merge')
const baseConf = require('./webpack.base.conf')

const resolve = dir => path.resolve(__dirname, dir)

module.exports = merge(baseConf, {
  devServer: {
    contentBase: resolve('../dist'),
    host: 'localhost',
    compress: true,
    port: 3000
  }
})