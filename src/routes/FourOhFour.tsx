import React from 'react';

import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';

const styles = ({ spacing }: Theme) =>
	createStyles({
		root: {
			textAlign: 'center',
			padding: `${spacing.unit * 3}px 0`,
		},
	});

interface FourOhFourProps extends WithStyles<typeof styles> {}

export const FourOhFour: React.SFC<FourOhFourProps> = props => {
	const { classes } = props;

	return (
		<div className={classes.root}>
			<Typography variant="h6" color="error">
				Not Found
			</Typography>
			<Typography>The Page you requested cannot be found.</Typography>
		</div>
	);
};

export default withStyles(styles)(FourOhFour);
