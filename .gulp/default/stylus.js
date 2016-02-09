'use strict';
var gulp = require('gulp');
var newer = require('gulp-newer');
var plumber = require('gulp-plumber');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var errorHandler = require('../utils/errorHandler');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var src = {};
var browsers ={};
var changed = require('gulp-changed');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var autoprefixerOptions = require('../utils/config').autoprefixer;

src.styl = {
	'files': [
		'assets/**/**/**/*.styl',
		'!assets/**/**/**/_*.styl'
	],
	'dest': 'public'
};

gulp.task('styl', function() {
	return gulp.src(src.styl.files)
	// .pipe(changed(src.styl.dest, {extension: '.css'}))
	.pipe(plumber({errorHandler: onError}))
	.pipe(stylus())
	.pipe(gulpif(gutil.env.prefix, postcss([autoprefixer(autoprefixerOptions)])))
	.pipe(gulp.dest(src.styl.dest))
	.pipe(browserSync.reload({stream: true}))
});