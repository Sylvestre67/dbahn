import React from 'react';
// import PropTypes from 'prop-types';

import StationHeader from '../components/StationHeader';
import StationTimetable from '../components/StationTimetable';

class Station extends React.Component {
	render() {
		return (
			<React.Fragment>
				<StationHeader />
				<StationTimetable />
			</React.Fragment>
		);
	}
}

export default Station;
