import React from 'react';
import { shallow } from 'enzyme';

import Station from './Station';
let component;

const props = {};

describe('Station', () => {
	beforeAll(() => {
		component = shallow(<Station {...props} />);
	});

	it('should render correctly', () => {
		expect(component).toMatchSnapshot();
	});
});
