import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { AutoSizer, List as VirtualizedList } from 'react-virtualized';

import { StationsContext } from '../context/Stations';

const overscanRowCount = 10;
const listRowHeight = 61;

const styles = theme => ({
	listContainer: {
		height: '100%',
	},
	list: {},
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
				{/* <Typography>
					Stations found: {JSON.stringify(data.length, 4, 4)}
				</Typography>
				<Typography>
					Loading: {JSON.stringify(loading, 4, 4)}
				</Typography>
				<Typography>
					Errors: {JSON.stringify(error || null, 4, 4)}
				</Typography>*/}

				<AutoSizer>
					{({ width, height }) => (
						<List>
							<VirtualizedList
								ref="List"
								className={classes.list}
								height={height - theme.spacing.unit * 3}
								overscanRowCount={overscanRowCount}
								noRowsRenderer={this._noRowsRenderer}
								rowCount={data.length}
								rowHeight={listRowHeight}
								rowRenderer={this._rowRenderer}
								width={width}
							/>
						</List>
					)}
				</AutoSizer>
			</div>
		);
	}

	_noRowsRenderer() {}

	_rowRenderer({ index, isScrolling, key, style }) {
		const { classes } = this.props;
		const { data } = this.context;
		const station = data[index];

		return (
			<React.Fragment key={`${index}`}>
				{isScrolling ? (
					<ListItem alignItems="flex-start">
						<ListItemAvatar>
							<Avatar
								alt={station.name}
								src={station.picture.url}
							/>
						</ListItemAvatar>
						<ListItemText
							primary={station.name}
							secondary={
								<React.Fragment>
									<Typography
										component="span"
										className={classes.inline}
										color="textPrimary">
										{station.primaryEvaId}
									</Typography>
								</React.Fragment>
							}
						/>
					</ListItem>
				) : (
					<ListItem alignItems="flex-start" key={`${index}`}>
						<ListItemAvatar>
							<Avatar
								alt={station.name}
								src={station.picture.url}
							/>
						</ListItemAvatar>
						<ListItemText
							primary={station.name}
							secondary={
								<React.Fragment>
									<Typography
										component="span"
										className={classes.inline}
										color="textPrimary">
										{station.primaryEvaId}
									</Typography>
								</React.Fragment>
							}
						/>
					</ListItem>
				)}
			</React.Fragment>
		);
	}
}

SearchResults.contextType = StationsContext;

export default withStyles(styles, { withTheme: true })(SearchResults);
