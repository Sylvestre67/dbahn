import React from 'react';
// import PropTypes from 'prop-types';
import { Query, withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import StationFragments from '../context/fragments';
import { GET_STATION } from '../context/queries';

const styles = theme => ({
	root: {},
});

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
			{({ data, loading, error }) => (
				<React.Fragment>
					{loading ? (
						<LinearProgress color="secondary" />
					) : (
						<div className={classes.root}>
							<Typography variant="h5">Timetable</Typography>
							<Typography>
								{JSON.stringify(
									data.stationWithEvaId.timetable,
									4,
									4
								)}
							</Typography>
						</div>
					)}
				</React.Fragment>
			)}
		</Query>
	) : (
		<div className={classes.root}>
			<Typography variant="h5">Timetable</Typography>
			<Typography>{JSON.stringify(timetable, 4, 4)}</Typography>
		</div>
	);
};

export default withStyles(styles)(withRouter(withApollo(StationTimetable)));
