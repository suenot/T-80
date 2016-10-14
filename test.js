import gulp from 'gulp';
import webpackStream from 'webpack-stream';
import plumber from 'gulp-plumber';
import errorHandler from 'gulp-plumber-error-handler';
import statsLogger from 'webpack-stats-logger';
import makeWebpackConfig from '../../webpack.config.js';

const { NODE_ENV, NOTIFY } = process.env;
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

function runWebpack(watch = false) {
	const webpackConfig = makeWebpackConfig({
		watch,
		debug: isDevelopment,
		sourcemaps: isDevelopment,
		notify: NOTIFY
	});

	return gulp
		.src('assets/js/app.webpack.js')
		.pipe(plumber({errorHandler: errorHandler(`Error in 'scripts' task`)}))
		.pipe(webpackStream(webpackConfig, null, statsLogger))
		.pipe(gulp.dest('public/js'));
}

gulp.task('webpack', () => {
	if (!isDevelopment) {
		return runWebpack(false);
	};
});
gulp.task('webpack:watch', () => {
	if (isDevelopment) {
		return runWebpack(true);
	};
});