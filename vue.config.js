const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  configureWebpack: {
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          // exclude: /node_modules/
          include:'/src'
        }
      ]
    },
},
  transpileDependencies: true,
})
