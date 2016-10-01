'use strict';
let gulp = require('gulp');
let browserSync = require('browser-sync');
let newer = require('gulp-newer');

gulp.task('copy', function() {
	return gulp.src(['assets/**/*.png', 'assets/**/*.jpg', 'assets/**/*.gif', 'assets/**/*.ico', 'assets/**/*.txt', 'assets/**/*.xml', 'assets/**/*.eot', 'assets/**/*.svg', 'assets/**/*.ttf', 'assets/**/*.woff', 'assets/**/*.woff2', 'assets/**/*.otf', 'assets/**/*.js', 'assets/**/*.css', '!assets/js/*.webpack.js'])
	.pipe(newer('public'))
	.pipe(gulp.dest('public'))
	.pipe(browserSync.reload({stream: true}));
});