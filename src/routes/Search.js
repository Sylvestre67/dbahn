import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import SearchResults from '../components/SearchResults';

const styles = theme => ({
	root: {},
	form: {},
	searchField: {
		width: '100%',
	},
});

export class Search extends React.Component {
	constructor(props) {
		super(props);

		this.handleSearch = this.handleSearch.bind(this);

		this.updateLocationQuery = this.updateLocationQuery.bind(this);
		this.updateLocationQuery = debounce(this.updateLocationQuery, 500);

		this.state = {
			search: '',
		};
	}

	componentDidMount() {
		const { location } = this.props;
		const { search } = location;

		if (search.length > 0) {
			this.setState({ search: search.replace('?q=', '') });
		}
	}

	handleSearch(e) {
		const { history, location } = this.props;
		this.setState({ search: e.target.value }, () => {
			this.updateLocationQuery();
		});
	}

	updateLocationQuery() {
		const { history, location } = this.props;

		history.push({
			pathname: location.pathname,
			search: `q=${this.state.search}`,
		});
	}

	render() {
		const { classes } = this.props;
		const { search } = this.state;

		return (
			<React.Fragment>
				<Grid container>
					<Grid item xs={12}>
						<Typography variant="h5">
							Search for a DB network station
						</Typography>
					</Grid>
				</Grid>

				<Grid container justify="center">
					<Grid item xs={12} sm={12} lg={6}>
						<form
							className={classes.form}
							noValidate
							autoComplete="off">
							<TextField
								id="station-search"
								label="Search"
								value={search}
								className={classes.searchField}
								onChange={e => {
									this.handleSearch(e);
								}}
								margin="normal"
							/>
						</form>
					</Grid>
				</Grid>

				<Grid container>
					<Grid item xs={12}>
						<SearchResults />
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}

Search.propTypes = {
	classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(withRouter(Search));
