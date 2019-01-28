import React from 'react';
import { shallow } from 'enzyme';

import StationHeader from './StationHeader';
let component;

const props = {
	classes: { root: 'testing' },
};

describe('StationHeader', () => {
	beforeAll(() => {
		component = shallow(<StationHeader {...props} />);
	});

	it('should render correctly', () => {
		expect(component).toMatchSnapshot();
	});
});
