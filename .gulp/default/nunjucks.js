'use strict';
let gulp = require('gulp');
let plumber = require('gulp-plumber');
let browserSync = require('browser-sync');
let src = {};
let onError = require('../utils/errorHandler').onError;
let nunjucks = require('gulp-nunjucks-html');

gulp.task('nunjucks', function() {
	return gulp.src(['assets/**/**/**/*.html'])
	.pipe(plumber({errorHandler: onError}))
	.pipe(nunjucks({
		searchPaths: ['assets']
	}))
	.pipe(gulp.dest('public'))
});