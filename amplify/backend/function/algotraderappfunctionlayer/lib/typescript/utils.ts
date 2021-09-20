import { Config } from './config';
import { IConnection } from './connectionTypes';
import Cryptr from 'cryptr';
import { addSeconds, formatISO } from 'date-fns';

export const getDateSecondsFromNow = (seconds: number): string => {
  const currentDate = addSeconds(new Date(), seconds);

  return formatISO(currentDate);
};

const getCryptr = async () => {
  const { cognitoUserPoolId } = await Config.getConfig();

  return new Cryptr(cognitoUserPoolId);
};

export const encryptItem = async (itemToEncrypt: string): Promise<string> => {
  const { encrypt } = await getCryptr();

  return encrypt(itemToEncrypt);
};

export const decryptItem = async (itemToDecrypt: string): Promise<string> => {
  const { decrypt } = await getCryptr();

  return decrypt(itemToDecrypt);
};
