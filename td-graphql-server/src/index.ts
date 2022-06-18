import { resolvers } from './resolvers';
import { typeDefs } from './schemas';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import http from 'http';
import Koa from 'koa';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-koa';

(async () => {
  const httpServer = http.createServer();
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const webSocketServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  const serverCleanup = useServer({ schema }, webSocketServer);

  const apolloSever = new ApolloServer({
    schema,
    csrfPrevention: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await apolloSever.start();

  const app = new Koa();
  apolloSever.applyMiddleware({ app });
  httpServer.on('request', app.callback());

  const PORT = 4000;

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );

  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apolloSever.graphqlPath}`
  );

  return { server: apolloSever, app };
})();
