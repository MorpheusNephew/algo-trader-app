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
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
  DeleteItemCommand,
  DeleteItemCommandInput,
  DeleteItemCommandOutput,
} from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({});

export type TPutItemInput = Omit<PutItemCommandInput, 'TableName'>;

export const putItem = (
  input: TPutItemInput
): Promise<PutItemCommandOutput> => {
  return runCommand(
    (tableName) => new PutItemCommand({ TableName: tableName, ...input })
  );
};

export type TGetItemInput = Omit<GetItemCommandInput, 'TableName'>;

export const getItem = (
  input: TGetItemInput
): Promise<GetItemCommandOutput> => {
  return runCommand(
    (tableName) => new GetItemCommand({ TableName: tableName, ...input })
  );
};

export type TQueryInput = Omit<QueryCommandInput, 'TableName'>;

export const query = (input: TQueryInput): Promise<QueryCommandOutput> => {
  return runCommand(
    (tableName) => new QueryCommand({ TableName: tableName, ...input })
  );
};

export type TDeleteItemInput = Omit<DeleteItemCommandInput, 'TableName'>;

export const deleteItem = (
  input: TDeleteItemInput
): Promise<DeleteItemCommandOutput> => {
  return runCommand(
    (tableName) => new DeleteItemCommand({ TableName: tableName, ...input })
  );
};

export type TScanCommandInput = Omit<ScanCommandInput, 'TableName'>;

export const scan = (input: TScanCommandInput): Promise<ScanCommandOutput> => {
  return runCommand(
    (tableName) => new ScanCommand({ TableName: tableName, ...input })
  );
};

type TDynamoDbResponse =
  | PutItemCommandOutput
  | GetItemCommandOutput
  | QueryCommandOutput
  | DeleteItemCommandOutput
  | ScanCommandOutput;

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
