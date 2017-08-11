const path = require('path');
const webpack = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    entry: {
        index: [
            path.resolve(__dirname, "./lib/entry.index.js")
        ]
    },
    output: {
        path: path.resolve(__dirname, "www"),
        filename: "[name].js"
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css"],
    },

    module: {
        rules: [
            {
				test: /\.jsx?$/,
				loader: 'babel-loader',
				options: {
					presets: [['es2015',  {"modules": false}], 'stage-0', 'react'],
					plugins: [],
					ignore: /node_modules/,
					babelrc: false
				},
                // exclude: [
                //     path.resolve(process.cwd(), 'node_modules'),
                // ]
			},
            // {
            //     test: /\.jsx?$/,
            //     query: {
            //        plugins: [
            //          'react-hot-loader/babel'
            //        ]
            //    },
            //     exclude: [
            //         path.resolve(process.cwd(), 'node_modules'),
            //     ],
            //     use: {
            //         loader: 'babel-loader'
            //     }
            // },
             {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.md$/,
                use: ['babel-loader', path.resolve(__dirname, 'lib/md-loader.js') ]
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
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': '"production"',
        // })
    ]
}

module.exports = (cherryConfig, isProduction = false) => {
    if (isProduction) {
        process.env.NODE_ENV = 'production';
        delete config.devtool;

        config.plugins = config.plugins.concat([
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                comments: false
            })
        ]);
    } else {

        // 开发模式 是否支持hotreload
        if (cherryConfig.hotreload) {
            config.entry.index = [
                'babel-polyfill',
                'react-hot-loader/patch',
                'webpack-hot-middleware/client?noInfo=false',
                path.resolve(__dirname, "./lib/entry.index.js")
            ];

            config.plugins.push(new webpack.HotModuleReplacementPlugin());

            config.module.rules[0].options = {
                presets: [['es2015',  {"modules": false}], 'stage-0', 'react'],
                plugins: ['react-hot-loader/babel'],
                ignore: /node_modules/,
                babelrc: false
            }
        }
    }

    return config;
};
