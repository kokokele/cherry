/**
 * 
 */
const fs = require('fs');
const sh = require('child_process').execSync;
const path = require('path');


module.exports = (config) => {

    const dist = config.theme + '/tmp';
    const nav = config.nav;

    if (!nav || !nav.length) {
        fs.writeFileSync(dist + `/__nav__.js`, 'module.exports=[];');
        return;
    }
    
    let out = '';

    nav.forEach(item => {
        let str = '{\n';
        if (/^https?.*/.test(item.uri)) {
            str += `http: "${item.uri}",\n`;
        } else {

            let mds = '';
            const list = item.uri.split('|');
            list.forEach( p => {
                const des = path.resolve(process.cwd(), p);
                mds += `require("${des}"),\n`
            });

            str += `md: [${mds}],\n`;
        }
        str += `label: "${item.label}",\n`;
        str += `uri: "${item.uri}"\n`;

        str += '}';

        out += str + ',\n';
    });

    out = `module.exports = [${out}];`;
    fs.writeFileSync(dist + `/__nav__.js`, out);

}