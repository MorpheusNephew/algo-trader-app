import { pubSub } from '../subscriptions';

enum AuthEvents {
  LOGGED_IN_USERS = 'LOGGED_IN_USERS',
}

const loggedInUsers: Record<string, string> = {};

const publishLoggedInUsers = (usersToPublish: Record<string, string>) => {
  pubSub.publish(AuthEvents.LOGGED_IN_USERS, {
    loggedInUsers: Object.values(usersToPublish),
  });
};

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

      publishLoggedInUsers(loggedInUsers);

      return loginMessage;
    },
    logout: (_obj: any, args: any, _context: any, _info: any) => {
      let logoutMessage = `User (${args.username}) was never logged in`;

      if (loggedInUsers[args.username]) {
        logoutMessage = `User (${args.username}) is now logged out`;
        delete loggedInUsers[args.username];
      }

      publishLoggedInUsers(loggedInUsers);

      return logoutMessage;
    },
  },
  Subscription: {
    loggedInUsers: {
      subscribe: () => pubSub.asyncIterator(AuthEvents.LOGGED_IN_USERS),
    },
  },
};
