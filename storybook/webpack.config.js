const path = require('path')
const webpack = require('webpack')

module.exports = {
  externals: {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'react/addons': true,
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css',
        include: path.resolve(__dirname, '../'),
      },
      /**
      {
        test: /.css$/,
        loaders: ['style', 'css?modules&localIdentName=[name]---[local]---[hash:base64:5]'],
        include: path.resolve(__dirname, '../'),
      },
      **/
    ],
  },
}
