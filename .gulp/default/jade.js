'use strict';
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const jade = require('gulp-jade');
const onError = require('../utils/errorHandler').onError;
import {config} from '../../package.json';
const isJade = config.template === 'jade';

gulp.task('jade', function() {
	if (isJade) {
		return gulp.src(['assets/**/**/**/*.jade'])
		.pipe(plumber({errorHandler: onError}))
		.pipe(jade({
			pretty: true,
			basedir: 'assets'
		}))
		.pipe(gulp.dest('public'))
	}
});