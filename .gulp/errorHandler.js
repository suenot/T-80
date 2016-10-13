// Error options
const gutil = require('gulp-util');

module.exports = {
	onError: function(err) {
		gutil.beep(),
		gutil.log(gutil.colors.red(err))
	}
}