import { mergeResolvers } from '@graphql-tools/merge';
import { authResolvers } from '../auth/resolvers';

export const resolvers = mergeResolvers([
  {
    Query: {
      info: () => 'My info',
    },
  },
  authResolvers,
]);
