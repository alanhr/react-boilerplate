//	@flow
import { Route, IndexRoute } from 'react-router';
import React from 'react';

import Layout from '../layouts/Layout';
import Home from '../views/home/Home';
import About from '../views/about/About';


export default (
	<Route path="/" component={Layout}>
		<IndexRoute component={Home} />
		<Route path="about" component={About} />
	</Route>
);
