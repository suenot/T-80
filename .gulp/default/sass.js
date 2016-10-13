'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const gutil = require('gulp-util');
const gulpif = require('gulp-if');
const autoprefixerOptions = require('../utils/config').autoprefixer;
const connect = require('gulp-connect');
const sourcemaps = require('gulp-sourcemaps');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
const prefix = gutil.env.prefix || process.env.NODE_ENV == 'production';
const rucksack = require('rucksack-css');
const plumber = require('gulp-plumber');
const onError = require('../utils/errorHandler').onError;

gulp.task('sass', function () {
	gulp.src([
		'assets/{css,blocks}/**/**/*.{sass,scss}',
		'!assets/{css,blocks}/**/**/_*.{sass,scss}'
	])
	.pipe(plumber({errorHandler: onError}))
	.pipe(gulpif(isDevelopment, sourcemaps.init()))
	.pipe(sass().on('error', sass.logError))
	.pipe(postcss([rucksack]))
	.pipe(gulpif(prefix, postcss([autoprefixer(autoprefixerOptions), require('postcss-flexibility')])))
	.pipe(gulpif(isDevelopment, sourcemaps.write()))
	.pipe(gulp.dest('public'))
	.pipe(connect.reload());
});