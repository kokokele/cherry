const bf = require('./babelFiles');
const sh = require('child_process').execSync;

sh(`rm -rf dist`)
sh(`cp -R ./src ./dist`);

// bf('../dist', '../dist').then(() => {
//         console.log('-========');
//     });

async function babel() {
    await bf('../dist', '../dist');
    console.log('我结束了');
}

babel();