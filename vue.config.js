const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: [
        path.resolve(__dirname, '@/assets/style/mixin.scss')
      ]
    }
  }
})

function addStyleResource (rule) {
  rule.use('style-resource')
      .loader('style-resources-loader')
      .options({
        patterns: [
          path.resolve(__dirname, '@/assets/style/constant.scss'),
          path.resolve(__dirname, '@/assets/style/mixin.scss'),
        ],
      })
}
