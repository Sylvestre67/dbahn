import React from 'react';
import { ApolloClient } from 'apollo-client';

import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';

import StationFragments from '../context/fragments';
import { GET_STATION } from '../context/queries';

import { Timetable } from '../context/__generated__/Timetable';

import StationQuery from './StationQuery';
import TimeTableViz from './TimeTableViz';

interface IStationTimetableProps extends WithStyles<typeof styles> {}
interface IStationTimetableProps
	extends RouteComponentProps<{ evaId: string }> {
	client: ApolloClient<any>;
}

const styles = () =>
	createStyles({
		root: { flex: 1, backgroundColor: '#eee' },
	});

const StationTimetable: React.SFC<IStationTimetableProps> = props => {
	const { client, match } = props;

	// Querying the cache, if timetable fragment found, use it, do not query.
	let timetable: Timetable | null;
	try {
		timetable = client.readFragment({
			id: `Station_${match.params.evaId}`,
			fragment: StationFragments.fragments.timetable,
		});
	} catch (error) {
		timetable = null;
	}

	return Object.is(timetable, null) ? (
		<StationQuery
			query={GET_STATION}
			variables={{ evaId: parseInt(match.params.evaId, 10) }}
			client={client}>
			{({ data, loading, error }) => (
				<TimeTableViz data={data} loading={loading} error={error} />
			)}
		</StationQuery>
	) : (
		<TimeTableViz
			data={client.readQuery({
				query: GET_STATION,
				variables: { evaId: parseInt(match.params.evaId, 10) },
			})}
			loading={false}
			error={undefined}
		/>
	);
};

export default withStyles(styles)(withRouter(StationTimetable));
