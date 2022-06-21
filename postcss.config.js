module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    // 设计稿 375:37.5
    // 设计稿：750:75
    // Vant 是基于 375
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
