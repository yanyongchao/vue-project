const Webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    vue: ['vue', 'vue-router']
  },
  output: {
    path: path.join(__dirname, '..', 'static', 'js'),
    library: '[name]_dll',
    filename: '[name]_dll.js'
  },
  plugins: [
    new Webpack.DllPlugin({
      name: '[name]_dll',
      path: path.join(__dirname, '[name]_dll_manifest.json')
    })
  ]
}
