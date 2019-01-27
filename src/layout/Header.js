import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	grow: {
		flexGrow: 1,
	},
	img: {
		width: '50px',
		height: 'auto',
	},
	bar: {
		display: 'flex',
		justifyContent: 'center',
	},
});

export function Header(props) {
	const { classes } = props;

	return (
		<AppBar position="relative" elevation={0}>
			<Toolbar className={classes.bar}>
				<Grid container>
					<Grid item xs={12}>
						<Typography
							variant="h6"
							color="inherit"
							className={classes.grow}>
							{'1bahnQL'}
						</Typography>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
