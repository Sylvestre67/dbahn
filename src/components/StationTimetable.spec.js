import React from 'react';
import { shallow } from 'enzyme';

import StationTimetable from './StationTimetable';
let component;

const props = {
	classes: { root: 'testing' },
};

describe('StationTimetable', () => {
	beforeAll(() => {
		component = shallow(<StationTimetable {...props} />);
	});

	it('should render correctly', () => {
		expect(component).toMatchSnapshot();
	});
});
