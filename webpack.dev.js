const { merge } = require('webpack-merge');
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: './public',
    historyApiFallback: { 
      index: "index.html", 
      disableDotRule: true 
    },
  }
});