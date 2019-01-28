import React from 'react';
// import PropTypes from 'prop-types';
import { Query, withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import StationFragments from '../context/fragments';
import { GET_STATION } from '../context/queries';

const styles = theme => ({
	root: {},
});

const StationHeader = props => {
	const { classes, client, match } = props;
	let station;

	try {
		station = client.readFragment({
			id: `Station_${match.params.evaId}`,
			fragment: StationFragments.fragments.station_meta_data,
		});
	} catch (error) {
		station = null;
	}

	return Object.is(station, null) ? (
		<Query
			query={GET_STATION}
			variables={{ evaId: match.params.evaId }}
			client={client}>
			{({ data, loading, error }) => (
				<React.Fragment>
					{loading ? (
						<div />
					) : (
						<div className={classes.root}>
							<Typography variant="h5">
								{data.stationWithEvaId.name}
							</Typography>
							<Typography>
								{JSON.stringify(data.stationWithEvaId, 4, 4)}
							</Typography>
						</div>
					)}
				</React.Fragment>
			)}
		</Query>
	) : (
		<div className={classes.root}>
			<Typography variant="h5">{station.name}</Typography>
			<Typography>{JSON.stringify(station, 4, 4)}</Typography>
		</div>
	);
};

StationHeader.propTypes = {};

StationHeader.defaultProps = {};

export default withStyles(styles)(withApollo(withRouter(StationHeader)));
