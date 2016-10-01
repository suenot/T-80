'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const serverOf = gutil.env.serverof;
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

// gulp.task('watch', ['setWatch'], function() {
gulp.task('watch', function() {
	if (!serverOf) {
		gulp.watch('assets/**/**/**/*.jade', ['jade']);
		gulp.watch('assets/**/**/**/*.html', ['nunjucks']);
		gulp.watch(['public/**/*.html', '!public/**/_*.html', '!public/blocks/**/*.html'], ['livereload']);
		gulp.watch('assets/{css,blocks,vendor}/**/**/**/**/*.styl', ['styl']);
		gulp.watch('assets/{css,blocks,vendor}/**/**/**/**/*.{sass,scss}', ['sass']);
		gulp.watch('assets/{css,blocks,vendor}/**/**/**/**/*.css', ['livereload']);
		gulp.watch(['assets/**/*.png', 'assets/**/*.jpg', 'assets/**/*.gif', 'assets/**/*.ico', 'assets/**/*.txt', 'assets/**/*.xml', 'assets/**/*.eot', 'assets/**/*.svg', 'assets/**/*.ttf', 'assets/**/*.woff', 'assets/**/*.woff2', 'assets/**/*.otf', 'assets/**/*.js', 'assets/**/*.css'], ['copy']);
		if (isDevelopment) {
			gulp.start('webpack:watch');
		}
	}
});
