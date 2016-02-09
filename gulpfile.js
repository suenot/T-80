'use strict';

var runSequence = require('run-sequence');
var gulp = require('gulp');

gulp.task('default', function(cb) {
	require('require-dir')('./.gulp/default', {recurse: true});
	runSequence(
		[
			'sass',
			'styl',
			'jade'
		],
		[
			'server',
			'watch'
		],
		cb
	);
});