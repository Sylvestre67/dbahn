import React from 'react';
import { shallow } from 'enzyme';

import SearchResults from './SearchResults';
let component;

const props = {
	classes: { root: 'testing' },
};

describe('SearchResults', () => {
	beforeAll(() => {
		component = shallow(<SearchResults {...props} />);
	});

	it('should render correctly', () => {
		expect(component).toMatchSnapshot();
	});
});
