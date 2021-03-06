import React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = ({ palette }: Theme) =>
	createStyles({
		footer: {
			backgroundColor: palette.secondary.main,
			color: 'white',
			'& > div': {
				justifyContent: 'center',
			},
		},
	});

interface IFooterProps extends WithStyles<typeof styles> {}

export const Footer: React.SFC<IFooterProps> = props => {
	const { classes } = props;

	return (
		<footer className={classes.footer}>
			<Toolbar variant="dense">
				<Typography variant="caption" color="inherit">
					Made with love in NYC
				</Typography>
			</Toolbar>
		</footer>
	);
};

export default withStyles(styles)(Footer);
