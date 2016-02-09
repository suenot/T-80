'use strict';
var gulp = require('gulp');

gulp.task('watch', ['setWatch'], function() {
	gulp.watch('assets/**/**/**/*.jade', ['jade']);
	gulp.watch('assets/**/**/**/*.styl', ['styl']);
	gulp.watch('assets/**/**/**/*.sass', ['sass']);
	gulp.watch('assets/**/**/**/*.scss', ['sass']);
});