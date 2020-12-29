const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { GenerateSW } = require('workbox-webpack-plugin');

//const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = merge(common, {
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main[contenthash].js',
        libraryTarget: 'var',
        library: 'Client'
    },
    mode: 'production',
    module: {
        rules: [{
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({ filename: 'main.[contenthash].css' }),
        new GenerateSW()

        //new WorkboxPlugin.GenerateSW(),
    ],
});