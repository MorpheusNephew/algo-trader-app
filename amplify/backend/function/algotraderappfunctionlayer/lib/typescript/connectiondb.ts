import { IConnection, TConnection } from './connectionTypes';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { isEmpty } from 'lodash';
import {
  deleteItem,
  putItem,
  query,
  TDeleteItemInput,
  TPutItemInput,
  TQueryInput,
} from './dynamodb';
import {
  DeleteItemCommandOutput,
  PutItemCommandOutput,
} from '@aws-sdk/client-dynamodb';

export const saveConnection = async (
  username: string,
  connectionToSave: IConnection
): Promise<PutItemCommandOutput> => {
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

export const queryConnections = async (
  username: string,
  connectionType?: TConnection
): Promise<IConnection[]> => {
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

  return Items?.map((Item) => convertDbConnectionToIConnection(Item));
};

export const getConnection = async (
  username: string,
  connectionId: string
): Promise<IConnection> => {
  const input: TQueryInput = {
    ExpressionAttributeValues: marshall({
      ':connectionId': connectionId,
      ':username': username,
    }),
    KeyConditionExpression: 'connectionId = :connectionId',
    FilterExpression: 'username = :username',
  };

  const { Items } = await query(input);

  if (isEmpty(Items)) {
    return null;
  }

  return convertDbConnectionToIConnection(Items[0]);
};

export const deleteConnection = async (
  username: string,
  connectionId: string
): Promise<DeleteItemCommandOutput> => {
  const input: TDeleteItemInput = {
    Key: marshall({ id: username }),
    ExpressionAttributeValues: marshall({ ':connectionId': connectionId }),
    ConditionExpression: 'connectionId = :connectionId',
  };

  return deleteItem(input);
};

const convertDbConnectionToIConnection = (dbConnection: any): IConnection => {
  const result = unmarshall(dbConnection);

  return {
    ...result,
    type: result?.rowType?.split(':')[1] as TConnection,
  } as IConnection;
};
