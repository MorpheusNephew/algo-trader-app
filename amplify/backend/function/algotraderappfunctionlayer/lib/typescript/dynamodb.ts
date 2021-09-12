import { Config } from './config';
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
  DeleteItemCommand,
  DeleteItemCommandInput,
  DeleteItemCommandOutput,
} from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({});

export type TPutItemInput = Omit<PutItemCommandInput, 'TableName'>;

export const putItem = (
  input: TPutItemInput
): Promise<PutItemCommandOutput> => {
  return performOperation((tableName: string) => {
    const command = new PutItemCommand({ TableName: tableName, ...input });

    return client.send(command);
  });
};

export type TGetItemInput = Omit<GetItemCommandInput, 'TableName'>;

export const getItem = (
  input: TGetItemInput
): Promise<GetItemCommandOutput> => {
  return performOperation((tableName: string) => {
    const command = new GetItemCommand({ TableName: tableName, ...input });

    return client.send(command);
  });
};

export type TQueryInput = Omit<QueryCommandInput, 'TableName'>;

export const query = (input: TQueryInput): Promise<QueryCommandOutput> => {
  return performOperation((tableName: string) => {
    const command = new QueryCommand({ TableName: tableName, ...input });

    return client.send(command);
  });
};

export type TDeleteItemInput = Omit<DeleteItemCommandInput, 'TableName'>;

export const deleteItem = (
  input: TDeleteItemInput
): Promise<DeleteItemCommandOutput> => {
  return performOperation((tableName: string) => {
    const command = new DeleteItemCommand({ TableName: tableName, ...input });

    return client.send(command);
  });
};

type TDynamoDbResponse =
  | PutItemCommandOutput
  | GetItemCommandOutput
  | QueryCommandOutput
  | DeleteItemCommandOutput;

type TDynamoDbFunction = (tableName: string) => Promise<TDynamoDbResponse>;

const performOperation = async (operation: TDynamoDbFunction) => {
  const { algoTraderTableDbName } = await Config.getConfig();

  return operation(algoTraderTableDbName);
};
