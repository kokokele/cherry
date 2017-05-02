const mockMiddleware = require('@nfe/mock-middleware');

const map = require('./mock/map');

// console.log('map:', map);

const mock = mockMiddleware({
    'map': 'mock/map.js'
})

//===============================
const fs = require('fs');//文件模块
const logger = require('morgan'); // 将日志写入文件
var accessLogStream = fs.createWriteStream(__dirname+'/access.log',{flags:'a'});//创建一个写入流


module.exports = {
    root: './src',
    ext: '.md',
    category: [
        "utils", "Comp"
    ],
    theme: './theme_default',
    server: {
        port: 9001,
        middleware: [mock, logger('combined',{stream:accessLogStream})]
    },

    setWebpackConfig(config, isProduction) {
       return config; 
    }
}