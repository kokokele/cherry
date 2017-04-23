const fs = require('fs');
const path = require('path');
const walk = require('walk');
const config  = require('./config');
// const md = require('./lib/marked');
const yamlFront = require('yaml-front-matter')


const test = require('./test.md');

console.log(test);


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
        const results = yamlFront.loadFront(input, 'content');
        // console.log(results);

        mdData[basename] = results;

        // const res = md(results.content);
        // console.log(res);
    }

    next();
});


walker.on('end', () => {

    // console.log('end');
    console.log(mdData);
});

walker.on('error', (e) => {
    console.log(e);
})