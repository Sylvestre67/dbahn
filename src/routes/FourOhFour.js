import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	root: {
		textAlign: 'center',
		padding: `${theme.spacing.unit * 3}px 0`,
	},
});

export function FourOhFour(props) {
	const { classes } = props;

	return (
		<div className={classes.root}>
			<Typography variant="h6" color="error">
				Not Found
			</Typography>
			<Typography>The Page you requested cannot be found.</Typography>
		</div>
	);
}

FourOhFour.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FourOhFour);
