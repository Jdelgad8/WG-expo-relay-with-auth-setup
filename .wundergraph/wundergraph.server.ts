import { configureWunderGraphServer } from '@wundergraph/sdk/server';

export default configureWunderGraphServer(() => ({
  // options: {
  //   serverUrl: "https://[YOUR_IP]:9991",
  //   listen: {
  //     host: "[YOUR_IP]",
  //     port: "[YOUR_IP]",
  //   },
  // },
  hooks: {
    queries: {
      Countries: {
        preResolve: async ({ operations }) => {},
      },
    },
    mutations: {},
  },
}));
