import React from 'react';
import { shallow } from 'enzyme';

import TimeTableViz from './TimeTableViz';
let component;

const props = {
	classes: { root: 'testing' },
};

describe('TimeTableViz', () => {
	beforeAll(() => {
		component = shallow(<TimeTableViz {...props} />);
	});

	it('should render correctly', () => {
		expect(component).toMatchSnapshot();
	});
});
