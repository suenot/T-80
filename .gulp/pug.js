'use strict';
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const onError = require('./errorHandler').onError;
import {config} from '../package.json';
const isPug = config.template === 'pug';
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
const pug = require('gulp-pug');

let pugFiles;
if (isDevelopment) {
	pugFiles = ['assets/**/**/**/*.pug', '!assets/blocks/**/**/*.pug', '!assets/{_foot,_head,_layout}.pug'];
} else {
	pugFiles = ['assets/**/**/**/*.pug'];
};

gulp.task('pug', function() {
	if (isPug) {
		return gulp.src(pugFiles)
		.pipe(plumber({errorHandler: onError}))
		.pipe(pug({
			pretty: true,
			basedir: 'assets'
		}))
		.pipe(gulp.dest('public'))
	}
});