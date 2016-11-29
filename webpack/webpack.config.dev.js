var config = require('./webpack.config.default.js'),
	path = require('path'),
	webpack = require('webpack'),
	project_path = path.join(__dirname, '../app');


config.devServer = {
	port: process.env.PORT || 3333,
	host: process.env.HOST || '0.0.0.0'
};

config.entry = [
	'react-hot-loader/patch',
	'webpack-hot-middleware/client',
	path.join(project_path, 'src', 'index.js')
];

config.plugins = config.plugins.concat([
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin(),
	new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') })
]);

config.module.loaders.unshift({
	test: /\.styl/,
	loaders: ['style',
		'css?sourceMap&modules&importLoaders=1&localIdentName=[local]',
		'postcss',
		'resolve-url',
		'stylus?sourceMap']
}, {
	test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
	loader: 'url',
	include: [
		path.join(project_path, 'src/assets/fonts/')
	],
	query: {
		name: 'fonts/[name].[ext]',
	}
});

config.devtool = 'source-map';

module.exports = config;
