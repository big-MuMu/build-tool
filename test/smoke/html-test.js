const glob = require('glob-all');

describe('check generated html files', () => {
    it('should generated html files', (done) => {
        const files = glob.sync([
            './dist/index.html',
            './dist/search.html'
        ]);
        if (files.length > 0) {
            done();
        } else {
            throw new Error('no htmls files generated');
        }
    });
});
