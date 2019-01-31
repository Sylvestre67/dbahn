module.exports = {
	client: {
		service: {
			name: 'dbahn',
			url: 'https://api.deutschebahn.com/free1bahnql/v1/graphql',
		},
		excludes: ['**/__snapshots__/**/*', '**/*.spec.js'],
	},
};
