import { Config } from './config';
import Cryptr from 'cryptr';

export const getDateSecondsFromNow = (seconds: number): string => {
  const currentDate = new Date();
  currentDate.setSeconds(currentDate.getSeconds() + seconds);

  return currentDate.toISOString();
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
