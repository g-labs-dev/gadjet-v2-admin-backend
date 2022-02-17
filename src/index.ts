import routes from '@routes';
import cors from 'cors';
import express from 'express';

import { initModels } from '@utils/sequelize';

const port = process.env.PORT || 8085;
const host = '0.0.0.0' as const;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes());

initModels();

const listener = app.listen(Number(port), host, () => {
  const { port, address } = listener.address() as { port: number; address: string };
  console.log(`App is listening [${process.env.NODE_ENV}]: ${address}:${port}`);
});
