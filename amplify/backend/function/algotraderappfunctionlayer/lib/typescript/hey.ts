import { v4 as uuid } from 'uuid';

export const helloRandom = () => {
  return `Hello there '${uuid()}' from the function lambda layer`;
};
