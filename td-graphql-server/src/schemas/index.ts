import { mergeTypeDefs } from '@graphql-tools/merge';
import { gql } from 'apollo-server-core';
import { authTypeDefs } from './auth';

export const typeDefs = mergeTypeDefs([
  gql`
    type Query {
      info: String!
    }
  `,
]);
