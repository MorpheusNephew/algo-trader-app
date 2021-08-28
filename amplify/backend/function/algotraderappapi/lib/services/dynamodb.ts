import Config from '../config';
import { AWSError, DynamoDB } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import {
  DeleteItemInput,
  DeleteItemOutput,
  GetItemInput,
  GetItemOutput,
  PutItemInput,
  PutItemOutput,
} from 'aws-sdk/clients/dynamodb';

const dynamoDb = new DynamoDB();

type TPutItemInput = Omit<PutItemInput, 'TableName'>;

export const putItem = (input: TPutItemInput) => {
  return performOperation((tableName: string) =>
    dynamoDb
      .putItem({
        TableName: tableName,
        ...input,
      })
      .promise()
  );
};

type TGetItemInput = Omit<GetItemInput, 'TableName'>;

export const getItem = (input: TGetItemInput) => {
  return performOperation((tableName: string) =>
    dynamoDb.getItem({ TableName: tableName, ...input }).promise()
  );
};

type TDeleteItemInput = Omit<DeleteItemInput, 'TableName'>;

export const deleteItem = (input: TDeleteItemInput) => {
  return performOperation((tableName: string) =>
    dynamoDb.deleteItem({ TableName: tableName, ...input }).promise()
  );
};

type TDynamoDbResponse = PromiseResult<
  PutItemOutput | GetItemOutput | DeleteItemOutput,
  AWSError
>;

type TDynamoDbFunction = (tableName: string) => Promise<TDynamoDbResponse>;

const performOperation = async (operation: TDynamoDbFunction) => {
  const { algoTraderTableDbName } = await Config.getConfig();

  return operation(algoTraderTableDbName);
};
