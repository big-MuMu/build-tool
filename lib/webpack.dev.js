const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base');

const devConfig = {
    mode: 'devlopment',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    // 热更新的配置
    devServer: {
        static: './dist',
        hot: true
    },
    devtool: 'sourceMap'
};

module.exports = merge(baseConfig, devConfig);
