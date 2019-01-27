import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const isEven = process.env.REACT_APP_WEBSITE_NAME === 'Even Financial';

const styles = theme => ({
	footer: {
		backgroundColor: theme.palette.primary.main,
		color: 'white',
		'& > div': {
			justifyContent: 'center',
		},
	},
});

export function Footer(props) {
	const { classes } = props;

	return (
		<footer className={classes.footer}>
			<Toolbar elevation={0} variant="dense">
				<Typography variant="caption" color="inherit">
					Made with love in NYC
				</Typography>
			</Toolbar>
		</footer>
	);
}

Footer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
