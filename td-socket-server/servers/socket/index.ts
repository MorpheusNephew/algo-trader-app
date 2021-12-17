import { getTdAmeritradeSocket } from '../../clients';
import { TOptionField } from '../../clients/td-ameritrade/types';
import { UserPrincipal } from '@morpheusnephew/td-ameritrade-models';
import { Server } from 'socket.io';
import {
  getLoginRequest,
  getLoginUrl,
  getOptionsRequest,
} from '../../clients/td-ameritrade/requests';

export const socketServer = new Server();

const socketToTdUserPrincipal = {};

socketServer.on('connection', (socket) => {
  console.log('New connection', socket.id);

  socket.on('td-login', (userPrincipal: UserPrincipal) => {
    socketToTdUserPrincipal[socket.id] = userPrincipal;

    console.log('socketToTdUserPrincipal', socketToTdUserPrincipal);

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
      }
    });

    tdSocket.on('close', (code, reason) => {
      console.log('TD Socket closed', code, reason.toString());
    });

    socket.on(
      'sub-options',
      (tickerSymbols: string[], optionFields: TOptionField[]) => {
        const optionRequest = getOptionsRequest(
          socketToTdUserPrincipal[socket.id],
          tickerSymbols,
          optionFields
        );

        const request = {
          requests: [optionRequest],
        };

        const stringifiedRequest = JSON.stringify(request);

        console.log('sub-options: request', stringifiedRequest);

        tdSocket.send(stringifiedRequest);
      }
    );
  });

  socket.on('disconnect', (reason) => {
    delete socketToTdUserPrincipal[socket.id];
    console.log('disconnect reason', reason);
  });
});
