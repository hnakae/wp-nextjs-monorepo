// lib/graphql-client.ts

import { GraphQLClient } from 'graphql-request';
import { getSdk } from './generated/graphql';

const endpoint = process.env.NEXT_PUBLIC_WP_API_URL!;
export const graphqlClient = new GraphQLClient(endpoint, {
  headers: { 'Content-Type': 'application/json' },
});
export const sdk = getSdk(graphqlClient);
