var config = require('./webpack.config.default.js'),
	path = require('path'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	extractCSS = new ExtractTextPlugin('css/[name].[chunkhash].css', { allChunks: true }),
	project_path = path.join(__dirname, '../app'),
	webpack = require('webpack');

config.plugins = config.plugins.concat([
	extractCSS,
	new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
	new webpack.optimize.UglifyJsPlugin({
		compressor: {
			warnings: false
		}
	})
]);

config.output.filename = 'js/[name].[hash].js';

config.module.loaders.unshift({
	test: /\.styl/,
	loader: extractCSS.extract('style-loader', ['css?sourceMap&modules&importLoaders=1&localIdentName=[local]', 'postcss', 'resolve-url', 'stylus?sourceMap'])
}, {
	test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
	loader: 'file',
	include: [
		path.join(project_path, 'src/assets/fonts/')
	],
	query: {
		name: 'fonts/[name].[ext]',
	}
});

module.exports = config;
