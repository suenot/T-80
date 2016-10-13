'use strict';
const gulp = require('gulp');
const connect = require('gulp-connect');
const gutil = require('gulp-util');
const serverOf = gutil.env.serverof;
let reloadBrowser = true;

if (gutil.env.liveof === true) {
	reloadBrowser = false;
};

gulp.task('server', function() {
	if (!serverOf) {
		connect.server({
			root: 'public',
			livereload: reloadBrowser,
			port: 3000
		});
	}
});