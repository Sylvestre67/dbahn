import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';

import theme from './theme/theme';

import apolloClient from './services/apollo';

import Header from './layout/Header';
import Footer from './layout/Footer';

import FourOhFour from './routes/FourOhFour';
import Search from './routes/Search';
import Station from './routes/Station';

import Stations from './context/Stations';

const styles = theme => ({
	main: {
		flex: '1 0 auto',
		display: 'flex',
		justifyContent: 'center',
		padding: `0 ${theme.spacing.unit * 3}px`,
	},
	container: {
		maxWidth: '1400px',
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
					<Grid className={classes.container} container spacing={8}>
						<Grid item xs={12}>
							<Router>
								<Stations>
									<Switch>
										<Route
											exact
											path="/"
											component={Search}
										/>
										<Route
											exact
											path="/:station_id/"
											component={Station}
										/>
										<Route component={FourOhFour} />
									</Switch>
								</Stations>
							</Router>
						</Grid>
					</Grid>
				</main>
				<Footer />
			</MuiThemeProvider>
		);
	}
}

export default withStyles(styles)(App);
