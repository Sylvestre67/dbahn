import { ApolloLink, concat } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const httpLink = new HttpLink({
	uri: `${process.env.REACT_APP_1BAHN_HOST}/graphql`,
});

const authMiddleware = new ApolloLink((operation, forward) => {
	operation.setContext({
		headers: {
			Authorization: `Bearer ${process.env.REACT_APP_1BAHN_BEARER}`,
		},
	});

	return forward(operation);
});

const apolloClient = new ApolloClient({
	link: concat(authMiddleware, httpLink),
	cache: new InMemoryCache({
		dataIdFromObject: object => {
			switch (object.__typename) {
				case 'Station':
					return `${object.__typename}_${object.primaryEvaId}`;
				default:
					return defaultDataIdFromObject(object); // fall back to default handling
			}
		},
	}),
});

export default apolloClient;
