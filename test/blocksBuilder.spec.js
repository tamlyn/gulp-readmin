var assert = require('assert');
var blocksBuilder = require('gulp-usemin/lib/blocksBuilder');
var File = require('vinyl');
var fs = require('fs');

/*
 * We're using this essentially private function from `gulp-usemin` so best to check it behaves as expected
 */

describe('blocksBuilder', function() {
    var path = __dirname + '/files/sample.html';
    var html = new File({
        contents: fs.readFileSync(path),
        path: path
    });

    var blocks = blocksBuilder(html, {type: 'js'});

    it('recognises five blocks', function() {
        assert.equal(blocks.length, 5);
    });

    it('extracts one CSS file', function() {
        assert.equal(blocks[1].type, 'css', 'Wrong type');
        assert.equal(blocks[1].files.length, 1);
    });

    it('extracts two JS files', function() {
        assert.equal(blocks[3].type, 'js', 'Wrong type');
        assert.equal(blocks[3].files.length, 2);
    });
});