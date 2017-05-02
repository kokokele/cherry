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

const parseWPConfig = (config, isProduction) => {
    let res = wpconfig(isProduction);
    if (config.setWebpackConfig) {
        res = config.setWebpackConfig(res);
    }
    return res;
};

const before = (config) => {

    // 如果是默认主题则使用theme_default
    if (config.theme == 'default' || !config.theme) {
        config.theme = path.resolve(__dirname, '../theme_default/');
    } else {
        config.theme = path.resolve(process.cwd(), config.theme);
    }
};

exports.build = config => {
    before(config);

    walkmd(config, () => {
        const site = path.resolve(process.cwd(), 'site');
        sh(`rm -rf ${site}`);
        
        const compiler = webpack(parseWPConfig(config, true));
            compiler.run((err, stats) => {
            // console.log(stats);
        });
    });
}

exports.dev = config => {
    before(config);

    walkmd(config, () => {
       
         // const server = new webdevServer(compiler, wpconfig.devServer);
        // server.listen(wpconfig.devServer.port, "localhost", ()=> {
        //     console.log('====start-dev-server====');
        // });

        // TODO
        // const db = require("./tmp/__md__");

        return;
        const server = require('./server');
        const wpConfig = parseWPConfig(config, false);
        server(config, wpConfig);
        // sh(`${node_modules}/.bin/webpack-dev-server --config ${wpconfigPath}`);
    });
}