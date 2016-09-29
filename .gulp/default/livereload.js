'use strict';
let gulp = require('gulp');
let browserSync = require('browser-sync');

gulp.task('livereload', function () {
	return gulp.src(['public/*.html'])
	.pipe(browserSync.reload({stream: true}))
});