import React from 'react';
import { shallow } from 'enzyme';

import Search from './Search';
let component;

const props = {};

describe('Search', () => {
	beforeAll(() => {
		component = shallow(<Search {...props} />);
	});

	it('should render correctly', () => {
		expect(component).toMatchSnapshot();
	});
});
