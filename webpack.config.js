module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'source-map-loader',
        enforce: 'pre',
      },
    ],
  },
  devtool: 'source-map', // or 'inline-source-map'
};