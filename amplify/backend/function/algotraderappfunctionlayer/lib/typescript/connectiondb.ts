import { IConnection, TConnection } from './connectionTypes';
import {
  deleteItem,
  getItem,
  putItem,
  query,
  TDeleteItemInput,
  TGetItemInput,
  TPutItemInput,
  TQueryInput,
} from './dynamodb';

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
      rowType: {
        S: `connection:${type}:${username}`,
      },
    },
  };

  return putItem(input);
};

export const getConnections = async (
  username: string,
  connectionType?: TConnection
) => {
  let connectionAttributeValue: any = null;
  let filterExpression: string = null;

  if (connectionType) {
    connectionAttributeValue = {
      ':connectionType': {
        S: `connection:${connectionType}`,
      },
    };

    filterExpression = 'begins_with (rowType, :connectionType)';
  }

  const input: TQueryInput = {
    ExpressionAttributeValues: {
      ':id': {
        S: username,
      },
      ...connectionAttributeValue,
    },
    KeyConditionExpression: 'id = :id',
    FilterExpression: filterExpression,
  };

  const results = await query(input);

  return results.Items;
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
