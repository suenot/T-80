var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _webpackStream = require('webpack-stream');

var _webpackStream2 = _interopRequireDefault(_webpackStream);

var _gulpPlumber = require('gulp-plumber');

var _gulpPlumber2 = _interopRequireDefault(_gulpPlumber);

var _gulpPlumberErrorHandler = require('gulp-plumber-error-handler');

var _gulpPlumberErrorHandler2 = _interopRequireDefault(_gulpPlumberErrorHandler);

var _webpackStatsLogger = require('webpack-stats-logger');

var _webpackStatsLogger2 = _interopRequireDefault(_webpackStatsLogger);

var _webpackConfig = require('../../webpack.config.js');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env = process.env;
var NODE_ENV = _process$env.NODE_ENV;
var NOTIFY = _process$env.NOTIFY;

var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

function runWebpack() {
	var watch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	var webpackConfig = (0, _webpackConfig2.default)({
		watch: watch,
		debug: isDevelopment,
		sourcemaps: isDevelopment,
		notify: NOTIFY
	});

	return _gulp2.default.src('assets/js/app.webpack.js').pipe((0, _gulpPlumber2.default)({ errorHandler: (0, _gulpPlumberErrorHandler2.default)('Error in \'scripts\' task') })).pipe((0, _webpackStream2.default)(webpackConfig, null, _webpackStatsLogger2.default)).pipe(_gulp2.default.dest('public/js'));
}

_gulp2.default.task('webpack', function () {
	if (!isDevelopment) {
		return runWebpack(false);
	};
});
_gulp2.default.task('webpack:watch', function () {
	if (isDevelopment) {
		return runWebpack(true);
	};
});