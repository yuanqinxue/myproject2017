let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',// 入口文件
    output: { // 输出配置
        path: path.resolve('build'),// 输出目录
        filename: 'bundle.js'//输出的文件名
    },
    module:{
      loaders:[
          {
              test:/\.js$/,
              loader:'babel-loader',
              exclude:/node_modules/
          },
          {
              test:/\.less$/,
              loader:'style-loader!css-loader!less-loader'
          },
          {
              test:/\.(jpg|pnp|gif)$/,
              loader:'url-loader'
          }
      ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ]
};