import logger from './logger';
import { IConnection, TBrokerage } from './types';
import { decryptItem, encryptItem } from './utils';
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
  TUpdateItemInput,
  updateItem,
} from './dynamodb';
import {
  DeleteItemCommandOutput,
  PutItemCommandOutput,
} from '@aws-sdk/client-dynamodb';

export const saveConnection = async (
  username: string,
  connectionToSave: IConnection
): Promise<PutItemCommandOutput> => {
  logger.info('Save connection for user', { username });

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
      accessToken: await encryptItem(accessToken),
      accessTokenExpiration,
      connectionId,
      refreshToken: await encryptItem(refreshToken),
      refreshTokenExpiration,
      rowType: `connection:${type}:${username}`,
    }),
  };

  return putItem(input);
};

export interface IScanConnectionsOptions {
  brokerage?: TBrokerage;
}

export interface IQueryConnectionsOptions {
  username?: string;
  brokerage?: TBrokerage;
}

export const getConnections = async (
  params?: IQueryConnectionsOptions
): Promise<IConnection[]> => {
  const username = params?.username;

  return username ? queryConnections(params) : scanConnections(params);
};

const queryConnections = async (params: IQueryConnectionsOptions) => {
  logger.info('Query connections', { params });

  const username = params!.username;
  const brokerage = params?.brokerage;

  let connectionAttributeValue: any = { ':connectionType': 'connection' };

  if (brokerage) {
    connectionAttributeValue = {
      ':connectionType': `connection:${brokerage}`,
    };
  }

  const input: TQueryInput = {
    ExpressionAttributeValues: marshall({
      ':id': username,
      ...connectionAttributeValue,
    }),
    IndexName: 'IdRowTypeIndex',
    KeyConditionExpression:
      'id = :id AND begins_with (rowType, :connectionType)',
  };

  const { Items } = await query(input);

  return (
    Promise.all(Items?.map((Item) => convertDbConnectionToIConnection(Item))) ??
    []
  );
};

const scanConnections = async (params: IScanConnectionsOptions) => {
  logger.info('Scan connections', { params });

  const brokerage = params?.brokerage;

  let input: TScanInput = null;

  if (brokerage) {
    input = {
      ExpressionAttributeValues: marshall({
        ':sortName': brokerage,
      }),
      FilterExpression: 'sortName = :sortName',
    };
  }

  const { Items } = await scan(input);

  return (
    Promise.all(Items?.map((Item) => convertDbConnectionToIConnection(Item))) ??
    []
  );
};

export const getConnection = async (
  username: string,
  connectionId: string
): Promise<IConnection> => {
  logger.info('Get connection', { username, connectionId });

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
  logger.info('Delete connection', { username, connectionId });

  const input: TDeleteItemInput = {
    Key: marshall({ id: username }),
    ExpressionAttributeValues: marshall({ ':connectionId': connectionId }),
    ConditionExpression: 'connectionId = :connectionId',
  };

  return deleteItem(input);
};

export interface IConnectionTokens {
  accessToken: string;
  accessTokenExpiration: string;
  refreshToken: string;
  refreshTokenExpiration: string;
  type: TBrokerage;
}

export const updateConnectionTokens = async (
  username: string,
  connectionId: string,
  tokensInformation: IConnectionTokens
) => {
  logger.info('Update connection token', { username, connectionId });

  const {
    accessToken,
    accessTokenExpiration,
    refreshToken,
    refreshTokenExpiration,
    type,
  } = tokensInformation;

  const input: TUpdateItemInput = {
    Key: marshall({ id: username, sortName: type }),
    ConditionExpression: 'connectionId = :connectionId',
    ExpressionAttributeValues: marshall({
      ':connectionId': connectionId,
      ':accessToken': await encryptItem(accessToken),
      ':accessTokenExpiration': accessTokenExpiration,
      ':refreshToken': await encryptItem(refreshToken),
      ':refreshTokenExpiration': refreshTokenExpiration,
    }),
    UpdateExpression:
      'SET accessToken = :accessToken, accessTokenExpiration = :accessTokenExpiration, refreshToken = :refreshToken, refreshTokenExpiration = :refreshTokenExpiration',
  };

  return updateItem(input);
};

const convertDbConnectionToIConnection = async (
  dbConnection: any
): Promise<IConnection> => {
  const result = unmarshall(dbConnection);

  return {
    ...result,
    username: result.id,
    accessToken: await decryptItem(result.accessToken),
    refreshToken: await decryptItem(result.refreshToken),
    type: result?.rowType?.split(':')[1] as TBrokerage,
  } as IConnection;
};
