import { Config } from './config';
import { AWSError, DynamoDB } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import {
  DeleteItemInput,
  DeleteItemOutput,
  GetItemInput,
  GetItemOutput,
  PutItemInput,
  PutItemOutput,
  QueryInput,
  QueryOutput,
} from 'aws-sdk/clients/dynamodb';

const dynamoDb = new DynamoDB();

export type TPutItemInput = Omit<PutItemInput, 'TableName'>;

export const putItem = (input: TPutItemInput): Promise<PutItemOutput> => {
  return performOperation((tableName: string) =>
    dynamoDb
      .putItem({
        TableName: tableName,
        ...input,
      })
      .promise()
  );
};

export type TGetItemInput = Omit<GetItemInput, 'TableName'>;

export const getItem = (input: TGetItemInput): Promise<GetItemOutput> => {
  return performOperation((tableName: string) =>
    dynamoDb.getItem({ TableName: tableName, ...input }).promise()
  );
};

export type TQueryInput = Omit<QueryInput, 'TableName'>;

export const query = (input: TQueryInput): Promise<QueryOutput> => {
  return performOperation((tableName: string) =>
    dynamoDb.query({ TableName: tableName, ...input }).promise()
  );
};

export type TDeleteItemInput = Omit<DeleteItemInput, 'TableName'>;

export const deleteItem = (
  input: TDeleteItemInput
): Promise<DeleteItemOutput> => {
  return performOperation((tableName: string) =>
    dynamoDb.deleteItem({ TableName: tableName, ...input }).promise()
  );
};

type TDynamoDbResponse = PromiseResult<
  PutItemOutput | GetItemOutput | DeleteItemOutput | QueryOutput,
  AWSError
>;

type TDynamoDbFunction = (tableName: string) => Promise<TDynamoDbResponse>;

const performOperation = async (operation: TDynamoDbFunction) => {
  const { algoTraderTableDbName } = await Config.getConfig();

  return operation(algoTraderTableDbName);
};
