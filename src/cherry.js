/**
 * @file start commander, entry file
 * @author zhangpeng53
 */
const wpconfig = require('../webpack.config');
const webpack = require('webpack');
const walkmd = require('./walkmd');
const sh = require('child_process').execSync;
const path = require('path');

const node_modules = path.resolve(__dirname, '../node_modules');
const wpconfigPath = path.resolve(__dirname, '../webpack.config.js');

const server = require('./server');

module.exports = config => {
    walkmd(config, () => {
        // const compiler = webpack(wpconfig);
        // const server = new webdevServer(compiler, wpconfig.devServer);
        // server.listen(wpconfig.devServer.port, "localhost", ()=> {
        //     console.log('====start-dev-server====');
        // });

        const db = require("./tmp/__md__");
        
        server(config);

        // sh(`${node_modules}/.bin/webpack-dev-server --config ${wpconfigPath}`);
    });
}