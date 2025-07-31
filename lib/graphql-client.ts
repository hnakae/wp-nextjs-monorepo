// lib/graphql-client.ts

import { GraphQLClient } from 'graphql-request';
import { getSdk } from './generated/graphql';

const endpoint = process.env.NEXT_PUBLIC_WP_API_URL!;
export const graphqlClient = new GraphQLClient(endpoint, {
  headers: { 'Content-Type': 'application/json' },
});
export const sdk = getSdk(graphqlClient);

// New function to allow for revalidation
export const getSdkWithFetch = (cacheConfig: RequestInit | undefined) => {
  return getSdk(
    new GraphQLClient(endpoint, {
      headers: { 'Content-Type': 'application/json' },
      fetch: (url: RequestInfo, init?: RequestInit) => {
        return fetch(url, {
          ...init,
          ...cacheConfig,
        });
      },
    })
  );
};
