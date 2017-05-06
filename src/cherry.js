/**
 * @file start commander, entry file
 * @author zhangpeng53
 */

"use strict";

require("babel-core/register");
require('babel-polyfill');

const wpconfig = require('../webpack.config');
const webpack = require('webpack');
const walkmd = require('./walkmd');
const sh = require('child_process').execSync;
const path = require('path');
const fs = require('fs');
const parseNav = require('./parseNav');
const babelFiles = require('./babelFiles');

const node_modules = path.resolve(__dirname, '../node_modules');
const wpconfigPath = path.resolve(__dirname, '../webpack.config.js');


function parseWPConfig(config, isProduction) {
    let res = wpconfig(isProduction);
    if (config.setWebpackConfig) {
        res = config.setWebpackConfig(res);
    }
    return res;
}

function before(config) {

    let src;
    let dist = path.resolve(__dirname, '../theme');

    // 拷贝主题
    // 如果是默认主题则使用theme_default
    if (!config.theme || config.theme == 'default') {
        src = path.resolve(__dirname, '../theme_default');
    } else {
        src = path.resolve(process.cwd(), config.theme);
    }
    sh(`rm -rf ${dist}`);
    sh(`cp -R ${src} ${dist}`);
    config.theme = dist;

    //拷贝静态资源
    const www = path.resolve(__dirname, '../www');
    sh(`rm -rf ${www}`);
    sh(`mv ${path.join(dist, './static')} ${www}`);

    //创建临时文件夹
    const tmp  = config.theme + '/tmp';
    if (fs.existsSync(tmp)) sh(`rm -rf ${tmp}`);
    fs.mkdirSync(tmp);

    // 处理导航数据
    parseNav(config);
};


exports.dev = async config => {
    before(config);

    await walkmd(config);
    await babelFiles(config.theme, config.theme);

    const server = require('./server');
    const wpConfig = parseWPConfig(config, false);
    server(config, wpConfig);
}

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
