module.exports = {
  chainWebpack: config => {
    // Markdown loader
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('html-loader')
      .loader('markdown-loader')
      .loader('html-loader')
      .end()
  }
}
