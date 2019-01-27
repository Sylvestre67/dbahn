import React from 'react';
import { shallow } from 'enzyme';

import { FourOhFour } from './FourOhFour';
let component;

const props = {
	classes: {},
};

describe('FourOhFour', () => {
	beforeAll(() => {
		component = shallow(<FourOhFour {...props} />);
	});

	it('should render correctly', () => {
		expect(component).toMatchSnapshot();
	});
});
