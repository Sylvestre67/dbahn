import React from 'react';
// import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

import apolloClient from '../services/apollo';

import { Query } from 'react-apollo';

const GET_STATIONS = gql`
	query stations($search: String!) {
		search(searchTerm: $search) {
			stations {
				primaryEvaId
				name
				picture {
					url
				}
			}
		}
	}
`;

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
				query={GET_STATIONS}
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
