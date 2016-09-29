'use strict';
let gulp = require('gulp');
let plumber = require('gulp-plumber');
let browserSync = require('browser-sync');
let reload = browserSync.reload;
let src = {};
// let jadeInheritance = require('gulp-jade-inheritance');
let jade = require('gulp-jade');
// let changed = require('gulp-changed');
// let cached = require('gulp-cached');
// let gulpif = require('gulp-if');
// let filter = require('gulp-filter');
let onError = require('../utils/errorHandler').onError;

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
});

// gulp.task('setWatch', function() {
// 	global.isWatching = true;
// });