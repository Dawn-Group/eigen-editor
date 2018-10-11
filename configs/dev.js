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
    watch: false,
    watchOptions: {},
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"]

            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(ttf|eot|woff)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'font/[hash:16].[ext]'
                    }
                }],
                exclude: [
                    path.resolve(__dirname, './node_modules')
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'img/[hash:16].[ext]'
                    }
                }]
            }
        ]
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         title: "eigen editor"
    //     })
    // ],
    devServer: {
        contentBase: path.resolve(__dirname, "../demo/dist"),
        open: true,
        port: "8888",
        historyApiFallback: true
    }
}