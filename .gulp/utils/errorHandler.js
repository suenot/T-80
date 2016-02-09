// Error options
var gutil = require('gulp-util');

onError = function(err) {
	gutil.beep(),
	gutil.log(gutil.colors.red(err))
};