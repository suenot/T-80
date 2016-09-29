let gulp = require('gulp');
let rimraf = require('gulp-rimraf');
let isProduction = process.env.NODE_ENV == 'production';
let gutil = require('gulp-util');

gulp.task('del', function() {
	if (gutil.env.del || isProduction) {
		return gulp.src(['public/*', '!public/CNAME', '!public/.git'], { read: false })
		.pipe(rimraf({ force: true }))
	}
});