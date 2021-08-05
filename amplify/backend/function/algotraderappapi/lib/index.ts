exports.handler = async (_event: any) => {
  // TODO implement
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify("Hello from Lambda! Magic is happening"),
  };
  return response;
};
