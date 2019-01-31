import React from 'react';
import { ApolloClient, ApolloError } from 'apollo-client';
import { Query, withApollo } from 'react-apollo';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import StationFragments from '../context/fragments';
import { GET_STATION } from '../context/queries';
import { MetaData } from '../context/__generated__/MetaData';
import { Station } from '../context/__generated__/Station';

import StationQuery from './StationQuery';

const styles = () =>
	createStyles({
		root: {},
	});

interface IStationHeaderProps extends WithStyles<typeof styles> {}
interface IStationHeaderProps extends RouteComponentProps<{ evaId: string }> {
	client: ApolloClient<any>;
}

interface IRenderStationHeaderProps extends WithStyles<typeof styles> {
	data: Station | null | undefined;
	loading: boolean;
	error: ApolloError | undefined;
}

const RenderStationHeader: React.SFC<IRenderStationHeaderProps> = props => {
	const { classes, data, loading, error } = props;

	if (loading) {
		return <Typography variant="h5">Loading</Typography>;
	}

	if (data && data.stationWithEvaId) {
		const {
			stationWithEvaId: { name },
		} = data;

		return (
			<div className={classes.root} style={{}}>
				<Typography variant="h5">{name}</Typography>
			</div>
		);
	}

	return <React.Fragment />;
};

const StationHeader: React.SFC<IStationHeaderProps> = props => {
	const { classes, client, match } = props;

	let station_meta_data: MetaData | null;
	try {
		station_meta_data = client.readFragment({
			id: `Station_${match.params.evaId}`,
			fragment: StationFragments.fragments.station_meta_data,
		});
	} catch (error) {
		station_meta_data = null;
	}

	if (station_meta_data) {
		return <Typography variant="h5">{station_meta_data.name}</Typography>;
	} else {
		return (
			<StationQuery
				query={GET_STATION}
				variables={{ evaId: parseInt(match.params.evaId, 10) }}
				client={client}>
				{({ data, loading, error }) => {
					return (
						<RenderStationHeader
							classes={classes}
							data={data}
							loading={loading}
							error={error}
						/>
					);
				}}
			</StationQuery>
		);
	}
};

export default withStyles(styles)(withApollo(withRouter(StationHeader)));
