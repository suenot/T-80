'use strict';
const gulp = require('gulp');
const connect = require('gulp-connect');
const newer = require('gulp-newer');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('copy', function() {
	if (!isDevelopment) {
		return gulp.src(['assets/**/*.png', 'assets/**/*.jpg', 'assets/**/*.gif', 'assets/**/*.ico', 'assets/**/*.txt', 'assets/**/*.xml', 'assets/**/*.eot', 'assets/**/*.svg', 'assets/**/*.ttf', 'assets/**/*.woff', 'assets/**/*.woff2', 'assets/**/*.otf', 'assets/**/*.js', 'assets/**/*.css', '!assets/js/*.webpack.js'])
		.pipe(newer('public'))
		.pipe(gulp.dest('public'))
		.pipe(connect.reload());
	};
});