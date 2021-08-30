const CompressionPlugin = require('compression-webpack-plugin')
const SpritePlugin = require('./svg-sprite.js')

module.exports = {
  lintOnSave: 'warning',
  css: {
    extract: false
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/accounts/' : '/',
  assetsDir: 'static',
  configureWebpack: {
    plugins: [
      new CompressionPlugin(),
      new SpritePlugin({ path: './icons' })
    ],
    optimization: {
      splitChunks: {
        minSize: 50000,
      }
    }
  },
  pages: process.env.NODE_ENV === 'production'
  ? {
    activate: {
      entry: 'src/pages/activate/main.js',
      template: 'public/index.html',
      filename: 'activate/index.html',
      title: 'Activate Account'
    },
    signup: {
      entry: 'src/pages/signup/main.js',
      template: 'public/index.html',
      filename: 'signup/index.html',
      title: 'Sign Up'
    },
    'new-password': {
      entry: 'src/pages/new-password/main.js',
      template: 'public/index.html',
      filename: 'new-password/index.html',
      title: 'New Password'
    }
  }
  : {
    index: {
      entry: 'src/pages/main-dev.js'
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()

    config.module
      .rule('svg')

      .oneOf('inline-svg')
        .resourceQuery(/inline/)
        .use('babel')
          .loader('babel-loader')
          .end()
        .use('vue-svg-loader')
          .loader('vue-svg-loader')
          .end()
        .end()

      .oneOf('other')
        .use('file-loader')
          .loader('file-loader')
          .options({
            name: 'static/img/[name].[hash:8].[ext]'
          })
          .end()
        .end()
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost',
        changeOrign: true
      }
    }
  }
}
