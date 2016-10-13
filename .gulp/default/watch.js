'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const serverOf = gutil.env.serverof;
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
import {config} from '../../package.json';
const isPug = config.template === 'pug';
const isWebpack = config.webpack === 'true';

console.log(config.webpack);
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
