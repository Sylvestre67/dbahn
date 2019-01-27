import React from 'react';
import { shallow } from 'enzyme';

import { Header } from './Header';
let component;

const props = {
	classes: {
		grow: '',
		img: '',
	},
};

describe('Header', () => {
	beforeAll(() => {
		component = shallow(<Header {...props} />);
	});

	it('should render correctly', () => {
		expect(component).toMatchSnapshot();
	});
});
