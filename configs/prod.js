const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const reactExternal = {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
};


const antdExternal = {
    root: 'antd',
    commonjs2: 'antd',
    commonjs: 'antd',
    amd: 'antd'
};

module.exports = {
    mode: "production",
    entry: "./index.js",
    devtool: "eval-source-map",
    output: {
        path: path.resolve(__dirname, "../dist"),
        chunkFilename: '[name][id].chunk.js',
        libraryTarget: 'umd',
        library: 'EigenEditor',
        filename: "index.js"
    },
    // externals: {
    //     'react': reactExternal,
    //     'antd': antdExternal
    // },
    performance: { 
        hints: false 
    },
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
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"]

            },
            {
                test: /\.css$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"]
            },
            {
                test: /\.scss$/,
                use: ["style-loader", { loader: "css-loader", options: { modules: true, importLoaders: 1 } }, {
                    loader: "postcss-loader", options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true
                    }
                    }]
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        publicPath: path.resolve(__dirname, "../dist/assets"),
                        mimetype: 'application/font-woff',
                        name: '[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.optimize.AggressiveMergingPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name][id].css"
        })
    ]
}