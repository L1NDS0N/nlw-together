import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import { dataSource } from './dataSource';
// my dependencies
import './db';
import { handleErrorMiddleware } from './middlewares/handleErrorMiddleware';
import { router } from './routes';

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(router);
app.use(handleErrorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });
