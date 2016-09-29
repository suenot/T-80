'use strict';
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: __dirname + '/assets',

	entry: {
		app: './app',
	},

	output: {
		path: __dirname + '/public',
		// publicPath: '/',
		filename: '[name].js'
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
