import cors from 'cors';
import express from 'express';

const PORT = 3000;

export const expressServer = express()
  .use(cors())
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .get('/healthcheck', (_req, res) => {
    res.status(200).json('ok');
  })
  .listen(PORT, () => {
    console.log(`Now listening on port: ${PORT}`);
  });
