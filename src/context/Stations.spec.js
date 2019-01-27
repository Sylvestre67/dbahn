import React from 'react';
import { shallow } from 'enzyme';

import Stations from './Stations';
let component;

const props = {};

describe('Stations', () => {
	beforeAll(() => {
		component = shallow(<Stations {...props} />);
	});

	it('should render correctly', () => {
		expect(component).toMatchSnapshot();
	});
});
