import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import allReducers from '../reducers';

export default function configureStore(initialState) {

	const middleware = applyMiddleware(thunk);
	return createStore(allReducers, initialState, middleware);
}
