import React from 'react';
import PropTypes from 'prop-types';

import { StationsContext } from '../context/Stations';
import Typography from '@material-ui/core/Typography';

class SearchResults extends React.Component {
	render() {
		const { data, loading, error } = this.context;

		return (
			<div>
				<Typography>Stations: {JSON.stringify(data, 4, 4)}</Typography>
				<Typography>
					Stations: {JSON.stringify(loading, 4, 4)}
				</Typography>
				<Typography>Stations: {JSON.stringify(error, 4, 4)}</Typography>
			</div>
		);
	}
}

SearchResults.contextType = StationsContext;

export default SearchResults;
