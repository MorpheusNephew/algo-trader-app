import WebSocket from 'ws';

export const getTdAmeritradeSocket = (socketUrl: string): WebSocket => {
  return new WebSocket(socketUrl);
};
