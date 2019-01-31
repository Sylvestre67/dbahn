import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import apolloClient from '../services/apollo';
import { StationDefs } from './__generated__/StationDefs';

import StationsQuery from './StationsQuery';

import { SEARCH_STATIONS } from './queries';

export const StationsContext = React.createContext({});

interface IStationsProps extends RouteComponentProps {}

interface IStationsState {
	data?: StationDefs;
	search: string;
}

class Stations extends React.PureComponent<IStationsProps, IStationsState> {
	constructor(props: IStationsProps) {
		super(props);

		this.state = {
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

	componentDidUpdate(prevProps: IStationsProps) {
		const { location } = this.props;
		const { pathname, key, search } = location;

		if (pathname === '/' && key !== prevProps.location.key) {
			this.setState({ search: search.replace('?q=', '') });
		}
	}

	render() {
		const { search } = this.state;

		return (
			<StationsQuery
				query={SEARCH_STATIONS}
				variables={{ search }}
				client={apolloClient}>
				{({ data, loading, error }) => (
					<StationsContext.Provider
						value={{
							data,
							loading,
							error,
						}}>
						{this.props.children}
					</StationsContext.Provider>
				)}
			</StationsQuery>
		);
	}
}

export default withRouter(Stations);