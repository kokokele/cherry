/**
 * @file 遍历所有md文件，生成data文件。
 * @author zhangpeng53
 */
const fs = require('fs');
const path = require('path');
const walk = require('walk');
const yamlFront = require('yaml-front-matter');
const sh = require('child_process').execSync;
const chalk = require('chalk');


module.exports = function walkMD(config) {

    return new Promise((resolve, reject) => {
        const dist = config.theme + '/tmp';
        const mdData = {};
        const source = {};

        function parseData(arr, category, page, rank, file) {
            const key = category + "_" + page;

            let have = !!arr.length;

            have = arr.some(item => {
                if (item.key === key) {
                    item.files[rank] = file;
                    return true;
                }

                return false;
            });
            
            if (!have) {
                arr.push(
                    {
                        page,
                        key,
                        files: [file]
                    }
                )
            }
        }

        function writeFiles(data) {
            for(var k in data) {
                const category = data[k];
                category.forEach(item => {
                    const key = item.key;
                    let outFile = '';
                    item.files.forEach(f => {
                        outFile += `require('${f}'),\n`;
                    })

                    source[key] = `./tmp/__${key}`;

                    const out = `module.exports = [\n${outFile}]`;
                    fs.writeFileSync(dist + `/__${key}.js`, out);
                });
            }
        }

        const walker = walk.walk(config.root);
        walker.on('file', function (root, fileStats, next) {
            const name = fileStats.name;
            const ext = path.extname(name);
            const basename = path.basename(name, config.ext);

            const file = path.resolve('', root + '/' + name);
            if (ext === config.ext) {
                const input = fs.readFileSync(file, 'utf-8');
                const yaml = yamlFront.loadFront(input, 'content');
                // console.log(yaml);
                const page = yaml.page;
                const rank  = yaml.rank;
                let category = yaml.category;

                if (!category) category = '__default__';
                
                if (category !== '__nav__') {
                    if (!mdData[category]) mdData[category] = [];
                    parseData(mdData[category], category, page, rank, file);
                }
            }
            next();
        });

        walker.on('end', () => {
            console.log(chalk.green('=========解析markdown========='));
            console.log(chalk.green(JSON.stringify(mdData, null, 4)));
            console.log(chalk.green('=========end========='));

            writeFiles(mdData);

            //将config 写入 文件
            const data = {
                md: mdData,
                config: config,
                source: source,
                root: process.cwd()
            }
            fs.writeFileSync(dist + '/__md__.json', JSON.stringify(data, null, 4));

            resolve();
        });

        walker.on('error', (e) => {
            console.log(e);
            reject(e);
        });
    });
}