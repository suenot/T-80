'use strict';
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var src = {};
var errorHandler = require('../utils/errorHandler');
var nunjucks = require('gulp-nunjucks-html');

gulp.task('nunjucks', function() {
	return gulp.src(['assets/**/**/**/*.html'])
	.pipe(plumber({errorHandler: onError}))
	.pipe(nunjucks({
		searchPaths: ['assets']
	}))
	.pipe(gulp.dest('public'))
	.pipe(browserSync.reload({stream: true}))
});