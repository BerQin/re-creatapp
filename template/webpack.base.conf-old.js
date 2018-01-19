var path = require('path')
var entryDir = path.join(__dirname, 'build');

function toApp(relativePath) {
  return path.resolve(__dirname, 'src/app', relativePath);
}

module.exports = {
  //入口
  entry:{
    index:'./src/app/index'
  },
  // 出口
  output: {
    publicPath: entryDir,
    path: entryDir,
    chunkFilename: '[id].chunk.js',
    filename: '[name].js'
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css", ".less", ".scss", "html"],
    alias: {
      components: toApp('components'),
      index: toApp('index'),
      serve: toApp('serve')
    }
  },
  // 模块解析
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react'],
          plugins: ['syntax-dynamic-import']
        }
      }
    },
    {
      test: /\.css$/,
      use: ['style-loader','css-loader']
    },
    {
      test: /\.scss$/,
      use: ['style-loader','css-loader','sass-loader']
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: ['file-loader']
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: ['file-loader']
    }]
  },
  devServer: {
    compress: true,
    disableHostCheck: true,
    historyApiFallback: {
      index: '/public/index.html',
      rewrites: [
        { from: /\/index/, to: '/index.html' },
      ]
    },
    https: false,
    noInfo: false,
    port: 8080
  },
}