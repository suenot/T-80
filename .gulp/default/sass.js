'use strict';
let gulp = require('gulp');
let sass = require('gulp-sass');
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let gutil = require('gulp-util');
let gulpif = require('gulp-if');
let autoprefixerOptions = require('../utils/config').autoprefixer;
let browserSync = require('browser-sync');
let sourcemaps = require('gulp-sourcemaps');
let isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
let prefix = gutil.env.prefix || process.env.NODE_ENV == 'production';

gulp.task('sass', function () {
	gulp.src([
		'assets/{css,blocks}/**/**/*.{sass,scss}',
		'!assets/{css,blocks}/**/**/_*.{sass,scss}'
	])
	.pipe(gulpif(isDevelopment, sourcemaps.init()))
	// TODO: переделать на plumber
	.pipe(sass().on('error', sass.logError))
	.pipe(gulpif(prefix, postcss([autoprefixer(autoprefixerOptions), require('postcss-flexibility')])))
	.pipe(gulpif(isDevelopment, sourcemaps.write()))
	.pipe(gulp.dest('public'))
	.pipe(browserSync.reload({stream: true}))
});