'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = makeWebpackConfig;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var stylish = require('eslint/lib/formatters/stylish');
var notifier = require('node-notifier');
var webpack = require('webpack');
var NpmInstallPlugin = require('npm-install-webpack-plugin');

var eslintFormatter = function eslintFormatter(_ref) {
	var notify = _ref.notify;
	return function (errors) {
		if (errors[0].messages) {
			console.log(stylish(errors));
			if (notify) {
				var error = errors[0].messages.find(function (msg) {
					return msg.severity === 2;
				});
				if (error) {
					notifier.notify({
						title: error.message,
						message: error.line + ':' + error.column + ' ' + error.source.trim(),
						icon: path.join(__dirname, 'tasks/images/error-icon.png')
					});
				}
			}
		}
	};
};

function makeWebpackConfig(_ref2) {
	var _ref2$watch = _ref2.watch;
	var watch = _ref2$watch === undefined ? true : _ref2$watch;
	var _ref2$sourcemaps = _ref2.sourcemaps;
	var sourcemaps = _ref2$sourcemaps === undefined ? false : _ref2$sourcemaps;
	var _ref2$debug = _ref2.debug;
	var debug = _ref2$debug === undefined ? false : _ref2$debug;
	var _ref2$notify = _ref2.notify;
	var notify = _ref2$notify === undefined ? false : _ref2$notify;
	var _ref2$eslint = _ref2.eslint;
	var eslint = _ref2$eslint === undefined ? false : _ref2$eslint;

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
			}, eslint && {
				test: /\.js$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
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
		eslint: {
			configFile: path.join(__dirname, '.eslintrc'),
			emitErrors: false,
			emitWarning: true,
			formatter: eslintFormatter({ notify: notify })
		}
	};
}

