var assert = require('assert');
var blocksBuilder = require('gulp-usemin/lib/blocksBuilder');
var File = require('vinyl');
var readmin = require('../');
var es = require('event-stream');
var fs = require('fs');
var path = require('path');

describe('gulp-readmin', function() {
    var filePath = __dirname + '/files/sample.html';
    var vinylFile = new File({
        contents: fs.readFileSync(filePath),
        path: filePath
    });

    it('emits one CSS files', function(done) {

        var reader = readmin({type: 'css'});

        reader.write(vinylFile);
        reader.end();

        reader.pipe(es.writeArray(function (err, files) {
            assert.equal(files.length, 1);
            assert.equal(path.basename(files[0].path), 'b.css');
            done(err);
        }));
    });

    it('emits two JS files', function(done) {

        var reader = readmin({type: 'js'});

        reader.write(vinylFile);
        reader.end();

        reader.pipe(es.writeArray(function (err, files) {
            assert.equal(files.length, 2);
            assert.equal(path.basename(files[0].path), 'b.js');
            assert.equal(path.basename(files[1].path), 'c.js');
            done(err);
        }));
    });

});