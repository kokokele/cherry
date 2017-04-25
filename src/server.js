/**
 * @file devserver
 * @author auto
 */

const path = require('path');
const express = require('express');
const mockMiddleware = require('@nfe/mock-middleware');
const webpack = require('webpack');

const config = require('../webpack.config');


const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler, {
    reload: false
}));

app.use(express.static('../site'));

// 判断是否是远程接口
const isRemote =  process.env.SCENE === 'remote';

let mapConfig = {
    map: 'mock/local.js', // (必须是json格式的文件)指定一个map文件,用于映射接口与本地json的关系
    delay: 300
};

if (isRemote) {
    mapConfig = {
        map: 'mock/remote.js',
        delay: 0
    };
}

// app.use(mockMiddleware(mapConfig));s


app.get('*', function (req, res) {
    // res.sendFile(path.join(__dirname, 'dev/index.html'));
    res.send('404！！！');
});

const port = 9000;

app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log(`Listening at http://localhost:${port}`);
});
