const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { GenerateSW } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
    //const materialize = require('materialize-css');

module.exports = merge(common, {
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    /*devServer: {
        port: 1234,
        contentBase: path.join(__dirname, 'dist'),
        writeToDisk: true
    },*/
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
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
            //filename: "index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new GenerateSW(),

        new MiniCssExtractPlugin(),
        //new BundleAnalyzerPlugin()

        /* new webpack.ProvidePlugin({
             $: 'jquery',
             jQuery: 'jquery'
         })*/
    ]
});