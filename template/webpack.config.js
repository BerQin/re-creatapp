var path = require('path')
// var entryDir = path.join(__dirname);
module.exports = {
  //入口
  entry:{
    index:'./src/app/index'
  },
  // 出口
  output: {
    publicPath: '/',
    path: '/',
    chunkFilename: '[id].chunk.js',
    filename: '[name].js'
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
  // 插件
  plugins:[],
  // 服务配置
  devServer: {
    port: 9090,
    historyApiFallback: {
      index: '/public/index.html',
      rewrites: [
        {
          from: /\/index/,
          to: '/index.html'
        }
      ]
    }
  }
}