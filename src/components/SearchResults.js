import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { AutoSizer, List } from 'react-virtualized';

import { StationsContext } from '../context/Stations';

const listRowHeight = 61;

const styles = theme => ({
	listContainer: {
		height: '100%',
	},
	list: {
		'&:focus': {
			outline: 0, // I know you should not do it.
		},
	},
});

class SearchResults extends React.Component {
	constructor(props) {
		super(props);
		this._rowRenderer = this._rowRenderer.bind(this);
	}

	render() {
		const { classes, theme } = this.props;
		const { data, loading, error } = this.context;

		return (
			<div className={classes.listContainer}>
				<Typography>
					Stations found: {JSON.stringify(data.length, 4, 4)}
				</Typography>

				{/* }<Typography>
					Loading: {JSON.stringify(loading, 4, 4)}
				</Typography>
				<Typography>
					Errors: {JSON.stringify(error || null, 4, 4)}
				</Typography>*/}

				<AutoSizer>
					{({ width, height }) => (
						<List
							className={classes.list}
							ref="List"
							width={width}
							height={height - theme.spacing.unit * 3}
							rowHeight={listRowHeight}
							overscanRowCount={5}
							rowCount={data.length}
							noRowsRenderer={this._noRowsRenderer}
							rowRenderer={this._rowRenderer}
						/>
					)}
				</AutoSizer>
			</div>
		);
	}

	_noRowsRenderer() {
		return <Typography>No stations found.</Typography>;
	}

	_rowRenderer({ index, isScrolling, key, style }) {
		const { classes } = this.props;
		const { data } = this.context;
		let station = data[index];

		// Sanitizing the station object.
		if (Object.is(station.picture, null)) {
			station = Object.assign(station, { picture: { url: '' } }); // add a default picture url here
		}

		return (
			<ListItem
				alignItems="flex-start"
				key={station.primaryEvaId}
				style={style}>
				<ListItemAvatar>
					<Avatar alt={station.name} src={station.picture.url} />
				</ListItemAvatar>
				<ListItemText
					primary={station.name}
					secondary={
						<React.Fragment>
							<Typography
								component="span"
								color="textPrimary"
								variant="caption">
								{station.primaryEvaId}
							</Typography>
						</React.Fragment>
					}
				/>
			</ListItem>
		);
	}
}

SearchResults.contextType = StationsContext;

export default withStyles(styles, { withTheme: true })(SearchResults);
