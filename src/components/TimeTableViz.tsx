import React from 'react';
import * as d3 from 'd3';

import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { Timetable } from '../context/__generated__/Timetable';

const styles = () =>
	createStyles({
		element: { height: '100%' },
	});

interface ITimeTableVizProps extends Timetable {}
interface ITimeTableVizProps extends WithStyles<typeof styles> {}

class TimeTableViz extends React.PureComponent<ITimeTableVizProps, {}> {
	private element = React.createRef<HTMLDivElement>();

	componentDidMount() {
		this.drawTracks();
	}

	drawTracks() {
		const { timetable, tracks } = this.props;
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

	updateTracks() {}

	render() {
		const { classes } = this.props;
		return <div className={classes.element} ref={this.element} />;
	}
}

export default withStyles(styles)(TimeTableViz);
