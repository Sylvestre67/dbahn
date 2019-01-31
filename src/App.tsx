import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import {
	withStyles,
	createStyles,
	MuiThemeProvider,
	WithStyles,
	Theme,
} from '@material-ui/core/styles';

import theme from './theme/theme';
import apolloClient from './services/apollo';

import Header from './layout/Header';
import Footer from './layout/Footer';

import FourOhFour from './routes/FourOhFour';
import Search from './routes/Search';
import Station from './routes/Station';
import Stations from './context/Stations';

const styles = ({ spacing }: Theme) =>
	createStyles({
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

interface IAppProps extends WithStyles<typeof styles> {}

class App extends Component<IAppProps, {}> {
	render() {
		const { classes } = this.props;
		return (
			<ApolloProvider client={apolloClient}>
				<MuiThemeProvider theme={theme}>
					<CssBaseline />
					<Header />
					<main role="main" className={classes.main}>
						<Grid
							className={classes.container}
							container
							spacing={8}>
							<Grid
								item
								xs={12}
								style={{
									display: 'flex',
									flexDirection: 'column',
								}}>
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
												path="/:evaId/"
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
			</ApolloProvider>
		);
	}
}

export default withStyles(styles)(App);
