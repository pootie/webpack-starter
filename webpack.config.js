const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const glob = require('glob');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const HOST = (process.env.HOST || 'localhost');
const PORT = (process.env.PORT || 8080);
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  modules: path.join(__dirname, 'node_modules')
};

const commonConfig = merge([
  {
    // Entries have to resolve to files! They rely on Node
    // convention by default so if a directory contains *index.js*,
    // it resolves to that.
    entry: {
      app: PATHS.app
    },
    output: {
      path: PATHS.build,
      filename: '[name].js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack starter'
      }),
      new FriendlyErrorsWebpackPlugin({
        clearConsole: false
      })
    ]
  },
  parts.lintJavaScript({ include: PATHS.app }),
  parts.lintCSS({ include: PATHS.app })
]);

const productionConfig = merge([
  parts.extractCSS({ use: ['css-loader', parts.autoprefix()] }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true })
  })
]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: HOST,
    port: PORT
  }),
  parts.loadCSS()
]);

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }
  return merge(commonConfig, developmentConfig);
};
