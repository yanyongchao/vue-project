const path = require('path')
const merge = require('webpack-merge')
const Webpack = require('webpack')
const baseConf = require('./webpack.base.conf')
const apiMocker = require('mocker-api')

const PORD = 3000

const resolve = dir => path.resolve(__dirname, dir)

module.exports = merge(baseConf, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new Webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('development')
    }),
    new Webpack.NamedModulesPlugin(),
    new Webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: resolve('../dist'),
    host: 'localhost',
    compress: true,
    port: PORD,
    inline: true,
    hot: true,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'https://merchantapp-admin-test.51fubei.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      // mocker-api
      '/mock': {
        target: `http://localhost:${PORD}/mock`,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/mock': ''
        }
      }
    },
    before (app) {
      apiMocker(app, path.resolve('./mock/index.js'))
    }
  }
})