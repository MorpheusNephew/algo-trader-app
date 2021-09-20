import { IConnection, TConnection } from './connectionTypes';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { isEmpty } from 'lodash';
import {
  deleteItem,
  putItem,
  query,
  scan,
  TDeleteItemInput,
  TPutItemInput,
  TQueryInput,
  TScanInput,
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

export interface IScanConnectionsOptions {
  connectionType?: TConnection;
}

export interface IQueryConnectionsOptions {
  username?: string;
  connectionType?: TConnection;
}

export const getConnections = async (
  params?: IQueryConnectionsOptions
): Promise<IConnection[]> => {
  const username = params?.username;

  return username ? queryConnections(params) : scanConnections(params);
};

const queryConnections = async (params: IQueryConnectionsOptions) => {
  const username = params!.username;
  const connectionType = params?.connectionType;

  let connectionAttributeValue: any = { ':connectionType': 'connection' };
  const filterExpression = 'begins_with (rowType, :connectionType)';

  if (connectionType) {
    connectionAttributeValue = {
      ':connectionType': `connection:${connectionType}`,
    };
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

  return Items?.map((Item) => convertDbConnectionToIConnection(Item)) ?? [];
};

const scanConnections = async (params: IScanConnectionsOptions) => {
  const connectionType = params?.connectionType;

  let input: TScanInput = null;

  if (connectionType) {
    input = {
      ExpressionAttributeValues: marshall({
        ':sortName': connectionType,
      }),
      FilterExpression: 'sortName = :sortName',
    };
  }

  const { Items } = await scan(input);

  return Items?.map((Item) => convertDbConnectionToIConnection(Item)) ?? [];
};

export const getConnection = async (
  username: string,
  connectionId: string
): Promise<IConnection> => {
  const input: TQueryInput = {
    ExpressionAttributeValues: marshall({
      ':connectionId': connectionId,
      ':id': username,
    }),
    KeyConditionExpression: 'id = :id',
    FilterExpression: 'connectionId = :connectionId',
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
