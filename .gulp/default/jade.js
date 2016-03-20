'use strict';
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var src = {};
// var jadeInheritance = require('gulp-jade-inheritance');
var jade = require('gulp-jade');
// var changed = require('gulp-changed');
// var cached = require('gulp-cached');
// var gulpif = require('gulp-if');
// var filter = require('gulp-filter');
var errorHandler = require('../utils/errorHandler');

gulp.task('jade', function() {
	return gulp.src(['assets/**/**/**/*.jade'])
	.pipe(plumber({errorHandler: onError}))
	// .pipe(changed('public', {extension: '.html'}))
	// .pipe(gulpif(global.isWatching, cached('jade')))
	// .pipe(jadeInheritance({basedir: 'assets'}))
	// .pipe(filter(function (file) {
	// 	return !/\/_/.test(file.path) && !/^_/.test(file.relative);
	// }))
	.pipe(jade({
		pretty: true,
		basedir: 'assets'
	}))
	.pipe(gulp.dest('public'))
	.pipe(browserSync.reload({stream: true}))
});

// gulp.task('setWatch', function() {
// 	global.isWatching = true;
// });