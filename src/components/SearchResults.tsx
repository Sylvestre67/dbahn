import React from 'react';
import {
	AutoSizer,
	List,
	ListRowProps,
	ListRowRenderer,
} from 'react-virtualized';
import { NavLink } from 'react-router-dom';

import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core';

import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';

import { StationsContext } from '../context/Stations';
import { StationDefs_search_stations } from '../context/__generated__/StationDefs';

const listRowHeight: number = 61;

interface ISearchResultsProps extends WithStyles<typeof styles> {
	theme: Theme;
}

const styles = ({ spacing }: Theme) =>
	createStyles({
		listContainer: {
			height: '100%',
			textAlign: 'center',
		},
		list: {
			'&:focus': {
				outline: 0,
			},
		},
		link: {
			textDecoration: 'none',
			color: '#25a9e0',
		},
		progress: {
			margin: spacing.unit * 2,
		},
	});

class SearchResults extends React.Component<ISearchResultsProps, {}> {
	static contextType = StationsContext;
	context!: React.ContextType<typeof StationsContext>;

	public render() {
		const { classes } = this.props;

		return (
			<div className={classes.listContainer}>{this._renderList()}</div>
		);
	}

	private _renderList: (
		this: SearchResults
	) => React.ReactElement<
		typeof Typography | typeof CircularProgress | typeof AutoSizer
	> = () => {
		const { classes, theme } = this.props;

		let stations: StationDefs_search_stations[] | [] = [];
		if (this.context && this.context.data && this.context.data.search) {
			stations = this.context.data.search.stations;
		}

		let loading: boolean = false;
		if (this.context && this.context.loading) {
			loading = this.context.loading;
		}

		if (loading) {
			return <CircularProgress className={classes.progress} />;
		}

		if (stations.length > 0) {
			return (
				<AutoSizer>
					{({ width, height }) => (
						<List
							className={classes.list}
							ref="List"
							width={width}
							height={height - theme.spacing.unit * 3}
							rowHeight={listRowHeight}
							overscanRowCount={5}
							rowCount={stations.length}
							noRowsRenderer={this._noRowsRenderer}
							rowRenderer={this._rowRenderer}
						/>
					)}
				</AutoSizer>
			);
		}

		return <Typography>No Results found...</Typography>;
	};

	private _noRowsRenderer: () => React.ReactElement<
		typeof Typography
	> = () => {
		return <Typography>No stations found.</Typography>;
	};

	private _rowRenderer: ListRowRenderer = ({
		index,
		style,
	}: ListRowProps) => {
		let station: StationDefs_search_stations | undefined;
		let url: string = ''; //TODO: add a default picture url ?

		const { classes } = this.props;

		if (this.context && this.context.data) {
			station = this.context.data.search.stations[index];
		}

		if (station && station.picture) {
			url = station.picture.url;
		}

		if (station) {
			return (
				<ListItem key={station.primaryEvaId} style={style}>
					<ListItemAvatar>
						<Avatar alt={station.name} src={url} />
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
	};
}

export default withStyles(styles, { withTheme: true })(SearchResults);
