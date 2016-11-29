import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import homeReducer from './homeReducer';

const allReducers = combineReducers({
	homeReducer,
	routing: routerReducer,
});

export default allReducers;
