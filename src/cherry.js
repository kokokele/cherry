/**
 * @file start commander, entry file
 * @author zhangpeng53
 */

const wpconfig = require('../webpack.config');
const webpack = require('webpack');
const walkmd = require('./walkmd');
const sh = require('child_process').execSync;
const path = require('path');
const fs = require('fs');

const node_modules = path.resolve(__dirname, '../node_modules');
const wpconfigPath = path.resolve(__dirname, '../webpack.config.js');


function copyFile(src, dist) {
  fs.writeFileSync(dist, fs.readFileSync(src));
}

const parseWPConfig = (config, isProduction) => {
    let res = wpconfig(isProduction);
    if (config.setWebpackConfig) {
        res = config.setWebpackConfig(res);
    }
    return res;
};

const before = (config) => {

    let src = path.resolve(process.cwd(), config.theme);
    let dist = path.resolve(__dirname, '../theme');

    // 如果是默认主题则使用theme_default
    if (config.theme == 'default' || !config.theme) {
        src = path.resolve(__dirname, '../theme_default');
    }
    sh(`rm -rf ${dist}`);
    sh(`cp -R ${src} ${dist}`);
    config.theme = dist;
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