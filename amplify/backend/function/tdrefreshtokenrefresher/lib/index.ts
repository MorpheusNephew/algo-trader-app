import { getConnections } from '/opt/nodejs/connectiondb';

export const handler = async (_event) => {
  const connections = await getConnections();

  const response = {
    statusCode: 200,
    body: JSON.stringify(connections),
  };
  return response;
};
