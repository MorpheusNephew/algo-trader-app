import { gql } from 'apollo-server-core';

export const authTypeDefs = gql`
  type Query {
    """
    Checks to determine if user is logged into TD Ameritrade Websockets
    """
    loggedIn: Boolean!
  }

  type Mutation {
    """
    Logs into TD Ameritrade Websockets
    """
    login(username: String!): String!

    """
    Logs out of TD Ameritrade Websockets
    """
    logout(username: String!): String!
  }
`;
