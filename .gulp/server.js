'use strict';
const gulp = require('gulp');
const connect = require('gulp-connect');
const gutil = require('gulp-util');
const serverOf = gutil.env.serverof;
let reloadBrowser = true;
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

if (gutil.env.liveof === true) {
	reloadBrowser = false;
};

let root;
if (isDevelopment) {
	root = ['public', 'assets'];
} else {
	root = 'public';
};

gulp.task('server', function() {
	if (!serverOf) {
		connect.server({
			root: root,
			livereload: reloadBrowser,
			port: 3000
		});
	}
});