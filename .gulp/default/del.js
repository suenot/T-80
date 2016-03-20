var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var isProduction = process.env.NODE_ENV == 'production';
var gutil = require('gulp-util');

gulp.task('del', function() {
	if (gutil.env.del || isProduction) {
		return gulp.src(['public/*', '!public/CNAME', '!public/.git'], { read: false })
		.pipe(rimraf({ force: true }))
	}
});