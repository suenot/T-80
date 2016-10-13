'use strict';
const gulp = require('gulp');
const browserSync = require('browser-sync');
const connect = require('gulp-connect');

gulp.task('livereload', function () {
	return gulp.src(['public/*.html'])
	.pipe(connect.reload());
});