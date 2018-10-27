const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const baseConfigs = require('./base')
module.exports = merge(baseConfigs,{
    mode: "development",
    devtool: "eval-source-map",
    entry: "./demo/index.js",
    output: {
        path: path.resolve(__dirname, "../demo/index"),
        filename: "[name].js"
    },
    watch: true,
    plugins: [
        new HtmlWebpackPlugin({
            title: "eigen editor"
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "../demo/dist"),
        open: true,
        port: "8888",
        historyApiFallback: true
    }
})

