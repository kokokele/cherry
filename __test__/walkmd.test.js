const walkmd = require('../src/walkmd');
const path = require("path");

const config = {
    root: path.resolve(__dirname,  './md'),
    ext: '.md'
}

describe('test walkmd', () => {
    
    it('should data is right', (done) => {
        walkmd(config, (data) => {
            expect(data.testCategory[0].page).toEqual('testPage');
            done();
        })
    });
    
   
});
