import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	element: { height: '100%' },
});

class TimeTableViz extends React.Component {
	constructor(props) {
		super(props);
		this.element = React.createRef();
	}

	componentDidMount() {
		this.drawTracks();
	}

	drawTracks() {
		const { timetable, tracks } = this.props;

		console.log(timetable, tracks);

		const node = this.element.current;
		const el = d3.select(this.element.current);

		const margin = { top: 5, left: 30, bottom: 10, right: 0 },
			width = node.clientWidth,
			height = node.clientHeight;

		const svg = el
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.attr('class', 'tracks');

		svg.append('circle')
			.attr('r', 5)
			.attr('fill', 'blue');
	}

	updateTracks() {}

	render() {
		const { classes } = this.props;

		return <div className={classes.element} ref={this.element} />;
	}
}

export default withStyles(styles)(TimeTableViz);
