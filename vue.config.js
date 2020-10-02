const pxRem = require('postcss-pxtorem');
module.exports = {
  devServer: {
    open: true,
    port: 9988,
    // host设为本机IP,手机连接同一局域网进行测试
    // host:'192.168.0.100'
    // pc开发测试时
    host: '127.0.0.1'
  },
  css: {
    loaderOptions: {
      postcss: {
        //selectorBlackList正则过滤，符合的class不进行rem转化
        //单个的css语句需过滤的情况下，可以使用PX或Px单位
        plugins: [
          pxRem({
            autoprefixer: {},
            rootValue: 37.5,
            propList: ['*'], // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部 默认全部处理
            selectorBlackList: ['.ig-', '.dp-']
          })
        ]
      }
    }
  }
};
