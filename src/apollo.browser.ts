import 'isomorphic-fetch';

import { ApolloClient, createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/ciyob6fnu3qjl01329outsfgk'
});

export const client = new ApolloClient({
  networkInterface,
  initialState: window['UNIVERSAL_CACHE'].CACHE.APOLLO_STATE
});

export function provideClient() {
  return client;
}
