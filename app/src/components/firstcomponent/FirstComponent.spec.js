import React from 'react';
import { mount, render, shallow } from 'enzyme';
import FirstComponent from './FirstComponent';
import style from './FirstComponent.styl';

describe('<FirstComponent />', () => {
	it('should render one exampleParagraph', () => {
		const wrapper = mount(<FirstComponent />);
		expect(wrapper.find('p')).to.have.className(style.exampleParagraph);
	});
});
