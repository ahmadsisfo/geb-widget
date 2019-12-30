const path = require('path')
const webpack = require('webpack')

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],  
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ],    
    output: {
      filename: 'app.0.0.1.js', 
      chunkFilename: 'app.0.0.1.js',
    }
  },
  chainWebpack:
    config => {
      if (config.plugins.has("extract-css")) {
        const extractCSSPlugin = config.plugin("extract-css");
        extractCSSPlugin &&
          extractCSSPlugin.tap(() => [
            {
              filename: 'app.0.0.2.css',
              chunkFilename: 'app.0.0.2.css'
            }
          ]);
      }
      config.optimization.delete('splitChunks')
    }
}