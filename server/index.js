import 'babel-core/register';
import 'babel-polyfill';
import webpack from 'webpack';
import express from 'express';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import opener from 'opener';
import path from 'path';

import config from '../webpack/webpack.config.dev';
import renderRouter from './renderRouter';


const host = config.devServer.host,
	port = config.devServer.port,
	app = express(),
	isDevelopment = process.env.NODE_ENV !== 'production',
	isProduction = process.env.NODE_ENV === 'production';


app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');
app.use(express.static(config.output.path));


if (isDevelopment) {
	let compiler = webpack(config);
	app.use(WebpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath,
		stats: {
			hash: false,
			version: false,
			timings: false,
			assets: false,
			chunks: false,
			modules: false,
			reasons: false,
			children: false,
			source: false,
			errors: true,
			errorDetails: true,
			warnings: true,
			publicPath: false,
			colors: true // color is life
		}
	}));
	app.use(WebpackHotMiddleware(compiler));
}

if (isProduction) {
	app.set('views', path.join(config.output.path));
}

app.get('/favicon.ico', function (req, res) {
	res.sendStatus(200);
});

renderRouter(app);

app.listen(port, host, (err) => {
	if (err) {
		console.log(err);
	}
	console.log(`Listening at ${host}:${port}`);
	opener(`http://${host}:${port}`);
});
