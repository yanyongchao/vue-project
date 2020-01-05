const path = require('path')
const merge = require('webpack-merge')
const Webpack = require('webpack')
const baseConf = require('./webpack.base.conf')

const resolve = dir => path.resolve(__dirname, dir)

module.exports = merge(baseConf, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  plugins: [
    new Webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('development')
    })
    
  ],
  devServer: {
    contentBase: resolve('../dist'),
    host: 'localhost',
    compress: true,
    port: 3000
  }
})