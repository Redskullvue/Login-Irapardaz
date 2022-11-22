const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //This Property is used here to fix the CORS Error
  devServer: {
    proxy: 'https://reqres.in/',
}
})
