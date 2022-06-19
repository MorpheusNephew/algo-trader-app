import { pubSub } from '../subscriptions';

enum AuthEvents {
  LOGGED_IN_USERS = 'LOGGED_IN_USERS',
}

const loggedInUsers: Record<string, string> = {};

export const authResolvers = {
  Query: {
    loggedIn: () => false,
  },
  Mutation: {
    login: (_obj: any, args: any, _context: any, _info: any) => {
      let loginMessage = `User (${args.username}) is already logged in`;

      if (!loggedInUsers[args.username]) {
        loginMessage = `User (${args.username}) is now logged in`;
        loggedInUsers[args.username] = args.username;
      }

      pubSub.publish(AuthEvents.LOGGED_IN_USERS, {
        loggedInUsers: Object.values(loggedInUsers),
      });

      return loginMessage;
    },
    logout: (_obj: any, args: any, _context: any, _info: any) => {
      let logoutMessage = `User (${args.username}) was never logged in`;

      if (loggedInUsers[args.username]) {
        logoutMessage = `User (${args.username}) is now logged out`;
        delete loggedInUsers[args.username];
      }

      pubSub.publish(AuthEvents.LOGGED_IN_USERS, {
        loggedInUsers: Object.values(loggedInUsers),
      });

      return logoutMessage;
    },
  },
  Subscription: {
    loggedInUsers: {
      subscribe: () => pubSub.asyncIterator(AuthEvents.LOGGED_IN_USERS),
    },
  },
};
