"use strict";

// wundergraph.config.ts
var import_sdk2 = require("@wundergraph/sdk");

// wundergraph.server.ts
var import_server = require("@wundergraph/sdk/server");
var wundergraph_server_default = (0, import_server.configureWunderGraphServer)(() => ({
  hooks: {
    queries: {
      Countries: {
        preResolve: async ({ operations }) => {
        }
      }
    },
    mutations: {}
  }
}));

// wundergraph.operations.ts
var import_sdk = require("@wundergraph/sdk");
var wundergraph_operations_default = (0, import_sdk.configureWunderGraphOperations)({
  operations: {
    defaultConfig: {
      authentication: {
        required: false
      }
    },
    queries: (config) => ({
      ...config,
      caching: {
        enable: false,
        staleWhileRevalidate: 60,
        maxAge: 60,
        public: true
      },
      liveQuery: {
        enable: true,
        pollingIntervalSeconds: 1
      }
    }),
    mutations: (config) => ({
      ...config
    }),
    subscriptions: (config) => ({
      ...config
    }),
    custom: {}
  }
});

// wundergraph.config.ts
var countries = import_sdk2.introspect.graphql({
  apiNamespace: "countries",
  url: "https://countries.trevorblades.com/"
});
var spaceX = import_sdk2.introspect.graphql({
  apiNamespace: "spacex",
  url: "https://spacex-api.fly.dev/graphql/"
});
(0, import_sdk2.configureWunderGraphApplication)({
  apis: [countries, spaceX],
  server: wundergraph_server_default,
  operations: wundergraph_operations_default,
  generate: {
    codeGenerators: []
  },
  authentication: {
    cookieBased: {
      providers: [
        import_sdk2.authProviders.google({
          id: "google",
          clientId: new import_sdk2.EnvironmentVariable("GOOGLE_CLIENT_ID_WEB"),
          clientSecret: new import_sdk2.EnvironmentVariable("GOOGLE_CLIENT_SECRET_WEB")
        })
      ]
    }
  },
  cors: {
    ...import_sdk2.cors.allowAll
  },
  security: {
    enableGraphQLEndpoint: process.env.NODE_ENV !== "production" || process.env.GITPOD_WORKSPACE_ID !== void 0
  }
});
//# sourceMappingURL=config.cjs.map
