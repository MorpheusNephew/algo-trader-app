import { v4 as uuid } from 'uuid';

export const helloRandom = () => {
  return `'${uuid()}' from the function lambda layer`;
};
