'use strict';
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const onError = require('../utils/errorHandler').onError;
import {config} from '../../package.json';
const isPug = config.template === 'pug';
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
const pug = require('gulp-pug');
const pugInheritance = require('gulp-pug-inheritance');

gulp.task('pug', function() {
	if (isPug) {
		return gulp.src(['assets/**/**/**/*.pug'])
		.pipe(plumber({errorHandler: onError}))
		.pipe(pugInheritance({basedir: '/assets/'}))
		.pipe(pug({
			pretty: true,
			basedir: 'assets'
		}))
		.pipe(gulp.dest('public'))
	}
});