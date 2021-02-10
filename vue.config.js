module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        components: '@/components',
        views: '@/views',
        network: '@/network',
        common: '@/common',
      },
    },
  },
  
  publicPath: process.env.NODE_ENV === 'production' ? '/my-supermall/' : '/',
};
