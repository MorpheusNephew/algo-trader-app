import { getConnections } from '/opt/nodejs/connectiondb';

export const handler = async (_event) => {
  const connections = await getConnections({ connectionType: 'td' });

  connections.forEach((connection) => {
    const currentDate = new Date();
    const date = new Date(connection.refreshTokenExpiration);

    console.log('currentDate', currentDate.toISOString());
    console.log('date', date);
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify(connections),
  };
  return response;
};
