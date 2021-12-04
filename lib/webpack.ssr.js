const merge = require('webpack-merge');
const cssnano = require('cssnano');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const baseConfig = require('./webpack.base');

const ssrConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'ignore-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'ignore-loader'
                ]
            }
        ]
    },
    plugins: [
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano
        }),
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'react',
                    entry: 'https://unpkg.com/react@17/umd/react.development.js',
                    global: 'React'
                },
                {
                    module: 'react-dom',
                    entry: 'https://unpkg.com/react-dom@17/umd/react-dom.development.js',
                    global: 'ReactDOM'
                }
            ]
        })
    ]
};

module.exports = merge(baseConfig, ssrConfig);
