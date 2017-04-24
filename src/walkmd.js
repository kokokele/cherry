const fs = require('fs');
const path = require('path');
const walk = require('walk');
const yamlFront = require('yaml-front-matter')


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
            const title = yaml.title;
            const rank  = yaml.rank;

            if (!mdData[title]) mdData[title] = {};
            if (!mdData[title].files) mdData[title].files = [];
            mdData[title].files[rank] = file;
        }

        next();
    });


    walker.on('end', () => {
        console.log(mdData);
        fs.writeFileSync(__dirname + '/__md__.json', JSON.stringify(mdData));
        if (callback) callback(mdData);
    });

    walker.on('error', (e) => {
        console.log(e);
    });
}