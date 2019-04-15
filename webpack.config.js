/*
|----------------------------------------------
| setting up webpack build process for app
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: chefcooks, 2018
|----------------------------------------------
*/

const SriPlugin = require('webpack-subresource-integrity');
const Webpack = require('webpack');
const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const Optim = {
    runtimeChunk: 'single',
    splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                    const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                    return `npm.${packageName.replace('@', '')}`;
                },
            },
        },
    },
};

const Module = {
    rules: [
        {
            test: /\.jsx$/,
            exclude: /node_module/,
            use: {
                loader: 'babel-loader',
            },
        },
        {
            test: /\.handlebars$/,
            exclude: /node_module/,
            use: {
                loader: 'handlebars-loader',
            },
        },
    ],
};


module.exports = [

    {
        entry: {
            home: Path.resolve(__dirname, './src/components/home/home.controller.jsx'),
        },
        output: {
            path: Path.resolve(__dirname, './public'),
            filename: Path.join('./js/[name].[contenthash].js'),
            publicPath: '',
            crossOriginLoading: 'anonymous',
        },
        optimization: Optim,

        module: Module,

        plugins: [
            new HtmlWebpackPlugin({
                inject: true,
                hash: true,
                title: 'home page. know how we work',
                template: './src/index.handlebars',
                filename: Path.resolve(__dirname, './public/index.html'),
            }),
            new Webpack.HashedModuleIdsPlugin(),
            new SriPlugin({
                hashFuncNames: ['sha512', 'sha384'],
                enabled: true,
            }),
            new Webpack.NamedChunksPlugin(),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ['./public/js/'],
            }),
            new WebpackMd5Hash(),
        ],

    },

    {
        entry: {
            style: Path.resolve(__dirname, './src/scss/app.scss'),
        },
        output: {
            path: Path.resolve(__dirname, './public/css/'),
        },
        optimization: {
            minimizer: [
                new OptimizeCSSAssetsPlugin({}),
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'styles.css',
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                },
            ],
        },
    },
];
