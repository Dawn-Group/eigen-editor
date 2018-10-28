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
        historyApiFallback: true,
        port: 8877,
        stats: "errors-only",
        logTime: true,
        logLevel: "error",
        proxy: {
            "/proxy/*": {
                target: 'https://alpha-bees.aidigger.com',
                pathRewrite: { '/proxy/*': '' },
                // secure: false,
                changeOrigin: true,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    // withCredentials: true,
                    cookie: 'code=598001; skey="YQA5S0nQGLaBA/Zg3EfuZiBgSBsz2MGc"; username="eWlueWk="',
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie"
                }
            },
           
            // headers: {
            //     host: 'alpha-labs.aidigger.com'
            // }
        }
    }
})

