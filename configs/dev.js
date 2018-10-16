const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const alias = {
    '@src': path.resolve(__dirname, '..', 'src'),
    '@lib': path.resolve(__dirname, '..', 'src/Dlib'),
    '@const': path.resolve(__dirname, '..', 'src/const'),
    '@renders': path.resolve(__dirname, '..', 'src/renders'),
    '@features': path.resolve(__dirname, '..', 'src/features'),
    '@tool-bar': path.resolve(__dirname, '..', 'src/tool-bar'),
    '@utils': path.resolve(__dirname, '..', 'src/utils'),
};

module.exports = {
    mode: "development",
    devtool: "eval-source-map",
    entry: "./demo/index.js",
    output: {
        path: path.resolve(__dirname, "../demo/dist"),
        filename: "[name].js"
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"]

            },
            {
                test: /\.less$/,
                use: [
                    "style-loader", 
                    { loader: "css-loader" }, 
                    { loader: "less-loader", options: { javascriptEnabled: true } }
                ]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                use: [ 
                    "style-loader",
                     {loader: "css-loader", options: { 
                         modules: true, 
                         importLoaders: 1 
                        }}, 
                     {loader: "postcss-loader", options: {
                            sourceMap: true
                        }
                     }, 
                     {loader: "sass-loader", options: {
                        sourceMap: true
                    }}
                ]
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
    resolve: {
        alias
    },
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
}