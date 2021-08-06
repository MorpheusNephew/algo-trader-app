import Koa from 'koa';

exports.handler = async (_event: any) => {
  // TODO implement
  console.log('Hello there koa', Koa);
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify("Hello from Lambda! Magic is happening and then..."),
  };
  return response;
};
