import React from 'react';
// import PropTypes from 'prop-types';
import { Query, withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import StationFragments from '../context/fragments';
import { GET_STATION } from '../context/queries';

const styles = theme => ({
	root: {
		// height: '100%',
		// backgroundColor: '#eee',
		// backgroundSize: 'cover',
		// backgroundPosition: 'center',
		// backgroundRepeat: 'no-repeat',
	},
});

const RenderStationHeader = props => {
	const { classes, station, loading } = props;

	return (
		<React.Fragment>
			{!loading && (
				<div
					className={classes.root}
					style={
						{
							// backgroundImage: station.picture
							// 	? `url(${station.picture.url})`
							// 	: '',
						}
					}>
					<Typography variant="h5">{station.name}</Typography>
				</div>
			)}
		</React.Fragment>
	);
};

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
				<RenderStationHeader
					loading={loading}
					classes={classes}
					station={data.stationWithEvaId}
				/>
			)}
		</Query>
	) : (
		<RenderStationHeader classes={classes} station={station} />
	);
};

StationHeader.propTypes = {};

StationHeader.defaultProps = {};

export default withStyles(styles)(withApollo(withRouter(StationHeader)));
