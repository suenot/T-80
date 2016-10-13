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
			'pug',
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