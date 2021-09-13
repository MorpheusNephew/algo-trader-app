import { IConnection, TConnection } from './connectionTypes';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
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
    Item: marshall({
      id: username,
      sortName: type,
      accessToken,
      accessTokenExpiration,
      connectionId,
      refreshToken,
      refreshTokenExpiration,
      rowType: `connection:${type}:${username}`,
    }),
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
      ':connectionType': `connection:${connectionType}`,
    };

    filterExpression = 'begins_with (rowType, :connectionType)';
  }

  const input: TQueryInput = {
    ExpressionAttributeValues: marshall({
      ':id': username,
      ...connectionAttributeValue,
    }),
    KeyConditionExpression: 'id = :id',
    FilterExpression: filterExpression,
  };

  const { Items } = await query(input);

  return Items?.map((Item) => unmarshall(Item));
};

export const getConnection = async () => {
  const input: TGetItemInput = {
    Key: {},
  };

  const { Item } = await getItem(input);

  return unmarshall(Item);
};

export const deleteConnection = async () => {
  const input: TDeleteItemInput = {
    Key: {},
  };

  return deleteItem(input);
};
