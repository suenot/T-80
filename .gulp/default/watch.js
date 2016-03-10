'use strict';
var gulp = require('gulp');

gulp.task('watch', ['setWatch'], function() {
	// gulp.watch('assets/**/**/**/*.jade', ['jade']);
	gulp.watch('assets/**/**/**/*.html', ['nunjucks']);
	gulp.watch('assets/{css,blocks}/**/**/*.styl', ['styl']);
	gulp.watch('assets/{css,blocks}/**/**/*.{sass,scss}', ['sass']);
});