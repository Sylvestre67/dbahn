import React from 'react';
// import PropTypes from 'prop-types';
import { Query, withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import StationFragments from '../context/fragments';
import { GET_STATION } from '../context/queries';

import TimeTableViz from './TimeTableViz';

const styles = theme => ({
	root: { flex: 1, backgroundColor: '#eee' },
});

const RenderTimeTable = props => {
	const { classes, ...timetable_and_tracks } = props;

	return (
		<div className={classes.root}>
			<TimeTableViz {...timetable_and_tracks} />
		</div>
	);
};

const StationTimetable = props => {
	const { classes, client, match } = props;
	let timetable;

	try {
		timetable = client.readFragment({
			id: `Station_${match.params.evaId}`,
			fragment: StationFragments.fragments.timetable,
		});
	} catch (error) {
		timetable = null;
	}

	return Object.is(timetable, null) ? (
		<Query
			query={GET_STATION}
			variables={{ evaId: match.params.evaId }}
			client={client}>
			{({ data, loading, error }) => {
				return (
					<React.Fragment>
						{loading ? (
							<LinearProgress color="secondary" />
						) : (
							<RenderTimeTable
								timetable={data.stationWithEvaId.timetable}
								tracks={data.stationWithEvaId.tracks}
								classes={classes}
							/>
						)}
					</React.Fragment>
				);
			}}
		</Query>
	) : (
		<RenderTimeTable timetable={timetable} classes={classes} />
	);
};

export default withStyles(styles)(withRouter(withApollo(StationTimetable)));
