import express from 'express';
import cors from 'cors';
import routes from '@routes';

import { initModels } from '@utils/sequelize';

const port = 8085 as const;
const host = '0.0.0.0' as const;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes());

initModels();

const listener = app.listen(port, host, () => {
  const { port, address } = listener.address() as { port: number; address: string };
  console.log(`App is listening : ${address}:${port}`);
});
