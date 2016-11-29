import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import allReducers from '../reducers';

const middleware = applyMiddleware(thunk, logger(), reduxImmutableStateInvariant());

export default function configureStore(initialState) {

	const store = createStore(allReducers, initialState, compose(
		middleware,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	));

	if (module.hot) {
		module.hot.accept('../reducers', () =>
			store.replaceReducer(require('../reducers').default)
		);
	}

	return store;
}
