'use strict';
let gulp = require('gulp');
let browserSync = require('browser-sync');
let reload = browserSync.reload;
let gutil = require('gulp-util');
let serverOf = gutil.env.serverof;
let serverOpen = false;
let reloadBrowser = false;

if (gutil.env.open === true) {
	serverOpen = true;
};

if (gutil.env.liveof === true) {
	reloadBrowser = false;
} else {
	reloadBrowser = true;
};

gulp.task('server', function() {
	if (!serverOf) {
		browserSync({
			server: {
				baseDir: 'public'
			},
			notify: false,
			scrollProportionally: false,
			ghostMode: {
				clicks: false,
				forms: false,
				scroll: false
			},
			open: serverOpen,
			codeSync: reloadBrowser
		});
	}
});