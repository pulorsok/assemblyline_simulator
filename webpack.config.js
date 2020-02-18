const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  target: 'web',
  entry: {
    filename: './src/sketch.js'
  },
  devtool:'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3000
  },
  plugins: [
    new UglifyJsPlugin({
      cache: true,
      sourceMap: true,
      parallel: true,
      extractComments: true,
      uglifyOptions: {
        output: {
          comments: false
        },
        compress: true
      }
    })
  ]  
}
