'use strict';

var runSequence = require('run-sequence');
var gulp = require('gulp');

gulp.task('default', function(cb) {
	require('require-dir')('./.gulp/default', {recurse: true});
	runSequence(
		'del',
		'copy',
		[
			'sass',
			'styl',
			'jade',
			'nunjucks'
		],
		[
			'server',
			'watch'
		],
		cb
	);
});