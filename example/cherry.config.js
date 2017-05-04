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
    title: 'NRC文档',
    root: './src',
    ext: '.md',
    category: [
        "utils", "Comp"
    ],

    nav: [
        {
            label: '糯米', uri: 'http://nuomi.com'
        },
        {
            label: '更新记录', uri: './nav/update.md|./nav/update2.md'
        }
    ],

    // theme: './theme_default',
    server: {
        port: 9001,
        middleware: [logger('combined',{stream:accessLogStream})]
    },

    setWebpackConfig(config, isProduction) {
       return config; 
    }
}