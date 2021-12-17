import { getItem, putItem, TGetItemInput, TPutItemInput } from './dynamodb';
import { TBrokerage } from './types';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

export const getUserPreferences = async (
  username: string,
  brokerage: TBrokerage
) => {
  const input: TGetItemInput = {
    Key: marshall({ id: username, sortName: brokerage }),
    AttributesToGet: ['preferences'],
  };

  const preferences = await getItem(input);

  return preferences;
};

export const saveUserPreferences = async (
  username: string,
  preferences: any
) => {
  const input: TPutItemInput = {
    Item: marshall({}),
  };

  const result = await putItem(input);

  return result;
};
