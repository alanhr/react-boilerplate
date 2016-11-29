import React from 'react';
import { match } from 'react-router';
import { renderToString } from 'react-dom/server';
import { RouterContext } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import routes from '../app/src/routes';
import reducers from '../app/src/container/reducers';


export default function (app) {
	app.get('*', renderRoute);
}

function renderRoute(req, res, next) {
	match({ routes: routes, location: req.url }, (err, redirectLocation, renderProps) => {
		if (err) return next(err);

		if (redirectLocation) {
			return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		}

		if (!renderProps) {
			return next(new Error('Missing render props'));
		}

		const components = renderProps.components;

		// If the component being shown is our 404 component, then set appropriate status
		if (components.some((c) => c && c.displayName === 'error-404')) {
			res.status(404);
		}

		const Comp = components[components.length - 1].WrappedComponent;
		const fetchData = (Comp && Comp.fetchData) || (() => Promise.resolve());

		const initialState = {};
		const store = createStore(reducers, initialState, applyMiddleware(thunkMiddleware));
		const { location, params, history } = renderProps;

		fetchData({ store, location, params, history })
			.then(() => {
				const body = renderToString(
					<Provider store={store}>
						<RouterContext {...renderProps} />
					</Provider>
				);

				const state = store.getState();

				res.render('index', {
					app: body,
					initialState: JSON.stringify(state),
					isDevelopment: process.env.NODE_ENV !== 'production'
				});

			})
			.catch((err) => next(err))

	});
}
