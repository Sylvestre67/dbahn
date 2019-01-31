import React from 'react';

import StationHeader from '../components/StationHeader';
import StationTimetable from '../components/StationTimetable';

import apolloClient from '../services/apollo';

export const Station: React.SFC<{}> = () => {
	return (
		<React.Fragment>
			<StationHeader client={apolloClient} />
			<StationTimetable client={apolloClient} />
		</React.Fragment>
	);
};

export default Station;
