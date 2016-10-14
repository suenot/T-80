'use strict';
var runSequence = require('run-sequence');
var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var newer = require('gulp-newer');
var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
var rimraf = require('gulp-rimraf');
var isProduction = process.env.NODE_ENV == 'production';
var plumber = require('gulp-plumber');
var nunjucks = require('gulp-nunjucks-html');
var config = require('./package.json').config;
var isHtml = config.template === 'html';
var isPug = config.template === 'pug';
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var prefix = gutil.env.prefix || process.env.NODE_ENV == 'production';
var serverOf = gutil.env.serverof;
var sftp = require('gulp-sftp');
var isWebpack = config.webpack === 'true';
var isRucksack = config.rucksack === 'true';
var rucksack;
if (isRucksack) {
	var rucksack = require('rucksack-css');
}
var onError = function(err) {
	gutil.beep(),
	gutil.log(gutil.colors.red(err))
};

// Default
gulp.task('default', function(cb) {
	runSequence(
		'del',
		'copy',
		[
			'sass',
			'pug',
			'webpack',
			'nunjucks'
		],
		[
			'server',
			'watch'
		],
		cb
	);
});

// Copy
gulp.task('copy', function() {
	if (!isDevelopment) {
		return gulp.src(['assets/**/*.png', 'assets/**/*.jpg', 'assets/**/*.gif', 'assets/**/*.ico', 'assets/**/*.txt', 'assets/**/*.xml', 'assets/**/*.eot', 'assets/**/*.svg', 'assets/**/*.ttf', 'assets/**/*.woff', 'assets/**/*.woff2', 'assets/**/*.otf', 'assets/**/*.js', 'assets/**/*.css', '!assets/js/*.webpack.js'])
		.pipe(newer('public'))
		.pipe(gulp.dest('public'))
		.pipe(connect.reload());
	};
});

// Del
gulp.task('del', function() {
	if (gutil.env.del || isProduction) {
		return gulp.src(['public/*', '!public/CNAME', '!public/.git'], { read: false })
		.pipe(rimraf({ force: true }))
	}
});

// Livereload
gulp.task('livereload', function () {
	return gulp.src(['public/*.html'])
	.pipe(connect.reload());
});

// Nunjucks
gulp.task('nunjucks', function() {
	if (isHtml) {
		return gulp.src(['assets/**/**/**/*.html'])
		.pipe(plumber({errorHandler: onError}))
		.pipe(nunjucks({
			searchPaths: ['assets']
		}))
		.pipe(gulp.dest('public'))
	}
});

// Pug
var pugFiles;
if (isDevelopment) {
	pugFiles = ['assets/**/**/**/*.pug', '!assets/blocks/**/**/*.pug', '!assets/{_foot,_head,_layout}.pug'];
} else {
	pugFiles = ['assets/**/**/**/*.pug'];
};
gulp.task('pug', function() {
	if (isPug) {
		return gulp.src(pugFiles)
		.pipe(plumber({errorHandler: onError}))
		.pipe(pug({
			pretty: true,
			basedir: 'assets'
		}))
		.pipe(gulp.dest('public'))
	}
});

// Sass
var sassFiles;
if (isDevelopment) {
	sassFiles = 'assets/{css,vendor}/**/**/**/*.{sass,scss}';
} else {
	sassFiles = 'assets/{css,blocks,vendor}/**/**/**/*.{sass,scss}';
};
gulp.task('sass', function () {
	gulp.src(sassFiles)
	.pipe(plumber({errorHandler: onError}))
	.pipe(gulpif(isDevelopment, sourcemaps.init()))
	.pipe(sass().on('error', sass.logError))
	.pipe(gulpif(isRucksack, postcss([rucksack])))
	.pipe(gulpif(prefix, postcss([autoprefixer(config.autoprefixerOptions), require('postcss-flexibility')])))
	.pipe(gulpif(isDevelopment, sourcemaps.write()))
	.pipe(gulp.dest('public'))
	.pipe(connect.reload());
});

// Server
var reloadBrowser = true;
if (gutil.env.liveof === true) {
	reloadBrowser = false;
};
var root;
if (isDevelopment) {
	root = ['public', 'assets'];
} else {
	root = 'public';
};
gulp.task('server', function() {
	if (!serverOf) {
		connect.server({
			root: root,
			livereload: reloadBrowser,
			port: 3000
		});
	}
});

// Sftp
var server = {
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

// watch
gulp.task('watch', function() {
	if (!serverOf) {
		if (isPug) {
			gulp.watch('assets/**/**/**/*.pug', ['pug']);
		} else {
			gulp.watch('assets/**/**/**/*.html', ['nunjucks']);
		};
		gulp.watch(['public/**/*.html', '!public/**/_*.html', '!public/blocks/**/*.html'], ['livereload']);
		gulp.watch('assets/{css,blocks,vendor}/**/**/**/**/*.{sass,scss}', ['sass']);
		gulp.watch('assets/{css,blocks,vendor}/**/**/**/**/*.css', ['livereload']);
		gulp.watch(['assets/**/*.png', 'assets/**/*.jpg', 'assets/**/*.gif', 'assets/**/*.ico', 'assets/**/*.txt', 'assets/**/*.xml', 'assets/**/*.eot', 'assets/**/*.svg', 'assets/**/*.ttf', 'assets/**/*.woff', 'assets/**/*.woff2', 'assets/**/*.otf', 'assets/**/*.js', 'assets/**/*.css'], ['copy']);
		if (isDevelopment && isWebpack) {
			gulp.start('webpack:watch');
			gulp.watch('public/js/app.min.js', ['livereload']);
		}
	}
});

// Webpack
if (isWebpack) {
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	var webpackStream = require('webpack-stream');
	var errorHandler = require('gulp-plumber-error-handler');
	var statsLogger = require('webpack-stats-logger');
	var allWebpackConfig = require('./webpack.config.js');
	var makeWebpackConfig = _interopRequireDefault(allWebpackConfig);
	var _process$env = process.env;
	var NODE_ENV = _process$env.NODE_ENV;
	var NOTIFY = _process$env.NOTIFY;
	function runWebpack(watch) {
		// var webpackConfig = makeWebpackConfig({
		// 	watch,
		// 	debug: isDevelopment,
		// 	sourcemaps: isDevelopment,
		// 	notify: NOTIFY
		// });
		var webpackConfig = (0, makeWebpackConfig.default)({
			watch: watch,
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
	gulp.task('webpack:watch', () => {
		if (isDevelopment) {
			return runWebpack(true);
		};
	});
};
gulp.task('webpack', () => {
	if (isWebpack) {
		if (!isDevelopment) {
			return runWebpack(false);
		};
	};
});
