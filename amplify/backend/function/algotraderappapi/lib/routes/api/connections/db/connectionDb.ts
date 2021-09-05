import { IConnection } from '../types';
import {
  deleteItem,
  getItem,
  putItem,
  TDeleteItemInput,
  TGetItemInput,
  TPutItemInput,
} from '../../../../services/dynamodb';

export const saveConnection = async (
  username: string,
  connectionToSave: IConnection
) => {
  const {
    accessToken,
    accessTokenExpiration,
    connectionId,
    refreshToken,
    refreshTokenExpiration,
    type,
  } = connectionToSave;

  const input: TPutItemInput = {
    Item: {
      id: {
        S: username,
      },
      sortName: {
        S: type,
      },
      accessToken: {
        S: accessToken,
      },
      accessTokenExpiration: {
        S: accessTokenExpiration,
      },
      connectionId: {
        S: connectionId,
      },
      refreshToken: {
        S: refreshToken,
      },
      refreshTokenExpiration: {
        S: refreshTokenExpiration,
      },
      type: {
        S: `connection:${type}:${username}`,
      },
    },
  };

  return putItem(input);
};

export const getConnection = async () => {
  const input: TGetItemInput = {
    Key: {},
  };

  return getItem(input);
};

export const deleteConnection = async () => {
  const input: TDeleteItemInput = {
    Key: {},
  };

  return deleteItem(input);
};
