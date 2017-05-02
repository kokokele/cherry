const path = require('path');
const webpack = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    entry: {
        index: [
            'babel-polyfill',
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?noInfo=false',
            path.resolve(__dirname, "./src/entry.index.js")
        ] 
    },
    output: {
        path: path.resolve(__dirname, "theme/static"),
        filename: "[name].js"
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css"],
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, "theme")
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["es2015", {"modules": false}],
                            // webpack understands the native import syntax, and uses it for tree shaking
                            "stage-0",
                            "react"
                            // Transpile React components to JavaScript
                        ],
                        plugins: [
                            "react-hot-loader/babel",
                            // Enables React code to work with HMR.
                            ["import", { "libraryName": "antd", "style": "css" }] // `style: true` 会加载 less 文件

                        ]
                    }
                }
            },
             {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.md$/,
                use: ['babel-loader', path.resolve(__dirname, 'src/lib/md-loader.js') ]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "less-loader" // compiles Less to CSS
                }]
            }
        ],
    },
    
    devtool: "source-map", 

    plugins: [
        new webpack.HotModuleReplacementPlugin()
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': '"production"',
        // })
    ]
}

module.exports = (isProduction = false) => {
    if (isProduction) {
        process.env.NODE_ENV = 'production';
        delete config.devtool;

        config.plugins = config.plugins.concat([
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                comments: false
            }),
            new copyWebpackPlugin([
                {from: path.resolve(__dirname, './theme/static'), to: path.resolve(process.cwd(), './site')}
            ])
        ]);
    } 

    return config;
};