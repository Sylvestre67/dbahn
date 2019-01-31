import React from 'react';
import * as d3 from 'd3';
import { ApolloError } from 'apollo-client';

import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import {
	Station,
	Station_stationWithEvaId_timetable,
	Station_stationWithEvaId_tracks,
} from '../context/__generated__/Station';

const styles = () =>
	createStyles({
		element: { height: '100%' },
	});

interface ITimeTableVizProps extends WithStyles<typeof styles> {}
interface ITimeTableVizProps {
	data: Station | null | undefined;
	loading: boolean;
	error: ApolloError | undefined;
}

class TimeTableViz extends React.PureComponent<ITimeTableVizProps, {}> {
	private element = React.createRef<HTMLDivElement>();

	componentDidUpdate() {
		const { data } = this.props;

		if (data && data.stationWithEvaId) {
			const {
				stationWithEvaId: { timetable, tracks },
			} = data;
			this.drawTracks(tracks, timetable);
		}
	}

	drawTracks(
		tracks: Station_stationWithEvaId_tracks[],
		timetable: Station_stationWithEvaId_timetable
	) {
		console.log(timetable, tracks);

		let width: number, height: number;

		const node = this.element.current;
		const el = d3.select(this.element.current);

		const margin = { top: 5, left: 30, bottom: 10, right: 0 };

		if (node) {
			(width = node.clientWidth), (height = node.clientHeight);

			const svg = el
				.append('svg')
				.attr('width', width)
				.attr('height', height)
				.attr('class', 'tracks');

			svg.append('circle')
				.attr('r', 5)
				.attr('fill', 'blue');
		}
	}

	render() {
		const { classes } = this.props;
		return <div className={classes.element} ref={this.element} />;
	}
}

export default withStyles(styles)(TimeTableViz);
