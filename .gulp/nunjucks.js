'use strict';
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const connect = require('gulp-connect');
const onError = require('./errorHandler').onError;
const nunjucks = require('gulp-nunjucks-html');
import {config} from '../package.json';
const isHtml = config.template === 'html';

gulp.task('nunjucks', function() {
	if (isHtml) {
		return gulp.src(['assets/**/**/**/*.html'])
		.pipe(plumber({errorHandler: onError}))
		.pipe(nunjucks({
			searchPaths: ['assets']
		}))
		.pipe(gulp.dest('public'))
	}
});