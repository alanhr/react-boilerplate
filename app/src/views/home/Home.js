import React, { PropTypes } from 'react';
import { connect } from 'react-redux';


const Home = props => <div>
	{props.title}
</div>;

Home.propTypes = {
	title: PropTypes.string,
};

export default connect(state => state.homeReducer)(Home);
