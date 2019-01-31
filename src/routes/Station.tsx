import React from 'react';

import StationHeader from '../components/StationHeader';
import StationTimetable from '../components/StationTimetable';

export const Station: React.SFC<{}> = () => {
	return (
		<React.Fragment>
			<StationHeader />
			<StationTimetable />
		</React.Fragment>
	);
};

export default Station;
