import { getConfig } from './config';
import Cryptr from 'cryptr';
import { addSeconds, formatISO } from 'date-fns';

export const getDateSecondsFromNow = (seconds: number): string => {
  const futureDate = addSeconds(new Date(), seconds);

  return formatISO(futureDate);
};

const getCryptr = async () => {
  const { cognitoUserPoolId } = await getConfig();

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
