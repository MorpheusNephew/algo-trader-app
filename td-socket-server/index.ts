import { expressServer, socketServer } from './servers';

socketServer.attach(expressServer, {
  cors: {
    origin: '*',
  },
});
