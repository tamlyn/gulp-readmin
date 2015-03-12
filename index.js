/**
 *
 * @param options
 * @return {*}
 */
module.exports = function (options) {
	var through = require('through2');
	var gutil = require('gulp-util');
	var blocksBuilder = require('gulp-usemin/lib/blocksBuilder');

	return through.obj(function (file, enc, callback) {
		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-readmin', 'Streams are not supported!'));
			callback();
		}
		else if (file.isNull())
			callback(null, file); // Do nothing if no contents
		else {
			try {
				var blocks = blocksBuilder(file, options);
				var pushToStream = this.push.bind(this);
				blocks.forEach(function(block) {
					if (block.files && (!options.type || options.type == block.type)) {
						block.files.forEach(pushToStream);
					}
				});
			} catch (e) {
				this.emit('error', e);
			}
			callback();
		}
	});
};
