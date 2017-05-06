const fs = require('fs');
const path = require('path');
const walk = require('walk');
const sh = require('child_process').execSync;
const chalk = require('chalk');
const babel = require('babel-core');


module.exports = (entry, out) => {

    const p = new Promise((resolve, reject) => {
        const walker = walk.walk(entry);

        walker.on('file', function (root, fileStats, next) {
            const name = fileStats.name;
            const ext = path.extname(name);
            const file = path.resolve('', root + '/' + name);

            if (ext === '.js') {
                const res = babel.transformFileSync('./src/entry.index.js');
                fs.writeFileSync(path.resolve(out, name), res.code);
            }
            
            next();
        });

        walker.on('end', () => {
            console.log(chalk.green('babel-执行完毕！！！'));
            resolve();
        });

        walker.on('error', (e) => {
            console.log(e);
            reject(e);
        });
    });

    return p;
    
}