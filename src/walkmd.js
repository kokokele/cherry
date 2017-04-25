const fs = require('fs');
const path = require('path');
const walk = require('walk');
const yamlFront = require('yaml-front-matter');
const sh = require('child_process').execSync;

const dist = __dirname + '/tmp';


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

            let out = `module.exports = [\n${outFile}]`
            
            fs.writeFileSync(dist + `/__${item.page}.js`, out);
        });
    }

    
}


module.exports = function walkMD(config, callback) {
    const mdData = {};

    const walker = walk.walk(config.root);
    walker.on('file', function (root, fileStats, next) {
        const name = fileStats.name;
        const ext = path.extname(name);
        const basename = path.basename(name, config.ext);

        const file = path.resolve('', root + '/' + name);
        // console.log(file);
        if (ext === config.ext) {
            const input = fs.readFileSync(file, 'utf-8');
            const yaml = yamlFront.loadFront(input, 'content');
            // console.log(yaml);
            const page = yaml.page;
            const rank  = yaml.rank;
            const category = yaml.category;

            if (!mdData[category]) mdData[category] = [];
            parseData(mdData[category], page, rank, file);
            // if (!mdData[title]) mdData[title] = {};
            // if (!mdData[title].files) mdData[title].files = [];
            // mdData[title].files[rank] = file;
        }

        next();
    });


    walker.on('end', () => {
        console.log(mdData);
        writeFiles(mdData);

        //将config 写入 文件
        const data = {
            md: mdData,
            config: config
        }
        fs.writeFileSync(dist + '/__md__.json', JSON.stringify(data));
        if (callback) callback(mdData);
    });

    walker.on('error', (e) => {
        console.log(e);
    });
}