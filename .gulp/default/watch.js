'use strict';
var gulp = require('gulp');

// gulp.task('watch', ['setWatch'], function() {
gulp.task('watch', function() {
	gulp.watch('assets/**/**/**/*.jade', ['jade']);
	gulp.watch('assets/**/**/**/*.html', ['nunjucks']);
	gulp.watch('assets/{css,blocks}/**/**/*.styl', ['styl']);
	gulp.watch('assets/{css,blocks}/**/**/*.{sass,scss}', ['sass']);
	gulp.watch(['assets/**/*.png', 'assets/**/*.jpg', 'assets/**/*.gif', 'assets/**/*.ico', 'assets/**/*.txt', 'assets/**/*.xml', 'assets/**/*.eot', 'assets/**/*.svg', 'assets/**/*.ttf', 'assets/**/*.woff', 'assets/**/*.woff2', 'assets/**/*.otf', 'assets/**/*.js', 'assets/**/*.css'], ['copy']);
});