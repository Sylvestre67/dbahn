import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';

import theme from './theme/theme';

const styles = theme => ({
	root: {},
});

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<div className="App">
					<CssBaseline />
				</div>
			</MuiThemeProvider>
		);
	}
}

export default withStyles(styles)(App);
