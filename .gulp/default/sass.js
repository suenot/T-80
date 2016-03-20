'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var autoprefixerOptions = require('../utils/config').autoprefixer;
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
var prefix = gutil.env.prefix || process.env.NODE_ENV == 'production';

gulp.task('sass', function () {
	gulp.src([
		'assets/{css,blocks}/**/**/*.{sass,scss}',
		'!assets/{css,blocks}/**/**/_*.{sass,scss}'
	])
	.pipe(gulpif(isDevelopment, sourcemaps.init()))
	.pipe(sass().on('error', sass.logError))
	.pipe(gulpif(prefix, postcss([autoprefixer(autoprefixerOptions)])))
	.pipe(gulpif(isDevelopment, sourcemaps.write()))
	.pipe(gulp.dest('public'))
	.pipe(browserSync.reload({stream: true}))
});