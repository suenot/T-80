'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync');
var newer = require('gulp-newer');

gulp.task('copy', function() {
	return gulp.src(['assets/**/*.png', 'assets/**/*.jpg', 'assets/**/*.gif', 'assets/**/*.ico', 'assets/**/*.txt', 'assets/**/*.xml', 'assets/**/*.eot', 'assets/**/*.svg', 'assets/**/*.ttf', 'assets/**/*.woff', 'assets/**/*.woff2', 'assets/**/*.otf', 'assets/**/*.js', 'assets/**/*.css'])
	.pipe(newer('public'))
	.pipe(gulp.dest('public'))
	.pipe(browserSync.reload({stream: true}));
});