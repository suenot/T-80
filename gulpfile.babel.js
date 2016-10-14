'use strict';

const runSequence = require('run-sequence');
const gulp = require('gulp');
require('require-dir')('./.gulp', {recurse: true});
gulp.task('default', function(cb) {
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