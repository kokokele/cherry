/**
 * @file devserver
 * @author zhangpeng53
 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('../webpack.config');

module.exports = (cherryConfig) => {

    const sc = cherryConfig.server;

    const app = express();

    const compiler = webpack(config);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler, {
        reload: false
    }));

    app.use(express.static(path.resolve(__dirname, '../site') ) );

    //add middleware
    if (sc.middleware && sc.middleware.length) {
        sc.middleware.forEach(item => {
            app.use(item);
        });
    }
    
    app.get('*', function (req, res) {
        // res.sendFile(path.join(__dirname, 'dev/index.html'));
        res.send('404！！！');
    });

    
    const port = sc.port || 9000;
    app.listen(port, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Listening at http://localhost:${port}`);
    });
}
