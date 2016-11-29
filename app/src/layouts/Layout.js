import React, { PropTypes } from 'react';


const Layout = props => (
	<div>
		{props.children}
	</div>
);

Layout.propTypes = {
	children: PropTypes.node,
};


export default Layout;
