const path = require('path');
const webpack = require('webpack');

const config = {
    entry: {
        index: [
            'babel-polyfill',
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?noInfo=false',
            path.resolve(__dirname, "./src/web/index.js")
        ] 
    },
    output: {
        path: path.resolve(__dirname, "site"),
        filename: "[name].js"
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css"],
    },
    module: {

    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "src/web")
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

    devServer: {
        // proxy: { // proxy URLs to backend development server
        //     '/api': 'http://localhost:3000'
        // },
        host: "0.0.0.0",
        port: 9000,
        contentBase: path.join(__dirname, 'site'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: false, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
        publicPath: '/'
    // ...
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
    })
  ]

}

module.exports = config;