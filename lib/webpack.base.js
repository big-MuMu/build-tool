const path = require('path');
const glob = require('glob');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cwd = process.cwd();

const setMpa = () => {
    const entry = {};
    const htmlWebpackPlugin = [];

    const entryFiles = glob.sync(path.resolve(cwd, './src/*/index.js'));

    entryFiles.forEach((file) => {
        const [, entryName] = file.match(/src\/(.*)\/index\.js/);
        entry[entryName] = `./src/${entryName}/index.js`;

        htmlWebpackPlugin.push(
            new HtmlWebpackPlugin({
                template: path.join(cwd, `src/${entryName}/index.html`),
                filename: `${entryName}.html`,
                chunks: ['vendors', entryName],
                inject: true,
                minify: {
                    html5: true
                }
            }),
        );
    });


    return {
        entry,
        htmlWebpackPlugin
    };
};

const { entry, htmlWebpackPlugin } = setMpa();

module.exports = {
    entry,
    output: {
        filename: '[name]_[chunkhash:8].js',
        path: path.resolve(cwd, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader'
                    // 'eslint-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer({
                                    browsers: ['last 2 version', '>1%']
                                })
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new CleanWebpackPlugin(),
        ...htmlWebpackPlugin
    ]
};
