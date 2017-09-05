exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    overlay: {
      errors: true,
      warnings: true
    }
  }
});

exports.lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        enforce: 'pre',

        loader: 'eslint-loader',
        options
      }
    ]
  }
});

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        include,
        exclude,

        use: ['style-loader', {
          loader: 'css-loader', options: {
            sourceMap: true
          }}, {
          loader: 'postcss-loader',
          options: {
            plugins: () => ([
              require('autoprefixer'),
              require('precss')
            ]),
            sourceMap: true
          }}, {
          loader: 'sass-loader', options: {
            sourceMap: true
          }
        }]
      }
    ]
  }
});
