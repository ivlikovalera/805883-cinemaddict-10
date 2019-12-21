const path = require(`path`);
// const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    // eslint-disable-next-line no-undef
    path: path.join(__dirname, `public`)
  },
  devtool: `source-map`,
  devServer: {
    // eslint-disable-next-line no-undef
    contentBase: path.join(__dirname, `public`),
    publicPath: `http://localhost:8080/`,
    compress: true,
    watchContentBase: true,
  },
  // plugins: [
  //  new MomentLocalesPlugin({
  //    localesToKeep: [`es-us`],
  //  }),
  // ],
};
