'use strict';

let runSequence = require('run-sequence');
let gulp = require('gulp');

gulp.task('default', function(cb) {
	require('require-dir')('./.gulp/default', {recurse: true});
	runSequence(
		'del',
		'copy',
		[
			'sass',
			'jade',
			'webpack',
			'nunjucks'
		],
		[
			'server',
			'watch'
		],
		cb
	);
});