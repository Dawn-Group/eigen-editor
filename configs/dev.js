const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    watchOptions: {},
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"]

            },
            {
                test: /\.css$/,
                use: ["css-hot-loader",{ loader: MiniCssExtractPlugin.loader }, "css-loader"]
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-hot-loader", { loader: "css-loader", options: { modules: true, importLoaders: 1 }}, {loader: "postcss-loader", options: {
                    sourceMap: true
                }}, {loader: "sass-loader", options: {
                    sourceMap: true
                }}]
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        publicPath: path.resolve(__dirname, "../demo/dist/assets"),
                        mimetype: 'application/font-woff',
                        name: '[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "eigen editor"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "../demo/dist"),
        open: true,
        port: "8888",
        historyApiFallback: true
    }
}