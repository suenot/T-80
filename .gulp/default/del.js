const gulp = require('gulp');
const rimraf = require('gulp-rimraf');
const isProduction = process.env.NODE_ENV == 'production';
const gutil = require('gulp-util');

gulp.task('del', function() {
	if (gutil.env.del || isProduction) {
		return gulp.src(['public/*', '!public/CNAME', '!public/.git'], { read: false })
		.pipe(rimraf({ force: true }))
	}
});