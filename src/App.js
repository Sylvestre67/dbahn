import React, { Component } from 'react';
import gql from 'graphql-tag';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';

import theme from './theme/theme';

import apolloClient from './services/apollo';

import Header from './layout/Header';
import Footer from './layout/Footer';

const styles = theme => ({
	main: {
		flex: '1 0 auto',
	},
});

class App extends Component {
	render() {
		const { classes } = this.props;
		return (
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<Header />
				<main role="main" className={classes.main} />
				<Footer />
			</MuiThemeProvider>
		);
	}
}

export default withStyles(styles)(App);
