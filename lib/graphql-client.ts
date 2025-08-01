// lib/graphql-client.ts

import { GraphQLClient } from 'graphql-request';
import { getSdk } from './generated/graphql';

const endpoint = process.env.NEXT_PUBLIC_WP_API_URL!;
export const graphqlClient = new GraphQLClient(endpoint, {
  headers: { 'Content-Type': 'application/json' },
});
export const sdk = getSdk(graphqlClient);

export async function fetchGraphQL(document: any, variables?: any) {
  return sdk[document.definitions[0].name.value](variables);
}
