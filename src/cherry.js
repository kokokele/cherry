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

exports.build = config => {
    walkmd(config, () => {
        const site = path.resolve(process.cwd(), 'site');
        sh(`rm -rf ${site}`);
        
        const compiler = webpack(wpconfig(true));
        compiler.run((err, stats) => {
            // console.log(stats);
        });
    });
}

exports.dev = config => {
    walkmd(config, () => {
       
         // const server = new webdevServer(compiler, wpconfig.devServer);
        // server.listen(wpconfig.devServer.port, "localhost", ()=> {
        //     console.log('====start-dev-server====');
        // });

        const db = require("./tmp/__md__");
        server(config);

        // sh(`${node_modules}/.bin/webpack-dev-server --config ${wpconfigPath}`);
    });
}