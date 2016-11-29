const webpack = require('webpack'),
	path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
	FlowStatusWebpackPlugin = require('flow-status-webpack-plugin'),
	autoprefixer = require('autoprefixer'),
	mqpacker = require("css-mqpacker"),
	project_path = path.join(__dirname, '../app'),
	dist_path = path.join(__dirname, '../public');

const config = {
	entry: [
		path.join(project_path, 'src', 'index.js')
	],
	output: {
		path: dist_path,
		filename: 'js/[name].js',
		publicPath: '/'
	},
	resolve: {
		root: project_path,
		alias: {
			images: 'src/assets/images'
		}
	},
	plugins: [
		new CleanWebpackPlugin(['public'], { root: path.resolve(__dirname, '..'), verbose: true }),
		new webpack.optimize.OccurenceOrderPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '../views/index.ejs'),
			inject: 'body',
			filename: 'index.ejs'
		}),
		new webpack.optimize.DedupePlugin(),
		new FlowStatusWebpackPlugin({
			restartFlow: false,
			failOnError: true
		})
	],
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loaders: ['eslint'],
				// define an exclude so we check just the files we need
				exclude: [/(node_modules)/, /\*spec.js/]
			}
		],
		loaders: [
			{
				test: /\.js$/,
				exclude: [
					/(node_modules)/, /\*spec.js/
				],
				loaders: ['babel']
			}, {
				test: /\.css$/,
				loaders: ['style-loader', 'css?sourceMap&modules&importLoaders=1&localIdentName=[local]', 'resolve-url']
			}, {
				//IMAGE LOADER
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'file',
				exclude: [
					path.join(project_path, 'src/assets/fonts/')
				],
				query: {
					name: 'images/[name].[ext]'
				}
			}, {
				// HTML LOADER
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				// HTML LOADER
				test: /\.ejs$/,
				loader: 'html-loader'
			}
		]
	},
	postcss: [autoprefixer({ browsers: ['last 2 versions'] }), mqpacker()],
};

module.exports = config;
