import { configureWunderGraphApplication, cors, EnvironmentVariable, introspect, templates, authProviders } from '@wundergraph/sdk';
import server from './wundergraph.server';
import operations from './wundergraph.operations';

const countries = introspect.graphql({
	apiNamespace: 'countries',
	url: 'https://countries.trevorblades.com/',
});
const spaceX = introspect.graphql({
	apiNamespace: 'spacex',
	url: 'https://spacex-api.fly.dev/graphql/',
});

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
	apis: [countries, spaceX],
	server,
	operations,
	generate: {
		codeGenerators: [],
	},
	authentication: {
		cookieBased: {
			providers: [
				authProviders.google({
					id: 'google', // unique id for this provider
					clientId: new EnvironmentVariable('GOOGLE_CLIENT_ID_WEB'),
					clientSecret: new EnvironmentVariable('GOOGLE_CLIENT_SECRET_WEB'),
				}),
			]
		}
	},
	cors: {
		...cors.allowAll,
		allowedOrigins:
			process.env.NODE_ENV === 'production'
				? [
						// change this before deploying to production to the actual domain where you're deploying your app
						'http://localhost:3000',
				  ]
				: ['https://localhost:19006', new EnvironmentVariable('WG_ALLOWED_ORIGIN')],
	},
	security: {
		enableGraphQLEndpoint: process.env.NODE_ENV !== 'production' || process.env.GITPOD_WORKSPACE_ID !== undefined,
	},
});
