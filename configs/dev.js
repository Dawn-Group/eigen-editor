const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const alias = {
    // '@antv/g6$': '@antv/g6/src',
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
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].js"
    },
    watch: true,
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.[css|scss|less]$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"]

            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-hot-loader", { loader: MiniCssExtractPlugin.loader }, { loader: "css-loader", options: { modules: true, importLoaders: 1 } }, { loader: "less-loader", options: { javascriptEnabled: true } }]
            },
            {
                test: /\.css$/,
                use: ["css-hot-loader",{ loader: MiniCssExtractPlugin.loader }, "css-loader"]
            },
            {
                test: /\.scss$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, "css-hot-loader", { loader: "css-loader", options: { modules: true, importLoaders: 1 }}, {loader: "postcss-loader", options: {
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
    resolve: {
        alias
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