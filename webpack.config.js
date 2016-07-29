var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: 'public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        filename: 'index.html',
        template: 'src/index.html',
        inject: 'true'
      })
  ]
}
