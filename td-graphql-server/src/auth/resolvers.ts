export const authResolvers = {
  Query: {
    loggedIn: () => false,
  },
  Mutation: {
    login: (_obj: any, args: any, _context: any, _info: any) =>
      `User (${args.username}) is now logged in`,
    logout: (_obj: any, args: any, _context: any, _info: any) =>
      `User (${args.username}) is now logged out`,
  },
};
