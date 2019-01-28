import React from 'react';
// import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { withStyles } from '@material-ui/core';

import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';

import { AutoSizer, List } from 'react-virtualized';

import { StationsContext } from '../context/Stations';

const listRowHeight = 61;

const styles = theme => ({
	listContainer: {
		height: '100%',
		textAlign: 'center',
	},
	list: {
		'&:focus': {
			outline: 0, // I know you should not do it.
		},
	},
	link: {
		textDecoration: 'none',
		color: '#25a9e0',
	},
	progress: {
		margin: theme.spacing.unit * 2,
	},
});

class SearchResults extends React.Component {
	constructor(props) {
		super(props);
		this._rowRenderer = this._rowRenderer.bind(this);
	}

	render() {
		const { classes, theme } = this.props;
		const { data, loading } = this.context;

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

				{loading ? (
					<CircularProgress className={classes.progress} />
				) : (
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
				)}
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
					secondary={
						<React.Fragment>
							<Typography
								component="span"
								color="textPrimary"
								variant="caption">
								{station.primaryEvaId}
							</Typography>
						</React.Fragment>
					}>
					<NavLink
						to={`/${station.primaryEvaId}/`}
						className={classes.link}>
						{station.name}
					</NavLink>
				</ListItemText>
			</ListItem>
		);
	}
}

SearchResults.contextType = StationsContext;

export default withStyles(styles, { withTheme: true })(SearchResults);
