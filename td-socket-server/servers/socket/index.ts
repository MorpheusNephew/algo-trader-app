import { getTdAmeritradeSocket } from '../../clients';
import { getLogoutRequest } from '../../clients/td-ameritrade/requests/logoutRequest';
import { getQuotesRequest } from '../../clients/td-ameritrade/requests/quotesRequest';
import { UserPrincipal } from '@morpheusnephew/td-ameritrade-models';
import { Server } from 'socket.io';
import {
  OptionFieldEnum,
  QuoteFieldEnum,
} from '../../clients/td-ameritrade/types';
import {
  getLoginRequest,
  getLoginUrl,
  getOptionsRequest,
} from '../../clients/td-ameritrade/requests';
import TopVolatility, {
  ISymbolToVolatility,
} from '../../calculations/topVolatility';

export const socketServer = new Server();

interface ISocketToUser {
  userPrincipal?: UserPrincipal;
  topVol?: TopVolatility;
}

const socketToUser: Record<string, ISocketToUser> = {};

socketServer.on('connection', (socket) => {
  console.log('New connection', socket.id);

  socket.on('td-login', (userPrincipal: UserPrincipal) => {
    socketToUser[socket.id] = { userPrincipal };

    const tdSocketUrl = getLoginUrl(userPrincipal);
    const loginRequest = getLoginRequest(userPrincipal);

    const request = {
      requests: [loginRequest],
    };

    const tdSocket = getTdAmeritradeSocket(tdSocketUrl);

    tdSocket.on('open', (_evt) => {
      console.log('TD Socket opened');
      tdSocket.send(JSON.stringify(request));
    });

    tdSocket.on('message', (evt) => {
      const data = JSON.parse(evt.toString());

      console.log('data', JSON.stringify(data));

      if (
        data?.response?.[0]?.command === 'LOGIN' &&
        data?.response?.[0]?.content.code === 0
      ) {
        const message = 'TD Logged in successfully';
        socket.emit('td-logged-in', message);
        console.log('Login message', message);
        socketToUser[socket.id].topVol = new TopVolatility(30);
      }

      if (
        data?.data?.[0].service === 'QUOTE' &&
        data?.data?.[0].command === 'SUBS'
      ) {
        data?.data?.[0].content.forEach((quote: any) => {
          const symbolToVolatility: ISymbolToVolatility = {
            symbol: quote.key,
            volatility: quote['24'],
          };

          socketToUser[socket.id].topVol.addToSymbolToVolatility(
            symbolToVolatility
          );
        });
      }
    });

    tdSocket.on('close', (code, reason) => {
      console.log('TD Socket closed', code, reason.toString());
    });

    socket.on(
      'sub-quotes',
      (tickerSymbols: string[], quoteFields: QuoteFieldEnum[]) => {
        const quoteRequest = getQuotesRequest(
          socketToUser[socket.id].userPrincipal,
          tickerSymbols,
          quoteFields
        );

        console.log('quoteRequest', JSON.stringify(quoteRequest));

        const request = {
          requests: [quoteRequest],
        };

        const stringifiedRequest = JSON.stringify(request);

        console.log('Sub-quotes request:', request);

        tdSocket.send(stringifiedRequest);
      }
    );

    socket.on(
      'sub-options',
      (tickerSymbols: string[], optionFields: OptionFieldEnum[]) => {
        const optionRequest = getOptionsRequest(
          socketToUser[socket.id].userPrincipal,
          tickerSymbols,
          optionFields
        );

        const request = {
          requests: [optionRequest],
        };

        const stringifiedRequest = JSON.stringify(request);

        console.log('Sub-options request:', request);

        tdSocket.send(stringifiedRequest);
      }
    );

    socket.on('top-vol', (callback) => {
      callback(socketToUser[socket.id]?.topVol?.getTop());
    });

    socket.on('disconnect', (reason) => {
      const { userPrincipal } = socketToUser[socket.id];

      if (userPrincipal) {
        const logoutRequest = getLogoutRequest(userPrincipal);

        const request = {
          requests: [logoutRequest],
        };

        tdSocket.send(JSON.stringify(request));

        delete socketToUser[socket.id];
      }

      console.log('disconnect reason', reason);
    });
  });
});
