import 'babel-polyfill';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from './routes';
import configureStore from './container/store';
import './assets/stylus/main.styl';


const appDOM = document.getElementById('app'),
	Store = configureStore(),
	history = syncHistoryWithStore(browserHistory, Store);

const loadRender = () => {
	const NextApp = require('./routes').default;

	ReactDOM.render(
		<AppContainer>
			<Provider store={Store}>
				<Router history={history}>
					{routes}
				</Router>
			</Provider>
		</AppContainer>,
		appDOM
	);
};

if (module.hot) {
	module.hot.accept('./routes', () => {
		loadRender();
	});
}
loadRender();
