// import path from 'path';
// import stylish from 'eslint/lib/formatters/stylish';
// import notifier from 'node-notifier';
// import webpack from 'webpack';
// import NpmInstallPlugin from 'npm-install-webpack-plugin';
// import HappyPack from 'happypack';

// const eslintFormatter = ({notify}) => errors => {
// 	if (errors[0].messages) {
// 		console.log(stylish(errors));
// 		if (notify) {
// 			const error = errors[0].messages.find(msg => msg.severity === 2);
// 			if (error) {
// 				notifier.notify({
// 					title: error.message,
// 					message: `${error.line}:${error.column} ${error.source.trim()}`,
// 					icon: path.join(__dirname, 'tasks/images/error-icon.png')
// 				});
// 			}
// 		}
// 	}
// };

// export default function makeWebpackConfig({
// 	watch = true,
// 	sourcemaps = false,
// 	debug = false,
// 	notify = false,
// 	eslint = true
// }) {
// 	return {
// 		// entry: path.resolve('/assets/js/app.js'),
// 		entry: '/assets/js/app.js',
// 		// entry: path.resolve('./assets/js/app.js'),
// 		// entry: {
// 		// 	app: __dirname + '/assets/js/',
// 		// },
// 		watch,
// 		debug,
// 		bail: false,
// 		profile: true,
// 		// output: path.resolve('./public/js/'),
// 		output: '/public/js/',
// 		// output: {
// 		// 	path: path.resolve('./public/js/'),
// 		// 	// path: __dirname + '/',
// 		// 	// publicPath: '/public/js',
// 		// 	// filename: 'app.min.js'
// 		// 	// pathinfo: false
// 		// },
// 		devtool: (sourcemaps || !debug) ? '#source-map' : 'eval',
// 		resolve: {
// 			modulesDirectories: [
// 				'node_modules'
// 			],
// 			extensions: ['.js', ''],
// 			alias: {
// 				'jquery': path.join(__dirname, 'node_modules/jquery/dist/jquery')
// 			}
// 		},
// 		module: {
// 			preLoaders: [{
// 				test: /\.js$/,
// 				loader: 'source-map-loader'
// 			}],
// 			loaders: [{
// 				test: /\.js$/,
// 				loader: 'happypack/loader',
// 				exclude: /node_modules/
// 			}, {
// 				test: /\.json$/,
// 				loader: 'json'
// 			}, eslint && {
// 				test: /\.js$/,
// 				loader: 'eslint-loader',
// 				exclude: /node_modules/
// 			}, {
// 				test: require.resolve('jquery'),
// 				loader: 'expose?$!expose?jQuery'
// 			}].filter(loader => loader)
// 		},
// 		plugins: [
// 			new HappyPack({
// 				loaders: ['babel'],
// 				threads: 4,
// 				verbose: false,
// 				cache: true
// 			}),
// 			new webpack.DefinePlugin({
// 				'process.env': {
// 					NODE_ENV: JSON.stringify(process.env.NODE_ENV)
// 				}
// 			}),
// 			new webpack.ProvidePlugin({
// 				jQuery: 'jquery',
// 				$: 'jquery',
// 				'window.jQuery': 'jquery'
// 			})

// 		].concat(debug ? [
// 			new NpmInstallPlugin({saveDev: true}),
// 			new webpack.HotModuleReplacementPlugin()
// 		] : [
// 			new webpack.optimize.DedupePlugin(),
// 			new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}, output: {comments: false}})
// 		]),
// 		eslint: {
// 			configFile: path.join(__dirname, '.eslintrc'),
// 			emitErrors: false,
// 			emitWarning: true,
// 			formatter: eslintFormatter({notify})
// 		}
// 	};
// }


'use strict';
// import path from 'path';
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: __dirname + '/assets/',

	entry: {
		app: './js/app',
	},
	output: {
		path: __dirname + './public',
		publicPath: '/',
		filename: '[name].min.js'
	},

	module: {
		loaders: [{
			test: /\.js$/,
			include: __dirname + '/assets',
			loader: 'babel?presets[]=es2015'
		}, {
			test: /\.jade$/,
			loader: 'jade'
		}, {
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.sass$/,
			loader: 'style!css!sass?indentedSyntax'
		}, {
			test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
			// test:   /\.(ttf|eot|woff|woff2)$/,
			loader: 'file?name=[path][name].[ext]?[hash]'
		}, {
			test: /\.(jpe?g|png|gif|svg)$/i,
			loaders: [
				'file?hash=sha512&digest=hex&name=[hash].[ext]',
				'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
			]
		}]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'windows.jQuery': 'jquery'
		}),
	],
	resolve: {
		alias: {
			jquery: __dirname + '/js/vendor/jquery-2.1.0.js'
		}
	},
	devServer: {
		contentBase: __dirname,
		hot: true
	}
};
