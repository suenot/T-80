'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = makeWebpackConfig;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var notifier = require('node-notifier');
var webpack = require('webpack');
var NpmInstallPlugin = require('npm-install-webpack-plugin');

function makeWebpackConfig(_ref2) {
	var _ref2$watch = _ref2.watch;
	var watch = _ref2$watch === undefined ? true : _ref2$watch;
	var _ref2$sourcemaps = _ref2.sourcemaps;
	var sourcemaps = _ref2$sourcemaps === undefined ? false : _ref2$sourcemaps;
	var _ref2$debug = _ref2.debug;
	var debug = _ref2$debug === undefined ? false : _ref2$debug;
	var _ref2$notify = _ref2.notify;
	var notify = _ref2$notify === undefined ? false : _ref2$notify;

	return {
		watch: watch,
		debug: debug,
		bail: false,
		profile: true,
		output: {
			filename: 'app.min.js',
			pathinfo: false
		},
		devtool: sourcemaps || !debug ? '#source-map' : 'eval',
		resolve: {
			modulesDirectories: ['node_modules'],
			extensions: ['.js', ''],
			alias: {
				jquery: __dirname + "/assets/vendor/jquery-2.2.4.js"
			}
		},
		module: {
			preLoaders: [{
				test: /\.js$/,
				loader: 'source-map-loader'
			}],
			loaders: [{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/
			}, {
				test: /\.json$/,
				loader: 'json'
			}, {
				test: require.resolve('jquery'),
				loader: 'expose?$!expose?jQuery'
			}].filter(function (loader) {
				return loader;
			})
		},
		plugins: [new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: (0, _stringify2.default)(process.env.NODE_ENV)
			}
		})].concat(debug ? [new NpmInstallPlugin({ saveDev: true }), new webpack.HotModuleReplacementPlugin()] : [new webpack.optimize.DedupePlugin(), new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, output: { comments: false } })]),
	};
}

