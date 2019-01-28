import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

import { SEARCH_STATIONS } from './queries';

import apolloClient from '../services/apollo';

export const StationsContext = React.createContext({});

class Stations extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			search: '',
		};
	}

	componentDidMount() {
		const { location } = this.props;
		const { pathname, search } = location;

		if (pathname === '/' && search.replace('?q=', '').length) {
			this.setState({ search: search.replace('?q=', '') });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { location } = this.props;
		const { pathname, key, search } = location;

		if (pathname === '/' && key !== prevProps.location.key) {
			this.setState({ search: search.replace('?q=', '') });
		}
	}

	render() {
		const { search } = this.state;

		return (
			<Query
				query={SEARCH_STATIONS}
				variables={{ search }}
				client={apolloClient}>
				{({ data = { search: { stations: [] } }, loading, error }) => (
					<StationsContext.Provider
						value={{
							data: data.search ? data.search.stations : [],
							loading,
							error,
						}}>
						{this.props.children}
					</StationsContext.Provider>
				)}
			</Query>
		);
	}
}

export default withRouter(Stations);
