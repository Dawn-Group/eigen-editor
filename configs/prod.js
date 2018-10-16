const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const externals = {
    react: {
        root: 'React',
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
    },
    'react-dom': {
        root: 'ReactDOM',
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom',
    },
    'prop-types': {
        root: 'PropTypes',
        commonjs: 'prop-types',
        commonjs2: 'prop-types',
        amd: 'prop-types',
    },
};

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
    mode: "production",
    entry: "./src/index.js",
    devtool: "eval-source-map",
    target: "web",
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        chunkFilename: 'chunck/[name][id].chunk.js',
        libraryTarget: 'umd',
        publicPath: "/dist/",
        library: 'EigenEditor',
        umdNamedDefine: true,
        filename: "index.js"
    },
    externals,
    performance: { 
        hints: false 
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.[css|scss|less]$/,
                    chunks: 'all',
                    enforce: true
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
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
                use: ["style-loader", 
                { loader: "css-loader", options: { 
                    modules: true, 
                    importLoaders: 1 
                    } 
                }, 
                { loader: "less-loader", options: { 
                        javascriptEnabled: true     
                   } 
                }]
            },
            {
                test: /\.css$/,
                use: [{ loader: "style-loader" }, 
                        "css-loader"
                    ]
            },
            {
                test: /\.scss$/,
                use: [{ loader: "style-loader" },
                     { loader: "css-loader", options: { 
                         modules: true, importLoaders: 1 
                        }
                    }, 
                     { loader: "postcss-loader", options: {
                        sourceMap: true
                        }
                    },
                     {loader: "sass-loader", options: {
                        sourceMap: true
                    }}]
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
    resolve: {
        alias
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: "./README.md"
        }])
    ]
}