const merge = require('webpack-merge')
const baseConfigs = require('./base')
const path = require('path');

module.exports = merge(baseConfigs, {
    mode: "production",
    entry: "./src/index.js",
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        publicPath: "/dist/",
        libraryTarget: "umd",
        library: 'EigenEditor',
        filename: "index.js"
    },
    externals: {
        'react': 'react',
        'react-dom': 'react-dom',
        'draft-js': 'draft-js',
        'eigen-utils': 'eigen-utils',
        'draftjs-utils': 'draftjs-utils',
        'immutable': 'immutable',
        'antd':'antd'
    },
    performance: {
        hints: false
    },
    optimization: {
        minimize: false,
    }
})