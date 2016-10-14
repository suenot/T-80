'use strict';

var runSequence = require('run-sequence');
var gulp = require('gulp');
var gutil = require('gulp-util');

var onError = function(err) {
	gutil.beep(),
	gutil.log(gutil.colors.red(err))
};

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


var connect = require('gulp-connect');
var newer = require('gulp-newer');
var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('copy', function() {
	if (!isDevelopment) {
		return gulp.src(['assets/**/*.png', 'assets/**/*.jpg', 'assets/**/*.gif', 'assets/**/*.ico', 'assets/**/*.txt', 'assets/**/*.xml', 'assets/**/*.eot', 'assets/**/*.svg', 'assets/**/*.ttf', 'assets/**/*.woff', 'assets/**/*.woff2', 'assets/**/*.otf', 'assets/**/*.js', 'assets/**/*.css', '!assets/js/*.webpack.js'])
		.pipe(newer('public'))
		.pipe(gulp.dest('public'))
		.pipe(connect.reload());
	};
});

var rimraf = require('gulp-rimraf');
var isProduction = process.env.NODE_ENV == 'production';

gulp.task('del', function() {
	if (gutil.env.del || isProduction) {
		return gulp.src(['public/*', '!public/CNAME', '!public/.git'], { read: false })
		.pipe(rimraf({ force: true }))
	}
});

var browserSync = require('browser-sync');

gulp.task('livereload', function () {
	return gulp.src(['public/*.html'])
	.pipe(connect.reload());
});


var plumber = require('gulp-plumber');
var nunjucks = require('gulp-nunjucks-html');
var config = require('./package.json');
var isHtml = config.template === 'html';

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



var isPug = config.template === 'pug';
var pug = require('gulp-pug');

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



var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var prefix = gutil.env.prefix || process.env.NODE_ENV == 'production';
var rucksack = require('rucksack-css');

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
	.pipe(postcss([rucksack]))
	.pipe(gulpif(prefix, postcss([autoprefixer(config.autoprefixerOptions), require('postcss-flexibility')])))
	.pipe(gulpif(isDevelopment, sourcemaps.write()))
	.pipe(gulp.dest('public'))
	.pipe(connect.reload());
});


var serverOf = gutil.env.serverof;
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


var sftp = require('gulp-sftp');

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



var isWebpack = config.webpack === 'true';

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

var webpackStream = require('webpack-stream');
var errorHandler = require('gulp-plumber-error-handler');
var statsLogger = require('webpack-stats-logger');
var makeWebpackConfig = require('./webpack.config.js');
// var { NODE_ENV, NOTIFY } = process.env;

function runWebpack(watch) {
	var webpackConfig = makeWebpackConfig({
		watch,
		debug: isDevelopment,
		sourcemaps: isDevelopment,
		// notify: NOTIFY
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
