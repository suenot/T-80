'use strict';
let gulp = require('gulp');
let newer = require('gulp-newer');
let plumber = require('gulp-plumber');
let stylus = require('gulp-stylus');
let browserSync = require('browser-sync');
let reload = browserSync.reload;
let onError = require('../utils/errorHandler').onError;
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let src = {};
let browsers ={};
let changed = require('gulp-changed');
let gutil = require('gulp-util');
let gulpif = require('gulp-if');
let autoprefixerOptions = require('../utils/config').autoprefixer;
let sourcemaps = require('gulp-sourcemaps');
let isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
let prefix = gutil.env.prefix || process.env.NODE_ENV == 'production';

src.styl = {
	'files': [
		'assets/{css,blocks}/**/**/*.styl',
		'!assets/{css,blocks}/**/**/_*.styl'
	],
	'dest': 'public'
};

gulp.task('styl', function() {
	return gulp.src(src.styl.files)
	// .pipe(changed(src.styl.dest, {extension: '.css'}))
	.pipe(gulpif(isDevelopment, sourcemaps.init()))
	.pipe(plumber({errorHandler: onError}))
	.pipe(stylus())
	.pipe(gulpif(prefix, postcss([autoprefixer(autoprefixerOptions), require('postcss-flexibility')])))
	.pipe(gulpif(isDevelopment, sourcemaps.write()))
	.pipe(gulp.dest(src.styl.dest))
	.pipe(browserSync.reload({stream: true}))
});