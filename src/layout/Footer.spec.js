import React from 'react';
import { shallow } from 'enzyme';

import { Footer } from './Footer';

let component;

const props = {
	classes: {
		grow: '',
	},
};

describe('Footer', () => {
	beforeAll(() => {
		component = shallow(<Footer {...props} />);
	});

	it('should render correctly', () => {
		expect(component).toMatchSnapshot();
	});
});
