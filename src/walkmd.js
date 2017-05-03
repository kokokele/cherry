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


module.exports = function walkMD(config, callback) {
    
    const dist = config.theme + '/tmp';
    const mdData = {};
    const source = {};

    function parseData(arr, page, rank, file) {
        if (!arr.length) {
            const files = [];
            files[rank] = file;
            arr.push({
                'page': page,
                'files': files
            })
            return;
        }

        arr.every(item => {
            if (item.page == page) {
            item.files[rank] = file;
            return false;
            }
            return true;
        });
    }

    function writeFiles(data) {

        if (fs.existsSync(dist)) sh(`rm -rf ${dist}`);
        fs.mkdirSync(dist);

        for(var k in data) {
            const category = data[k];
            category.forEach(item => {
                let outFile = '';
                item.files.forEach(f => {
                    outFile += `require('${f}'),\n`
                })

                source[item.page] = `./tmp/__${item.page}`;

                const out = `module.exports = [\n${outFile}]`;
                fs.writeFileSync(dist + `/__${item.page}.js`, out);
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
            
            if (!mdData[category]) mdData[category] = [];
            parseData(mdData[category], page, rank, file);
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
        if (callback) callback(mdData);
    });

    walker.on('error', (e) => {
        console.log(e);
    });
}