import {
  deleteItem,
  getItem,
  putItem,
  TDeleteItemInput,
  TGetItemInput,
  TPutItemInput,
} from '../../../services/dynamodb';

export const saveConnection = async () => {
  const input: TPutItemInput = {
    Item: {},
  };

  return putItem(input);
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
