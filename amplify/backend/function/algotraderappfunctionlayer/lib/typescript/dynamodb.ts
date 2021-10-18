import { Config } from './config';
import logger from './logger';
import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandInput,
  GetItemCommandOutput,
  PutItemCommand,
  PutItemCommandInput,
  PutItemCommandOutput,
  QueryCommand,
  QueryCommandInput,
  QueryCommandOutput,
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
  DeleteItemCommand,
  DeleteItemCommandInput,
  DeleteItemCommandOutput,
  UpdateItemCommandInput,
  UpdateItemCommandOutput,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({});

export type TPutItemInput = Omit<PutItemCommandInput, 'TableName'>;

export const putItem = (
  input: TPutItemInput
): Promise<PutItemCommandOutput> => {
  logger.info('putItem', { input });

  return runCommand(
    (tableName) => new PutItemCommand({ TableName: tableName, ...input })
  );
};

export type TGetItemInput = Omit<GetItemCommandInput, 'TableName'>;

export const getItem = (
  input: TGetItemInput
): Promise<GetItemCommandOutput> => {
  logger.info('getItem', { input });

  return runCommand(
    (tableName) => new GetItemCommand({ TableName: tableName, ...input })
  );
};

export type TUpdateItemInput = Omit<UpdateItemCommandInput, 'TableName'>;

export const updateItem = (
  input: TUpdateItemInput
): Promise<UpdateItemCommandOutput> => {
  logger.info('updateItem', { input });

  return runCommand(
    (tableName) => new UpdateItemCommand({ TableName: tableName, ...input })
  );
};

export type TQueryInput = Omit<QueryCommandInput, 'TableName'>;

export const query = (input: TQueryInput): Promise<QueryCommandOutput> => {
  logger.info('query', { input });

  return runCommand(
    (tableName) => new QueryCommand({ TableName: tableName, ...input })
  );
};

export type TDeleteItemInput = Omit<DeleteItemCommandInput, 'TableName'>;

export const deleteItem = (
  input: TDeleteItemInput
): Promise<DeleteItemCommandOutput> => {
  logger.info('deleteItem', { input });

  return runCommand(
    (tableName) => new DeleteItemCommand({ TableName: tableName, ...input })
  );
};

export type TScanInput = Omit<ScanCommandInput, 'TableName'>;

export const scan = (input: TScanInput): Promise<ScanCommandOutput> => {
  logger.info('scan', { input });

  return runCommand(
    (tableName) => new ScanCommand({ TableName: tableName, ...input })
  );
};

type TDynamoDbResponse =
  | PutItemCommandOutput
  | GetItemCommandOutput
  | QueryCommandOutput
  | DeleteItemCommandOutput
  | ScanCommandOutput
  | UpdateItemCommandOutput;

type TDynamoDbFunction = (tableName: string) => Promise<TDynamoDbResponse>;

const performOperation = async (operation: TDynamoDbFunction) => {
  const { algoTraderTableDbName } = await Config.getConfig();

  return operation(algoTraderTableDbName);
};

type TCommandFunction = (tableName: string) => any;

const runCommand = async (
  generateCommand: TCommandFunction
): Promise<TDynamoDbResponse> => {
  return performOperation((tableName: string) => {
    const command = generateCommand(tableName);

    return client.send(command);
  });
};
