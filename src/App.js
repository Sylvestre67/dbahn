import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import gql from 'graphql-tag';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';

import theme from './theme/theme';

import apolloClient from './services/apollo';

import Header from './layout/Header';
import Footer from './layout/Footer';

import FourOhFour from './routes/FourOhFour';
import Search from './routes/Search';
import Station from './routes/Station';

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
				<main role="main" className={classes.main}>
					<Router>
						<Switch>
							<Route exact path="/" component={Search} />
							<Route
								exact
								path="/:station_id/"
								component={Station}
							/>
							<Route component={FourOhFour} />
						</Switch>
					</Router>
				</main>
				<Footer />
			</MuiThemeProvider>
		);
	}
}

export default withStyles(styles)(App);
