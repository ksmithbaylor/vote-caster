var webpack = require('webpack');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var WebpackLiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: __dirname + '/src/client/index.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
    publicPath: 'public'
  },
  module: {
    preLoaders: [
      {
        loader: 'eslint',
        test: /\.jsx?/,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        loader: 'babel',
        test: /\.jsx?/,
        exclude: /node_modules/,
        query: {
          cacheDirectory: true
        }
      }
    ]
  },
  plugins: []
};

var env = process.env.WEBPACK_ENV;

if (env === 'build') {
  module.exports.plugins.push(
    new UglifyJsPlugin({ minimize: true })
  );
}

if (env === 'dev') {
  module.exports.devtool = 'source-map';
  module.exports.watch = true;

  module.exports.plugins.push(
    new WebpackLiveReloadPlugin({
      appendScriptTag: true
    })
  );
}
