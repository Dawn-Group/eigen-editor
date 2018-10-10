const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: "eval-source-map",
    entry: "./demo/index.js",
    output: {
        path: path.resolve(__dirname, "../demo/dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [ "babel-loader"]

            },
            {
                test: /\.css$/,
                use:["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "eigen editor"
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "../demo/dist"),
        open: true,
        host: "0.0.0.0",
        port: "8888",
        historyApiFallback: true
    }
}