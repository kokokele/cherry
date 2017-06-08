const walkmd = require('../src/walkmd');
const path = require("path");

const config = {
    root: path.resolve(__dirname,  './md'),
    ext: '.md',
    theme: __dirname

}

describe('test walkmd', () => {

    // it('should data is right', (done) => {
    //     walkmd(config, (data) => {
    //         console.log(data)
    //         expect(data.testCategory[0].page).toEqual('testPage');
    //         done();
    //     })
    // });

    it('测试__md__.json 数据是否正确', async () => {
        await walkmd(config);
        const __md__ = require('./tmp/__md__.json');
        expect(__md__.md.testCategory[0].page).toEqual('testPage');
    });

});
