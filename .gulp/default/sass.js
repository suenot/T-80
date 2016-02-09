'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var autoprefixerOptions = require('../utils/config').autoprefixer;
var browserSync = require('browser-sync');

gulp.task('sass', function () {
	gulp.src([
		'assets/**/**/*.sass',
		'assets/**/**/*.scss',
		'!assets/**/**/_*.sass',
		'!assets/**/**/_*.scss'
	])
	.pipe(sass().on('error', sass.logError))
	.pipe(gulpif(gutil.env.prefix, postcss([autoprefixer(autoprefixerOptions)])))
	.pipe(gulp.dest('public'))
	.pipe(browserSync.reload({stream: true}))
});