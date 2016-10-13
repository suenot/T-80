'use strict';
const gulp = require('gulp');
const sftp = require('gulp-sftp');

const server = {
	host: '185.5.250.59',
	user: 'frontend',
	remotePath: '/home/frontend/sites/de-core.net'
}

gulp.task('sftp', function () {
	return gulp.src('public/**/*')
	.pipe(sftp({
		host: server.host,
		user: server.user,
		remotePath: server.remotePath
	}));
});

gulp.task('sftp-default', ['default'], function () {
	return gulp.src('public/**/*')
	.pipe(sftp({
		host: server.host,
		user: server.user,
		remotePath: server.remotePath
	}));
});